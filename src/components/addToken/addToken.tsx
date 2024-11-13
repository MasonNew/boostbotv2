import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./addToken.scss";
import { AuthContext } from "../../context/AuthContext";
import { MetaContext } from "../../context/MetaContext";
import InfoLogo from "../../assets/images/info.svg";
import AlertLogo from "../../assets/images/alert-info.svg";
import { LISINT_TOKEN_FEE } from "../../data";
import zIndex from "@mui/material/styles/zIndex";

type Props = {
  slug: string;
  // columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface BumpingToken {
  token: string;
  bumping: boolean;
  show: boolean;
}

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const LISTINGTOKENFEE =
  process.env.REACT_APP_LISTING_TOKEN_FEE || LISINT_TOKEN_FEE;

const AddToken = (props: Props) => {
  const { user, setUser } = useContext(AuthContext);
  const { userSolBalance } = useContext(MetaContext);
  const [tokenAddress, setTokenAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddToken = async () => {
    if (userSolBalance < parseFloat(LISTINGTOKENFEE)) {
      toast.error("Insufficient SOL balance in your account");
      return;
    }
    if (tokenAddress.length !== 44 && tokenAddress.length !== 43) {
      toast.error("Invalid Token Address");
      return;
    }
    if (user.tokens && user.tokens.length > 0) {
      let userTokens = user.tokens;
      if (typeof user.tokens === "object" && user.tokens !== null) {
        userTokens = user.tokens;
      } else if (typeof user.tokens === "string") {
        userTokens = JSON.parse(user.tokens);
      } else {
        userTokens = [];
      }
      const hasToken = userTokens.some(
        (tokenObj: BumpingToken) => tokenObj.token === tokenAddress
      );
      if (hasToken) {
        toast.error(
          "Can not add a second token when it's currently already added"
        );
        return;
      }
    }
    const addTokenWithDump = async () => {
      return axios
        .post(
          `${apiUrl}/v1/customers/addtokensbump`,
          {
            username: user.username,
            email: user.email,
            tokens: [
              {
                token: tokenAddress,
                bumping: false,
                show: true,
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("debug add res::", response);
          setUser(response.data.customer);
          setLoading(false);
          toast.success("Token added");
          props.setOpen(false);
        });
    };
    setLoading(true);
    await addTokenWithDump();
  };

  return (
    <div className="add-token flex">
      {loading && (
        <Box className="flex absolute" style={{zIndex: '250'}}>
          <CircularProgress />
        </Box>
      )}
      <div className={`modal ${loading ? "loading" : ""} relative z-0`}>
        <h2 className="mt-2 mb-2 text-xl">Add {props.slug}</h2>
        <input
          type="text"
          placeholder="0x..."
          onChange={(e) => setTokenAddress(e.target.value)}
          value={tokenAddress}
          className="token-input"
        ></input>
        <div className="data-show">
          <img src={InfoLogo} alt="info logo" className="mr-4"></img>
          <span>
            Feel free to close this window while the token is being added.
          </span>
        </div>
        <div className="data-alert">
          <img src={AlertLogo} alt="info log" className="mr-4"></img>
          <span>Adding a token costs 0.2 SOL</span>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="btn-primary mt-2 mx-2"
            onClick={() => {
              handleAddToken();
            }}
          >
            Add{" "}
          </button>
          <button
            className="btn-primary mt-2 mx-2"
            onClick={() => {
              props.setOpen(false);
            }}
          >
            Cancel{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToken;
