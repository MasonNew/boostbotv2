import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShowLogo from "../../assets/images/show.svg";
import HiddenLogo from "../../assets/images/hidden.svg";
import "./Menu.scss";
import { MetaProps } from "./Menu";

interface Props {
  tokenIndex: number;
  tokenMeta: MetaProps;
  tokenShowing: boolean;
  tokenAddress: string;
  selected: number;
  setSelected: (index: number) => void;
  checkedShow: boolean;
  username: string;
  email: string;
}

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const TokenLists = (props: Props) => {
  const navigate = useNavigate();
  const [tokenShowing, setTokenShowing] = useState(props.tokenShowing);
  const [loading, setLoading] = useState(false);

  const handleTokenId = (tokenId: number) => {
    const tokenMeta = props.tokenMeta;
    const tokenAddress = props.tokenAddress;
    props.setSelected(tokenId);
    navigate(`/token/${tokenAddress}`, { state: { tokenMeta, index: tokenId } });
  };

  const handleShowToken = async () => {
    const tokenAddress = props.tokenAddress;
    setLoading(true);
    // setTokenShowing(!tokenShowing);
    const toggleTokenShowing = async () => {
      return axios
        .post(
          `${apiUrl}/v1/customers/toggleshow`,
          {
            username: props.username,
            email: props.email,
            token: tokenAddress,
            showing: !tokenShowing,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          // props.setUser(response.data.customer);
          setTokenShowing(
            response.data.customer.tokens[props.tokenIndex].show ??
              !tokenShowing
          );
        });
    };

    await toggleTokenShowing();
    setLoading(false);
  };

  return props.checkedShow || tokenShowing ? (
    <div
      className={`flex justify-between items-center ${
        loading ? "token-loading" : ""
      }`}
    >
      <div
        className={`token-logo-box ${
          props.selected == props.tokenIndex ? "selected" : ""
        }`}
        key={props.tokenIndex}
        onClick={() => {
          handleTokenId(props.tokenIndex);
        }}
      >
        <img src={props.tokenMeta?.tokenLogo} className="token-logo mr-4" />
        <span>
          {props.tokenMeta?.tokenName}({props.tokenMeta?.tokenSymbol})
        </span>
      </div>
      {props.checkedShow && (
        <div>
          <button
            className="btn-icon"
            onClick={() => {
              handleShowToken();
            }}
          >
            <img
              src={tokenShowing ? ShowLogo : HiddenLogo}
              alt="show-logo"
              width={18}
            />
          </button>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default TokenLists;
