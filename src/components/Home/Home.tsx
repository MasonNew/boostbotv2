import { useContext, useState } from "react";
import { Card } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AuthContext } from "../../context/AuthContext";
import CopyLogo from "../../assets/images/copy.svg";
import "./Home.scss";


const Home = () => {
  const { user } = useContext(AuthContext);
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="home">
        <Card style={{ background: "#202938" }} className="p-6 card-box">
          <div className="flex justify-center text-white mt-2 mb-7 cardtitle ">
            <span className="break-words text-center">
              {" "}
              Deposit SOL to your boost wallet to begin
            </span>
          </div>
          <div className="flex justify-center text-white mt-2 mb-7">
            <span className="break-words text-center">
              {" "}
              Your wallet address is permanent. Please save this address for
              future use.{" "}
            </span>
          </div>
          <div className="px-1 py-2 flex justify-between text-white">
            <span>Public Key</span>
            {copied && <span>Copied</span>}
          </div>
          <div className="flex justify-center items-center mb-7">
            <input
              type="text"
              placeholder="0x..."
              value={user?.wallet}
              className="token-input"
              disabled={true}
            />
            <div className="copy-box">
              <CopyToClipboard text={user?.wallet} onCopy={onCopy}>
                <img src={CopyLogo} alt="copy" />
              </CopyToClipboard>
            </div>
          </div>
          <div className="flex justify-center mt-2 mb-2 ">
            <span className="break-words text-center text-white">
              Click "Add New Token" in the side bar to start boosting!
            </span>
          </div>
        </Card>
    </div>
  );
};

export default Home;
