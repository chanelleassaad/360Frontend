import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getProjects = async () => {
  const response = await api.get(`/projects/getProjects`);
  return response.data;
};

export const deleteProject = async (id: string) => {
  try {
    const response = await api.delete(`/projects/deleteProject/${id}`);
    return response.data;
  } catch (error) {
    // throw new Error(error.response?.data?.message || 'Error deleting project');
  }
};

export const deleteVideo = async (projectId: string) => {
  try {
    const response = await api.delete(`/projects/deleteVideo/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting video:", error);
    throw error; // Re-throw the error for further handling
  }
};

export const uploadVideo = async (projectId: string, videoFile: File) => {
  const formData = new FormData();
  formData.append("video", videoFile);
  try {
    const response = await api.put(
      `/projects/addVideo/${projectId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
};

export const editProjectData = async (
  id: string,
  title: string,
  location: string,
  year: number,
  description: string
) => {
  try {
    const response = await api.put(`/projects/editProjectData/${id}`, {
      title,
      location,
      year,
      description,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating project data:", error);
    throw error; // Re-throw the error for further handling
  }
};

export const addImages = async (projectId: string, imageFiles: any[]) => {
  const formData = new FormData();
  Array.from(imageFiles).forEach((file) => {
    formData.append("images", file); // Append each image to the FormData object
  });

  try {
    const response = await api.put(
      `/projects/addImages/${projectId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

export const deleteImages = async (projectId: string, imageNames: string[]) => {
  try {
    const response = await api.delete(`/projects/deleteImages/${projectId}`, {
      params: {
        imageNames, // Pass imageNames as query parameters
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting images:", error);
    throw error;
  }
};

export const addProject = async (
  title: string,
  location: string,
  year: number,
  description: string,
  video: File,
  images: FileList
) => {
  try {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("location", location);
    formData.append("year", year.toString());
    formData.append("description", description);

    Array.from(images).forEach((file) => {
      formData.append("images", file);
    });

    formData.append("video", video);

    const response = await api.post(`/projects/addProject`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding project data:", error);
    throw error;
  }
};
