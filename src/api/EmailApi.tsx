import { api } from "./AdminApi";

// send email from the contact us page
export const sendEmailApi = async (data: any) => {
  try {
    const response = await api.post("/email/send-email", data);
    return response.data; // Returns the array of boxes (we assume the first one is what you need)
  } catch (error) {
    console.error("Error fetching box description:", error);
    throw error;
  }
};
