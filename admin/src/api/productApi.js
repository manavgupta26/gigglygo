import axios from "axios";
import API_URL from "../config/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "adminToken"
    )}`,
  },
});

export const getProducts = async () => {
  const response = await axios.get(
    `${API_URL}/products`
  );

  return response.data;
};

export const createProduct = async (
  product
) => {
  const response = await axios.post(
    `${API_URL}/products`,
    product,
    getAuthHeaders()
  );

  return response.data;
};

export const deleteProduct = async (
  id
) => {
  const response = await axios.delete(
    `${API_URL}/products/${id}`,
    getAuthHeaders()
  );

  return response.data;
};

export const getProductById = async (
  id
) => {
  const response = await axios.get(
    `${API_URL}/products/${id}`
  );

  return response.data;
};

export const updateProduct = async (
  id,
  product
) => {
  const response = await axios.put(
    `${API_URL}/products/${id}`,
    product,
    getAuthHeaders()
  );

  return response.data;
};

