import axios from "axios";

const API =
  "http://localhost:8000/api/payment";

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