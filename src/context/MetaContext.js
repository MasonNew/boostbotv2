import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

const apiTokenMetaUrl = process.env.REACT_APP_TOKEN_META_URL;

// create context
export const MetaContext = React.createContext();

export const MetaProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [userSolBalance, setUserSolBalance] = useState(0);
  const [userTokenMetas, setUserTokenMetas] = useState([]);
  const [userTokenShowing, setUserTokenShowing] = useState([]);

  useEffect(() => {
    const getSolBalance = async (walletAddress) => {
      try {
        const resBalance = await axios.get(
          // apiUrl + `/v1/chain/getbalance?wallet=${walletAddress}&ismain=${false}`
          apiTokenMetaUrl + `getbalance?wallet=${walletAddress}&netoption=main`
        );
        if (resBalance.status == 200) {
          setUserSolBalance(resBalance.data);
        }
      } catch (error) {
        toast.error(
          "An error occurred while get your account's Sol balance."
        );
      }
    };
    if (user && user.wallet) {
      getSolBalance(user.wallet);
    }
  }, [user]);

  useEffect(() => {
    const getMetadatas = async (tokens) => {
      let metadatas = [];
      let tokenShow = [];
      for (let k = 0; k < tokens.length; k++) {
        tokenShow.push(tokens[k].show);
        const res = await axios.get(
          apiTokenMetaUrl + `getmetadata?token=${tokens[k].token}`
        );
        metadatas.push(res.data);
      }
      setUserTokenMetas(metadatas);
      setUserTokenShowing(tokenShow);
    };
    if (user && user.tokens) {
      let tokensJson;
      if (typeof user.tokens === "object" && user.tokens !== null) {
        tokensJson = user.tokens;
      } else if (typeof user.tokens === "string") {
        tokensJson = JSON.parse(user.tokens);
      } else {
        tokensJson = [];
      }
      if (tokensJson.length > 0) {
        getMetadatas(tokensJson);
      }
    }
  }, [user]);

  const value = useMemo(() => {
    return {
      userTokenMetas,
      userSolBalance,
      userTokenShowing,
      setUserSolBalance
    };
  }, [userSolBalance, userTokenMetas, userTokenShowing, user, setUserSolBalance]);

  return (
    <MetaContext.Provider value={value}> {children} </MetaContext.Provider>
  );
};
