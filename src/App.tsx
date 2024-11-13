import { ReactNode, useContext, useEffect, useState, useRef } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import NavDropdown from "./components/Navbar/NavDropdown";

import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage";

import "./styles/global.scss";
import "./components/Navbar/Navbar.scss";
import { AuthContext } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import UserLogo from "./assets/images/user.png";
import hamOpen from "./assets/images/hamburger.svg";
import hamClose from "./assets/images/hamburgerClose.svg";
import SolanaLogo from "./assets/images/solana.svg";
import RefreshLogo from "./assets/images/refresh.svg";
import WithdarwLogo from "./assets/images/withdraw.svg";
import CopyLogo from "./assets/images/copy.svg";
import CopiedLogo from './assets/images/copied.svg';
import Token from "./components/Token/Token";
import Withdraw from "./components/withdraw/withdraw";
import { MetaContext } from "./context/MetaContext";
import { setTimeout } from "timers/promises";

type ProtectedRouteProps = {
  // element?: ReactNode;
  redirectPath?: string;
  children?: ReactNode;
};

interface RouteObject {
  path?: string;
  element?: ReactNode;
  children?: RouteObject[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  // user,
  redirectPath = "/",
  children,
}) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
const apiTokenMetaUrl = process.env.REACT_APP_TOKEN_META_URL;

const App = () => {
  const { user } = useContext(AuthContext);
  const { userSolBalance, setUserSolBalance } = useContext(MetaContext);
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [wSize, setWSize] = useState(window.innerWidth);
  const [copied, setCopied] = useState(false);
  const [openWithdarw, setOpenWithdraw] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const onCopy = () => {
    setCopied(true);
    window.setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    setWSize(window.innerWidth);
  };

  const handleWithdraw = () => {
    setOpenWithdraw(true);
  };

  const handleRefresh = async () => {
    setRefreshFlag(true);
    console.log('debug refresh::', user.wallet)
    try {
      const resBalance = await axios.get(
        // apiUrl + `/v1/chain/getbalance?wallet=${walletAddress}&ismain=${false}`
        apiTokenMetaUrl + `getbalance?wallet=${user.wallet}&netoption=main`
      );
      console.log('debug refresh::', resBalance)
      if (resBalance.status == 200) {
        setUserSolBalance(resBalance.data);
      }
    } catch (error) {
      toast.error(
        "An error occurred while get your account's Sol balance."
      );
      console.log('debug refresh error::', error)
    } finally {
      setRefreshFlag(false);
    }
    // window.setTimeout(() => {
    //   setRefreshFlag(false);
    // }, 3000);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {}, [refreshFlag])
  
  const Layout = () => {
    return (
      <div className="main">
        {wSize >= 960 && (
          <div className="menuContainer">
            <Menu />
          </div>
        )}
        {wSize < 960 && (
          <div
            className="menuContainer"
            ref={sidebarRef}
            style={{ display: isOpen ? "block" : "none" }}
          >
            <Menu />
          </div>
        )}
        <div className="mainContainer">
          <div className="navbar">
            <div className="flex items-center">
              <div className="hamburger-box">
                <button
                  onClick={() => {
                    toggleOpen();
                  }}
                >
                  {isOpen && <img src={hamClose} alt="" />}
                  {!isOpen && <img src={hamOpen} alt="" />}
                </button>
              </div>
            </div>
            <div className="icons">
              <div className="user">
                <CopyToClipboard text={user?.wallet} onCopy={onCopy}>
                  <img
                    src={copied ? CopiedLogo : CopyLogo}
                    alt="copyLogo"
                    className="copy2board"
                  />
                </CopyToClipboard>
                <a
                  href={`https://solscan.io/account/${user?.wallet}`}
                  target="_blank"
                >
                  <img src={SolanaLogo} alt="solanaLogo" />
                </a>
                <span>{userSolBalance.toFixed(3)}</span>
                <button className="refresh-btn" onClick={() => {handleRefresh()}}>
                  <img src={RefreshLogo} alt="refreshLogo" style={{opacity: refreshFlag ? "0.5" : "1"}}/>
                </button>
                <span>{user?.username}</span>
                <div
                  className="flex items-center withdraw-box"
                  onClick={() => {
                    handleWithdraw();
                  }}
                >
                  {/* <img src={WithdarwLogo} alt="userlogo" width={30} /> */}
                  <span className="mx-2">Withdraw</span>
                </div>
              </div>
              <NavDropdown />
            </div>
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        {openWithdarw && (
          <Withdraw slug="Withdraw Funds" setOpenWithdraw={setOpenWithdraw} />
        )}
      </div>
    );
  };

  const routes = [
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <RegisterPage />,
    },
    // ...protectedRoutes,
    {
      path: "/token",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/token",
          element: <Home />,
        },
        {
          path: "/token/:tokenId",
          element: <Token />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default App;
