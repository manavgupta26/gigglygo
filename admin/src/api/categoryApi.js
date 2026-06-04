import axios from "axios";
import API_URL from "../config/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "adminToken"
    )}`,
  },
});

export const getCategories = async () => {
  const response = await axios.get(
    `${API_URL}/categories`
  );

  return response.data;
};

export const createCategory = async (
  category
) => {
  const response = await axios.post(
    `${API_URL}/categories`,
    category,
    getAuthHeaders()
  );

  return response.data;
};

export const updateCategory = async (
  id,
  category
) => {
  const response = await axios.put(
    `${API_URL}/categories/${id}`,
    category,
    getAuthHeaders()
  );

  return response.data;
};

export const deleteCategory = async (
  id
) => {
  const response = await axios.delete(
    `${API_URL}/categories/${id}`,
    getAuthHeaders()
  );

  return response.data;
};