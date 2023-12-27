import axios from "../axios";
import { CitiesI } from "@/types";

export interface GetCityAndHubsResponseI extends CitiesI {}

const getCityAndHubs = async (): Promise<GetCityAndHubsResponseI[]> => {
  const response = await axios.get("/api/cityandhub");
  return response.data;
};
export default getCityAndHubs;
