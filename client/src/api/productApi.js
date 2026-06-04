import API_URL from "../../../server/src/config/api";
export const getProducts = async (
  query = ""
) => {
  const response = await fetch(
    `${API_URL}/products${query}`
  );

  return response.json();
};

export const getProductBySlug = async (
  slug
) => {
  const response = await fetch(
    `${API_URL}/products/slug/${slug}`
  );

  return response.json();
};