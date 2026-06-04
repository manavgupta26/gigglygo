import axios from "axios";
import API_URL from "../config/api";

const API = `${API_URL}/payment`;

export const createRazorpayOrder =
  async (amount) => {
    const { data } = await axios.post(
      `${API}/create-order`,
      { amount }
    );

    return data;
  };

export const verifyPayment =
  async (payload) => {
    const { data } = await axios.post(
      `${API}/verify`,
      payload
    );

    return data;
  };