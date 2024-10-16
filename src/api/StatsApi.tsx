import { api } from "./ProjectsApi";

// Get stats
export const getStats = async () => {
  const response = await api.get(`/stats/getStats`);
  return response.data;
};

// Add stat
export const addStat = async (statData: any) => {
  const response = await api.post(`/stats/addStats`, statData);
  return response.data;
};

// Delete stat
export const deleteStat = async (statId: number) => {
  const response = await api.delete(`/stats/deleteStat/${statId}`);
  return response.data;
};

// Edit stat
export const editStat = async (statId: number, updatedStatData: any) => {
  const response = await api.put(`/stats/editStat/${statId}`, updatedStatData);
  return response.data;
};
