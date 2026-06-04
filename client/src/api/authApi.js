import axios from "axios";

const API =
  "http://localhost:8000/api/users";

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