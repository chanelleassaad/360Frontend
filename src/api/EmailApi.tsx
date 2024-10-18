import { api } from "./ProjectsApi";

// send email from the contact us page 
export const sendemail = async () => {
    try {
      const response = await api.get("/email/send-email");
      return response.data; // Returns the array of boxes (we assume the first one is what you need)
    } catch (error) {
      console.error("Error fetching box description:", error);
      throw error;
    }
  };