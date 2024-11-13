import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../context/AuthContext";
import { MetaContext } from "../../context/MetaContext";
import { LISINT_TOKEN_FEE, sideMenu } from "../../data";
import AddToken from "../addToken/addToken";
import TokenLists from "./TokenLists";
import "./Menu.scss";
import OrderSvg from "../../assets/images/order.svg";
import DetailsLogo from "../../assets/images/expand.svg";
import TelegramLogo from "../../assets/images/telegram.svg";
import SiteLogo from "../../assets/images/logo.png";
import TwitterLogo from '../../assets/images/twitter.svg';

export interface MetaProps {
  tokenName: string;
  tokenSymbol: string;
  tokenLogo: string;
}

export interface DumpProps {
  token: string;
  dumping: boolean;
}

export interface TokenShowingProps {
  id: number;
  visible: boolean;
}

const LISTINGTOKENFEE = process.env.REACT_APP_LISTING_TOKEN_FEE || LISINT_TOKEN_FEE;

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#199f72",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark" ? "rgba(255,255,255,.35)" : "#585f6a",
    boxSizing: "border-box",
  },
}));

const Menu = () => {
  const { user } = useContext(AuthContext);
  const { userTokenMetas, userSolBalance, userTokenShowing } =
    useContext(MetaContext);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [checkedShow, setCheckedShow] = useState(true);
  const [tokenMetas, setTokenMetas] = useState(userTokenMetas);
  const tokensJson =
    typeof user.tokens === "object" ? user.tokens : JSON.parse(user.tokens);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedShow(event.target.checked);
  };

  const handleAddToken = () => {
    setOpen(true);
  };
  
  return (
    <div className="menu">
      <div className="site-logo flex items-center justify-center mt-6">
        <Link to={"/token"} className="flex items-center">
          <img src={SiteLogo} alt="site logo" width={72} />
          <span className="text-green-400 text-2xl logo-text"> BOOST </span>
          <span className="text-2xl text-white logo-text"> BOT</span>
        </Link>
      </div>
      <div className="flex justify-center text-xl pt-4 pb-4 mt-10">
        <span>TOKEN LIST</span>
      </div>
      <div className="side-token-box">
        <div className="flex justify-center">
          <button
            className="wallet-button logo-text text-base"
            onClick={() => {
              handleAddToken();
            }}
            disabled={
              userSolBalance < parseFloat(LISTINGTOKENFEE)
            }
          >
            + Add Token
          </button>
        </div>
        <div className="side-divider" role="separator"></div>
        <div className="side-list">
          <div className="px-3 my-2 flex justify-end">
            <Stack direction="row" spacing={1} alignItems="center">
              <AntSwitch
                inputProps={{ "aria-label": "ant design" }}
                checked={checkedShow}
                onChange={handleChange}
              />
              <Typography className="text-white px-1">Show hidden</Typography>
            </Stack>
          </div>
          {userTokenMetas.map((meta: MetaProps, index: number) => (
            <TokenLists
              tokenMeta={meta}
              tokenIndex={index}
              tokenShowing={userTokenShowing[index]}
              tokenAddress={tokensJson[index].token}
              selected={selected}
              setSelected={setSelected}
              checkedShow={checkedShow}
              username={user.username}
              email={user.email}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="side-social">
        <div className="flex justify-center pt-2 pb-2 listItemTitle">
          <img src={OrderSvg} alt="" className="mr-4" />
          <a href="https://discord.gg/n7y2GVzXrj"><span className="text-white text-base">Submit A Ticket</span></a>
        </div>
        <div className="flex justify-center pt-2 pb-2 listItemTitle" >
          <img src={TwitterLogo} alt="" className="mr-4" />
          <a href="https://x.com/BoostBotDotFun"><span className="text-white text-base">Twitter</span></a>
        </div>
        <div className="flex justify-center pt-2 pb-2 listItemTitle">
          <img src={TelegramLogo} alt="" className="mr-4" />
          <a href="https://t.me/BoostBotDotFun"><span className="text-white text-base">Telegram</span></a>
        </div>
      </div>
      {open && (
        <>
          <AddToken slug="token" setOpen={setOpen} />
        </>
      )}
    </div>
  );
};

export default Menu;
