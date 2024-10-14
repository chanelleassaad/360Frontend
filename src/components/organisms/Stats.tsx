import React, { useState } from "react";
import colors from "../../colors";

// Define the Stat type
interface Stat {
  id: number;
  name: string;
  value: string;
}

const initialStats: Stat[] = [
  { id: 1, name: "Transactions every 24 hours", value: "44 million" },
  { id: 2, name: "Assets under holding", value: "$119 trillion" },
  { id: 3, name: "New users annually", value: "46,000" },
];

export default function Stats() {
  const [stats, setStats] = useState<Stat[]>(initialStats);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStats, setEditingStats] = useState<Stat[]>([...initialStats]);

  const handleEditClick = () => {
    setEditingStats([...stats]); // Prepare stats for editing
    setIsModalOpen(true); // Open the modal
  };

  const handleSaveClick = () => {
    setStats(editingStats); // Save edited stats
    setIsModalOpen(false); // Close the modal
  };

  const handleAddStat = () => {
    const newStat: Stat = {
      id: stats.length + 1,
      name: "New stat",
      value: "0",
    };
    setEditingStats([...editingStats, newStat]);
  };

  const handleDeleteStat = (id: number) => {
    setEditingStats(editingStats.filter((stat) => stat.id !== id));
  };

  const handleStatChange = (id: number, name: string, value: string) => {
    setEditingStats(
      editingStats.map((stat) =>
        stat.id === id ? { ...stat, name, value } : stat
      )
    );
  };

  return (
    <div className="my-10 lg:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Edit Button */}
        <div className="flex justify-end mb-4">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleEditClick}
          >
            Edit Stats
          </button>
        </div>
        {/* Display Stats */}
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto w-full max-w-xs flex flex-col gap-y-4 text-gray-100 p-6 rounded-lg shadow-lg"
              style={{ backgroundColor: colors.lightRed }}
            >
              <dt className="text-base leading-7" style={{ color: colors.grey }}>
                {stat.name}
              </dt>
              <dd
                className="order-first text-2xl font-semibold tracking-tight text-white sm:text-4xl"
                style={{ color: colors.grey }}
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Modal for editing */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
              <h2 className="text-xl font-bold mb-4">Edit Stats</h2>
              <div className="flex flex-col gap-y-4">
                {editingStats.map((stat) => (
                  <div key={stat.id} className="flex items-center gap-x-4">
                    <input
                      className="text-base leading-7 p-2 rounded w-1/2"
                      placeholder="Name"
                      value={stat.name}
                      onChange={(e) =>
                        handleStatChange(stat.id, e.target.value, stat.value)
                      }
                    />
                    <input
                      className="text-base leading-7 p-2 rounded w-1/4"
                      placeholder="Value"
                      value={stat.value}
                      onChange={(e) =>
                        handleStatChange(stat.id, stat.name, e.target.value)
                      }
                    />
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleDeleteStat(stat.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleAddStat}
                >
                  Add Stat
                </button>
                <div>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
