import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import moment from "moment";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

// create context
export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(null);

  const value = useMemo(() => {
    const getUsers = () => {
      return axios
        .get(
          `${apiUrl}/v1/users`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setUsers(response.data.users);
        });
    };

    const deleteUser = (userId) => {
      return axios
        .delete(`${apiUrl}/v1/users/${userId}`, {})
        .then((response) => {
          console.log("user Deleted");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      users,
      getUsers,
      deleteUser,
    };
  }, [users]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
