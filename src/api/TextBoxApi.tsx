import { api } from "./ProjectsApi";

// Fetch the box description
export const getBoxDescription = async () => {
  try {
    const response = await api.get("/box/getBoxDescription");
    return response.data; // Returns the array of boxes (we assume the first one is what you need)
  } catch (error) {
    console.error("Error fetching box description:", error);
    throw error;
  }
};

// Update the box description
export const editBoxDescription = async (
  id: string, // According to the Swagger docs, the ID is a string
  BoxData: {
    description: string;
  }
) => {
  try {
    const response = await api.put(`/box/updateBoxDescription/${id}`, BoxData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data; // The updated box description
  } catch (error) {
    console.error("Error editing box description:", error);
    throw error;
  }
};
