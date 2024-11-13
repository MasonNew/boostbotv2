import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import "./Token.scss";
import { MetaProps } from "../Menu/Menu";
import { MetaContext } from "../../context/MetaContext";
import { BumpingToken } from "../addToken/addToken";

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const apiTokenMetaUrl = process.env.REACT_APP_TOKEN_META_URL;

const Token = () => {
  // Token address from router params
  const { tokenId } = useParams();
  const location = useLocation();
  // Token Meta and index in side lists
  const { tokenMeta, index } = location.state || {};
  const { user } = useContext(AuthContext);
  const { userSolBalance } = useContext(MetaContext);
  const [apiTokenMeta, setApiTokenMeta] = useState<MetaProps>(tokenMeta);
  const [tokenIndex, setTokenIndex] = useState(index);
  const [bumpAmount, setBumpAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [startLoading, setStartLoading] = useState(false);

  const handleStartBumping = async () => {
    if (bumpAmount > userSolBalance) {
      toast.error("Bump Amount should be less than account SOL balance");
      return;
    }
    if (userSolBalance <= 0) {
      toast.error("Insufficient Account SOL Balance");
      return;
    }

    const startBumping = async () => {
      return axios
        .post(
          `${apiUrl}/v1/chain/startbumping/${user.username}/${tokenId}`,
          {
            bumpingAmount: bumpAmount,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("debug startbumping resp::", response);
          setStartLoading(false);
        });
    };
    setStartLoading(true);
    toast.success("Boosting Started");
    await startBumping();
    // for(let k = 0; k < 100000; k++){
    //   for(let j = 0; j < 100000; j++) {
    //   }
    //   if(k % 100 == 0) {
    //     console.log('debug k::', k)
    //   }
    // }
  };

  const handleStopBumping = async () => {
    setLoading(true);

    // callback method
    const stopBumping = () => {
      return axios
        .post(`${apiUrl}/v1/chain/stopbumping/${user.username}/${tokenId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("debug stopbumping resp::", response);
          setLoading(false);
          setStartLoading(false);
          if(response.status == 202) {
            toast.success('Boosting stopped');
          }
        });
    };
    stopBumping();
  };

  useEffect(() => {
    const getTokenMeta = async (tokenaddress: string) => {
      const resMeta = await axios.get(
        // apiUrl + `/v1/chain/getmetadata?token=${tokenaddress}`
        apiTokenMetaUrl + `getmetadata?token=${tokenaddress}`
      );
      if (resMeta) {
        setApiTokenMeta(resMeta.data);
      }
    };
    if (tokenId && (JSON.stringify(tokenMeta) === "{}" || !tokenMeta)) {
      getTokenMeta(tokenId);
    }
  }, [tokenId]);

  return (
    <div className="home">
      <Card style={{ background: "#202938" }} className="card-box">
        <div className="flex justify-center mt-10">
          <img
            src={tokenMeta.tokenLogo ?? apiTokenMeta.tokenLogo}
            width={200}
            className="rounded-xl"
          />
        </div>
        <a
          href={`https://pump.fun/${tokenId}`}
          target="_blank"
          className="flex justify-center text-white text-3xl mt-2 mb-2"
        >
          <span>{tokenMeta.tokenName ?? apiTokenMeta.tokenName}</span>
        </a>
        <div className="flex justify-center text-white text-base mt-2 mb-2">
          <span> {tokenId} </span>
        </div>
        <div className="flex justify-center text-white text0base mt-4 mb-2">
          <span className="text-white">Buy/Sell SOL Amount </span>
        </div>
        <div className="flex justify-center items-center px-4">
          <input
            type="number"
            placeholder="0x..."
            value={bumpAmount}
            className="token-input"
            onChange={(e) => {
              setBumpAmount(parseFloat(e.target.value));
            }}
            style={{ width: "30%", minWidth: "150px" }}
            step="0.001"
            min="0"
            max={userSolBalance}
          />
        </div>
        <div className="flex justify-center mt-2 mb-2">
          <button
            className={`wallet-button m-2 ${startLoading ? "loading" : ""}`}
            onClick={() => {
              handleStartBumping();
            }}
            disabled={startLoading}
          >
            {" "}
            Start Boosting
          </button>
          <button
            className={`wallet-button m-2 ${loading ? "loading" : ""}`}
            onClick={() => {
              handleStopBumping();
            }}
            disabled={loading}
          >
            {" "}
            Stop Boosting
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Token;
