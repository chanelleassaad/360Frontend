import { api } from "./AdminApi";

// Get all partners
export const getPartners = async () => {
  try {
    const response = await api.get("/partners/getPartners");
    return response.data;
  } catch (error) {
    console.error("Error fetching partners:", error);
    throw error;
  }
};

// Add a new partner (with image upload)
export const addPartner = async (
  partnerData: {
    fullName: string;
    quote: string;
    description: string;
    imageUrl: string;
  },
  accessToken: string
) => {
  try {
    // Use FormData to handle multipart/form-data request for image uploads
    const formData = new FormData();
    formData.append("fullName", partnerData.fullName);
    formData.append("quote", partnerData.quote);
    formData.append("description", partnerData.description);
    formData.append("image", partnerData.imageUrl);

    const response = await api.post("/partners/addPartner", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data; // The newly created partner
  } catch (error) {
    console.error("Error adding partner:", error);
    throw error;
  }
};

// Update a partner by ID (with optional image upload)
export const editPartner = async (
  id: number,
  partnerData: {
    fullName: string;
    quote: string;
    description: string;
    imageUrl: string;
  },
  accessToken: string
) => {
  try {
    const formData = new FormData();
    formData.append("fullName", partnerData.fullName);
    formData.append("quote", partnerData.quote);
    formData.append("description", partnerData.description);
    if (partnerData.imageUrl) {
      formData.append("image", partnerData.imageUrl); // Append image only if it's updated
    }

    const response = await api.put(`/partners/editPartner/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data; // The updated partner
  } catch (error) {
    console.error("Error editing partner:", error);
    throw error;
  }
};

// Delete a partner by ID
export const deletePartner = async (id: number, accessToken: string) => {
  try {
    const response = await api.delete(`/partners/deletePartner/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data; // Success message or relevant data
  } catch (error) {
    console.error("Error deleting partner:", error);
    throw error;
  }
};
