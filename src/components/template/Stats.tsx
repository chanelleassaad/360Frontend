import { useEffect, useState } from "react";
import colors from "../../colors";
import { useSelector } from "react-redux";
import { IStat } from "../../interfaces/IStat";
import EditModal from "./EditModal";
import ReButton from "../molecules/ReButton";
import { FaEdit } from "react-icons/fa";

const initialStats: IStat[] = [
  { _id: 1, title: "Transactions every 24 hours", description: "44 million" },
  { _id: 2, title: "Assets under holding", description: "$119 trillion" },
  { _id: 3, title: "New users annually", description: "46,000" },
];

export default function Stats() {
  const [stats, setStats] = useState<IStat[]>(initialStats);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStats, setEditingStats] = useState<IStat[]>([...initialStats]);

  const [canEdit, setCanEdit] = useState(false);
  const { userToken } = useSelector((state: any) => state.auth);

  const handleEditStats = () => {
    setEditingStats([...stats]);
    setIsModalOpen(true);
  };

  const handleSaveStats = () => {
    setStats(editingStats);
    setIsModalOpen(false);
  };

  const handleAddStat = () => {
    const newStat: IStat = {
      _id: stats.length + 1,
      title: "New stat",
      description: "0",
    };
    setEditingStats([...editingStats, newStat]);
  };

  const handleDeleteStat = (id: number) => {
    setEditingStats(editingStats.filter((stat) => stat._id !== id));
  };

  const handleStatChange = (id: number, field: string, value: string) => {
    const updatedStatChange = editingStats.map((stat) =>
      stat._id === id ? { ...stat, [field]: value } : stat
    );
    setEditingStats(updatedStatChange);
  };

  useEffect(() => {
    if (userToken) setCanEdit(true);
    else setCanEdit(false);
    console.log(userToken);
  }, [userToken]);

  return (
    <div className="my-10 lg:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Edit Button */}
        {canEdit && (
          <div className="flex justify-end">
            <ReButton
              onClick={handleEditStats}
              icon={<FaEdit />}
              name="Stats"
            />
          </div>
        )}

        {/* Display Stats */}
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat._id}
              className="mx-auto w-full max-w-xs flex flex-col gap-y-4 text-gray-100 p-6 rounded-lg shadow-lg"
              style={{ backgroundColor: colors.lightRed }}
            >
              <dt
                className="text-base leading-7"
                style={{ color: colors.grey }}
              >
                {stat.title}
              </dt>
              <dd
                className="order-first text-2xl font-semibold tracking-tight text-white sm:text-4xl"
                style={{ color: colors.grey }}
              >
                {stat.description}
              </dd>
            </div>
          ))}
        </dl>

        {/* Stat Editing Modal */}
        <EditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editingItems={editingStats}
          onSave={handleSaveStats}
          onDelete={handleDeleteStat}
          onAdd={handleAddStat}
          type="stats"
          onChange={handleStatChange}
        />
      </div>
    </div>
  );
}
