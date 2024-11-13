import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import "./withdraw.scss";
import { AuthContext } from "../../context/AuthContext";
import InfoLogo from "../../assets/images/info.svg";
import AlertLogo from "../../assets/images/alert-info.svg";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

type Props = {
  slug: string;
  // columns: GridColDef[];
  setOpenWithdraw: React.Dispatch<React.SetStateAction<boolean>>;
};

const Withdraw = (props: Props) => {
  const { user } = useContext(AuthContext);
  const [destAddress, setDestAddress] = useState("");

  const handleWithdraw = () => {
    if (!destAddress) {
      return;
    }

    const withdrawSOL = async () => {
      return axios
        .post(
          `${apiUrl}/v1/chain/withdraw`,
          {
            username: user.username,
            email: user.email,
            destAddress: destAddress,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("debug addToken resp::", response);
          if (response.data.txId) {
            toast.success(
              (t) => (
                <>
                  <div className="px-2">
                    <span>
                      {`Withdrawal successful! \n`}
                      <a href={`https://solscan.io/tx/${response.data.txId}`} target="_blank" className="text-lg">
                        Your transaction
                      </a>
                    </span>
                  </div>
                  <div className="flex border-l border-gray-200">
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="w-full border border-transparent rounded-none rounded-r-lg p-1 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      Close
                    </button>
                  </div>
                </>
              ),
              {
                duration: 10000,
                // style: {
                //   borderRadius: "10px",
                //   background: "#202938",
                //   color: "#fff",
                // },
              }
            );
          } else {
            toast.error(
              (t) => (
                <>
                  <div className="px-2 flex items-center">
                    <span>
                      {`Withdrawal failed! \n`}
                    </span>
                  </div>
                  <div className="flex border-l border-gray-200">
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="w-full border border-transparent rounded-none rounded-r-lg p-1 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      Close
                    </button>
                  </div>
                </>
              ),
              {
                duration: 60000,
              }
            );
          }
        });
    };

    withdrawSOL();
    props.setOpenWithdraw(false);
  };

  return (
    <div className="withdraw">
      <div className="modal">
        {/* <span className="close" onClick={() => props.setOpenWithdraw(false)}>
          X
        </span> */}
        <h2 className="mt-2 mb-2 text-xl">{props.slug}</h2>
        <div className="data-show mt-4">
          <img src={InfoLogo} alt="info logo" className="mr-4"></img>
          <span>
          Enter your destination wallet address
          </span>
        </div>
        <input
          type="text"
          placeholder="0x..."
          onChange={(e) => setDestAddress(e.target.value)}
          value={destAddress}
          className="token-input mt-4"
        ></input>

        <div className="data-alert">
          <img src={AlertLogo} alt="info log" className="mr-4"></img>
          <span>
            All token bumping will stop and your SOL account balance will be
            withdrawn to your wallet.
          </span>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="btn-primary mt-2 mx-2"
            onClick={() => {
              handleWithdraw();
            }}
          >
            Confirm{" "}
          </button>
          <button
            className="btn-primary mt-2 mx-2"
            onClick={() => {
              props.setOpenWithdraw(false);
            }}
          >
            Cancel{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
