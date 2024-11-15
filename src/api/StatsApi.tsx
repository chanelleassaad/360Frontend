import { api } from "./AdminApi";

// Get stats
export const getStats = async () => {
  const response = await api.get(`/stats/getStats`);
  return response.data;
};

// Add stat
export const addStat = async (statData: any, accessToken: string) => {
  const response = await api.post(`/stats/addStats`, statData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// Delete stat
export const deleteStat = async (statId: number, accessToken: string) => {
  const response = await api.delete(`/stats/deleteStat/${statId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// Edit stat
export const editStat = async (
  statId: number,
  updatedStatData: any,
  accessToken: string
) => {
  const response = await api.put(`/stats/editStat/${statId}`, updatedStatData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
