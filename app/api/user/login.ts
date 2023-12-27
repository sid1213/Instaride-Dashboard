"use client";
import handleAxiosError from "@/util/handleAxiosError";
import axios from "../axios";

export interface LoginUserResponseI {
  _id: string;
  role: string;
  username: string;
  email: string;
}
export interface LoginUserParamI {
  email: string;
  password: string;
}

const loginUser = async (
  params: LoginUserParamI
): Promise<LoginUserResponseI> => {
  try {
    const response = await axios.post("/api/admin/login", params);

    return response.data;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};
export default loginUser;
