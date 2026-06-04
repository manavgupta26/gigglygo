import axios from "axios";
import API_URL from "../config/api";

const API = `${API_URL}/users`;

export const registerUser = async (
  userData
) => {
  const { data } = await axios.post(
    `${API}/register`,
    userData
  );

  return data;
};

export const loginUser = async (
  userData
) => {
  const { data } = await axios.post(
    `${API}/login`,
    userData
  );

  return data;
};

export const getAddresses =
  async () => {
    const token =
      localStorage.getItem("token");

    const { data } =
      await axios.get(
        `${API}/address`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return data;
  };