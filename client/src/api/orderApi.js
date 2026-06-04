import axios from "axios";

const API =
  "http://localhost:8000/api/orders";

export const createOrder =
  async (orderData) => {
    const token =
      localStorage.getItem("token");

    const { data } = await axios.post(
      API,
      orderData,
      {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      }
    );

    return data;
  };