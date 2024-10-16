import { useEffect, useState } from "react";
import colors from "../../colors";
import { useSelector } from "react-redux";
import { IStat } from "../../interfaces/IStat";
import EditModal from "./EditModal";
import ReButton from "../molecules/ReButton";
import { FaEdit } from "react-icons/fa";
import { addStat, deleteStat, editStat, getStats } from "../../api/StatsApi";

export default function Stats() {
  const [stats, setStats] = useState<IStat[]>([]);
  const [editingStats, setEditingStats] = useState<IStat[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const { userToken } = useSelector((state: any) => state.auth);

  const handleEditStats = () => {
    setEditingStats([...stats]);
    setIsModalOpen(true);
  };

  const handleSaveStats = async () => {
    const hasMissingFields = editingStats.some(
      (stat) => !stat.title || !stat.description
    );

    if (hasMissingFields) {
      alert(
        "⚠️ Missing Fields\n\nPlease fill in all required fields (title and description)."
      );
      return; // Stop further execution if there are missing fields
    }
    const newStats = editingStats.filter(
      (editingStat) => !stats.some((stat) => stat._id === editingStat._id)
    );

    const newStatIds = newStats.map((stat) => stat._id);

    // Find deleted stats by checking which stats in the original stats array are not in the editingStats
    const deletedStatIds = stats
      .filter(
        (stat) =>
          !editingStats.some((editingStat) => editingStat._id === stat._id)
      )
      .map((stat) => stat._id); // Get the IDs of deleted stats

    const updatedStats = editingStats.filter(
      (stat) =>
        !newStatIds.includes(stat._id) && !deletedStatIds.includes(stat._id) // Exclude new and deleted stats
    );

    try {
      // Handle new stats (batch add)
      const addedStats = await Promise.all(
        newStats.map((stat) =>
          addStat({ title: stat.title, description: stat.description })
        )
      );

      // Handle edited stats (batch update)
      const updatedExistingStats = await Promise.all(
        updatedStats.map((stat) =>
          editStat(stat._id, {
            title: stat.title,
            description: stat.description,
          })
        )
      );

      // Handle deleted stats (batch delete)
      await Promise.all(deletedStatIds.map((statId) => deleteStat(statId)));

      // Update the state only once after all API calls are complete
      setStats((prevStats) => {
        const updatedStatsMap = updatedExistingStats.reduce((acc, stat) => {
          acc[stat._id] = { ...stat }; // Update with edited stat
          return acc;
        }, {});

        return [
          ...Object.values(updatedStatsMap),
          ...addedStats.map((savedStat) => ({
            ...savedStat,
            _id: savedStat._id,
          })),
        ];
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving stats:", error);
    }
  };

  const handleAddStat = () => {
    const newStat: IStat = {
      _id: Math.random(),
      title: "",
      description: "",
    };
    setEditingStats([...editingStats, newStat]);
  };

  const handleDeleteStat = (statId: number) => {
    setEditingStats((prevStats) =>
      prevStats.filter((stat) => stat._id !== statId)
    );
  };

  const handleStatChange = (id: number, field: string, value: string) => {
    const updatedStatChange = editingStats.map((stat) =>
      stat._id === id ? { ...stat, [field]: value } : stat
    );
    setEditingStats(updatedStatChange);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getStats();
        setStats(result);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userToken) setCanEdit(true);
    else setCanEdit(false);
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
              <dd
                className="order-first text-2xl font-semibold tracking-tight text-white sm:text-4xl"
                style={{ color: colors.grey }}
              >
                {stat.title}
              </dd>
              <dt
                className="text-base leading-7"
                style={{ color: colors.grey }}
              >
                {stat.description}
              </dt>
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
