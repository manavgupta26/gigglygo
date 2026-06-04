import axios from "axios";
import API_URL from "../config/api";

export const uploadImage = async (
  file
) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await axios.post(
    `${API_URL}/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "adminToken"
        )}`,
      },
    }
  );

  return response.data;
};