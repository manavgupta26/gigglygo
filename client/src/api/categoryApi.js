import API_URL from "../config/api";

export const getCategories = async () => {
  const response = await fetch(
    `${API_URL}/categories`
  );

  return response.json();
};