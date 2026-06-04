import axios from "axios";
import API_URL from "../config/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "adminToken"
    )}`,
  },
});

export const getOrders =
  async () => {
    const response =
      await axios.get(
        `${API_URL}/admin/orders`,
        getAuthHeaders()
      );

    return response.data;
  };

export const updateOrderStatus =
  async (
    id,
    orderStatus
  ) => {
    const response =
      await axios.put(
        `${API_URL}/admin/orders/${id}/status`,
        {
          orderStatus,
        },
        getAuthHeaders()
      );

    return response.data;
  };

export const getOrderStats =
  async () => {
    const response =
      await axios.get(
        `${API_URL}/admin/orders/stats`,
        getAuthHeaders()
      );

    return response.data;
  };