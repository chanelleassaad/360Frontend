import { api } from "./ProjectsApi";

export const getBoxDescription = async () => {
  try {
    const response = await api.get("/box/getBoxDescription");
    return response.data;
  } catch (error) {
    console.error("Error fetching box description:", error);
    throw error;
  }
};

export const editBoxDescription = async (BoxData: { description: string }) => {
  try {
    const response = await api.put(`/box/updateBoxDescription`, BoxData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error editing box description:", error);
    throw error;
  }
};
