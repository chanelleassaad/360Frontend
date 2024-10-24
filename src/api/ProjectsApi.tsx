import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getProjects = async () => {
  const response = await api.get(`/projects/getProjects`);
  return response.data;
};

export const updateProject = async (project: any) => {
  const formData = new FormData();
  formData.append("title", project.title);
  formData.append("location", project.location);
  formData.append("year", project.year);
  formData.append("description", project.description);

  // Append images to FormData
  // project.images.forEach((item: any) => formData.append("images", item));

  formData.append("images", JSON.stringify(project.images));

  // Append video if exists
  formData.append("video", project.video);

  console.log(formData.values);

  try {
    const response = await api.put(
      `/projects/updateProject/${project._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error; // Re-throw the error for further handling
  }
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
    const response = await api.put(`/projects/addVideo/${projectId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

// Function to add images to a project
export const addImages = async (projectId: string, imageFiles: FileList) => {
  const formData = new FormData();
  Array.from(imageFiles).forEach((file) => {
    formData.append("images", file); // Append each image to the FormData object
  });

  try {
    const response = await api.put(`/projects/addImages/${projectId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

// Function to delete specific images from a project
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
