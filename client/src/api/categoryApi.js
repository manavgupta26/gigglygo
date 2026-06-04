import API_URL from "../../../server/src/config/api";

export const getCategories = async () => {
  const response = await fetch(
    `${API_URL}/categories`
  );

  return response.json();
};