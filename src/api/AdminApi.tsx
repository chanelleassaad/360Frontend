import { ILogin } from "../interfaces/ILogin";
import { api } from "./ProjectsApi";

export const loginUser = async ({ username, password }: ILogin) => {
  try {
    const response = await api.post("/admin/loginAdmin", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    const errorResponse = error as {
      response?: { data?: { message?: string } };
    };
    throw new Error(
      errorResponse?.response?.data?.message || "Failed to login"
    );
  }
};

export const refreshAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  try {
    const response = await api.post("/refresh-token", { refreshToken });
    return response.data;
  } catch (error) {
    const errorResponse = error as {
      response?: { data?: { message?: string } };
    };
    throw new Error(
      errorResponse?.response?.data?.message || "Failed to refresh token"
    );
  }
};
