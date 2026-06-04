import axios from "axios";

const token =
  localStorage.getItem("token");

const orderAPI =
  "http://localhost:8000/api/orders";

const userAPI =
  "http://localhost:8000/api/users";

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