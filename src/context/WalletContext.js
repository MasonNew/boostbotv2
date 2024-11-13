import React, {
  useMemo,
  useState
} from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

// create context
export const WalletContext = React.createContext();

export const WalletProvider = ({
  children
}) => {
  const [wallets, setWallets] = useState(null);

  const value = useMemo(() => {
    const getWallets = () => {
      console.log("get Wallets")
      return axios
        .get(
          `${apiUrl}/v1/wallets`, {}, {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("get Wallets", response.data)
          setWallets(response.data.wallets);
        });
    };

    const createWallets = (userid, network, address) => {
      console.log("create Wallets", userid, network, address)
      return axios
        .post(
          `${apiUrl}/v1/wallets`, {
            userid,
            network,
            address
          }, {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("create Wallets", response.data)
          getWallets();
          alert("Wallet created!")
          setWallets(response.data.wallets);
        });
    };

    const updateWalletById = (walletId, wallet) => {
      const postData = {
        wallet: wallet,
      };
      return axios
        .put(`${apiUrl}/v1/wallets/${walletId}`, postData)
        .then((response) => {
          console.log("wallet Updated::", response);
          getWallets();
          alert("Wallet updated!");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      wallets,
      getWallets,
      createWallets,
      updateWalletById,
    };
  }, [wallets]);

  return ( <
    WalletContext.Provider value = {
      value
    } > {
      children
    } </WalletContext.Provider>
  );
};