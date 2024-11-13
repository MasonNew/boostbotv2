import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import moment from "moment";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

// create context
export const CustomerContext = React.createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState(null);
  const [newCustomer, setNewCustomer] = useState(null);

  const value = useMemo(() => {
    const getCustomers = () => {
      return axios
        .get(
          `${apiUrl}/v1/customers`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
            console.log('debug customers', response.data)
            setCustomers(response.data.customers);
        });
    };

    const addCustomer = ({email, phonenumber, telegram, username, password, createdby}) => {
      return axios
        .post(
          `${apiUrl}/v1/customers`,
          {
            email,
            phonenumber,
            telegram,
            username,
            password,
            createdby
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setNewCustomer(response.data.customer);
        });
    };

    const deleteCustomer = (customerId) => {
      return axios
        .delete(`${apiUrl}/v1/customers/${customerId}`, {})
        .then((response) => {
          console.log("customer Deleted");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      customers,
      getCustomers,
      addCustomer,
      deleteCustomer,
    };
  }, [customers]);

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
};
