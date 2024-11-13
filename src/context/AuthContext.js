import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import moment from "moment";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

// create context
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  // const [userSolBalance, setUserSolBalance] = useState(0);
  // const [userTokenMetas, setUserTokenMetas] = useState([]);
  const [newUser, setNewUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const refreshTokens = useCallback(() => {
    return axios
      .post(
        `${apiUrl}/v1/auth/refresh-tokens`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setAccessToken(response.data.token);
        setUser(response.data.user);
        setUserType(response.data.userType);
        return response;
      })
      .catch((error) => {
        setUser(null);
        setAccessToken(null);
        return error;
      });
  }, []);

  const startSilentRefresh = useCallback(() => {
    if (accessToken) {
      const tokenExpires = moment(accessToken.expires);
      const tokenMaxAge = tokenExpires.diff(moment().add(1, "minutes"));
      setTimeout(() => {
        refreshTokens();
      }, tokenMaxAge);
    }
  }, [accessToken, refreshTokens]);

  const syncLogout = (event) => {
    if (event.key === "logout") {
      setAccessToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    const interceptorId = axios.interceptors.request.use(
      (config) => {
        config.withCredentials = true;
        config.credentials = "include";
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(interceptorId);
    };
  }, [accessToken]);

  useEffect(() => {
    refreshTokens().then((response) => {
      setLoaded(true);
    });
  }, [refreshTokens]);

  useEffect(() => {
    startSilentRefresh();
  }, [accessToken, startSilentRefresh]);

  useEffect(() => {
    window.addEventListener("storage", syncLogout);
    return function cleanup() {
      window.removeEventListener("storage", syncLogout);
    };
  }, []);

  // useEffect(() => {
  //   const getSolBalance = async (walletAddress) => {
  //     const resBalance = await axios.get(
  //       // apiUrl + `/v1/chain/getbalance?wallet=${walletAddress}&ismain=${false}`
  //       apiTokenMetaUrl + `getbalance?wallet=${walletAddress}&netoption=main`
  //     );
  //     if (resBalance.status == 200) {
  //       setUserSolBalance(resBalance.data);
  //     } else {
  //       console.log("debug fetching balance error::", resBalance);
  //     }
  //   };
  //   if (user && user.wallet) {
  //     getSolBalance(user.wallet);
  //   }
  // }, [user])

  // useEffect(() => {
  //   const getMetadatas = async (tokens) => {
  //     let metadatas = [];
  //     for (let k = 0; k < tokens.length; k++) {
  //       const res = await axios.get(
  //         // apiUrl + `/v1/chain/getmetadata?token=${tokens[k].token}`
  //         apiTokenMetaUrl + `getmetadata?token=${tokens[k].token}`
  //       );
  //       metadatas.push(res.data);
  //     }
  //     setUserTokenMetas(metadatas);
  //   };
  //   if (user && user.tokens && (JSON.parse(user.tokens)).length > 0) {
  //     const tokensJson = JSON.parse(user.tokens);
  //     if (tokensJson.length > 0) {
  //       getMetadatas(tokensJson);
  //     }
  //   }
  // }, [user]);

  const value = useMemo(() => {
    const register = ({ username, email, password }) => {
      console.log("debug reg::", username, email, password);
      return axios
        .post(
          `${apiUrl}/v1/auth/register`,
          {
            username,
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("debug reg::", response);
          setUser(response.data.user);
        });
    };

    const login = (email, password) => {
      return axios
        .post(
          `${apiUrl}/v1/auth/login`,
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setAccessToken(response.data.token);
          setUser(response.data.user);
          setUserType(response.data.userType);
          // startSilentRefresh();
        });
    };

    const logout = () => {
      setAccessToken(null);
      setUser(null);
      setUserType(null);
      return axios
        .post(`${apiUrl}/v1/auth/logout`, {})
        .then((response) => {
          window.localStorage.setItem("logout", moment());
        })
        .catch((err) => {});
    };

    const changePassword = (newPassword, username, email) => {
      console.log('debug auth pwd::', newPassword, username, email)
      return axios
        .post(
          `${apiUrl}/v1/auth/change-password`,
          {
            newPassword: newPassword,
            username: username,
            email: email
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log('debug pwd res::', response)
          alert("password changed");
        });
    };

    return {
      user,
      userType,
      newUser,
      // userSolBalance,
      // userTokenMetas,
      setUser,
      register,
      login,
      logout,
      changePassword,
    };
    // }, [user, userType, newUser, userSolBalance, userTokenMetas]);
  }, [user, userType, newUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
