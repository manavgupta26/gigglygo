import axios from "axios";

const token =
  localStorage.getItem("token");

import API_URL from "../config/api";

const orderAPI = `${API_URL}/orders`;
const userAPI = `${API_URL}/users`;

export const getMyOrders =
  async () => {
    const { data } =
      await axios.get(
        `${orderAPI}/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

    return data;
  };

export const getAddresses =
  async () => {
    const { data } =
      await axios.get(
        `${userAPI}/address`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

    return data;
  };