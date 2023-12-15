import axios from "../axios";

const getAllVehicles = async () => {
  const response = await axios.get("/api/vehicles");
  return response.data;
};
export default getAllVehicles;
