import axios from "axios";
import API_URL from "../config/api";

const API = `${API_URL}/orders`;

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