import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import moment from "moment";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

// create context
export const OrderContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [orders, setOrders] = useState(null);

  const value = useMemo(() => {
    const getOrders = () => {
      return axios
        .get(
          `${apiUrl}/v1/orders`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setOrders(response.data.orders);
        });
    };

    const updateDelivery = (id) => {
      const postData = {};
      return axios
        .put(`${apiUrl}/v1/orders/${id}`, postData)
        .then((response) => {
          getOrders();
        });
    };

    const deleteOrder = (orderId) => {
      return axios
        .delete(`${apiUrl}/v1/orders/${orderId}`, {})
        .then((response) => {
          alert("Order Deleted!");
          getOrders();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      orders,
      getOrders,
      updateDelivery,
      deleteOrder,
    };
  }, [orders]);

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};
