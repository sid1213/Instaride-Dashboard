import axios from "../axios";

export interface LogOutResponseI {
  token: string;
}

const logOut = async (): Promise<LogOutResponseI> => {
  const response = await axios.post("/api/logout");
  localStorage.removeItem("user");
  return response.data;
};
export default logOut;
