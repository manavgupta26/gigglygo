import axios from "axios";
import API_URL from "../config/api";

export const loginAdmin =
async (credentials) => {
  const response =
    await axios.post(
      `${API_URL}/admin/login`,
      credentials
    );

  return response.data;
};