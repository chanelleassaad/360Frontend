import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getProjects = async () => {
  const response = await api.get(`/projects/getProjects`);
  return response.data;
};
