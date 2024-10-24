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

export const updateProjectData = async (
  id: string,
  description: string,
  location: string,
  year: number
) => {};
