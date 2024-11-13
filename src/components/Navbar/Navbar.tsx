import "./Navbar.scss";
import NavDropdown from "./NavDropdown";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import UserLogo from "../../assets/images/user.png";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="logo">
        {/* <img src="logo.svg" alt="" /> */}
        <span>Boost Bot!</span>
      </div>
      <div className="icons">
        {/* <img src="/search.svg" alt="" className="icon" /> */}
        {/* <img src="/app.svg" alt="" className="icon" /> */}
        {/* <img src="/expand.svg" alt="" className="icon" /> */}
        {/* <div className="notification">
        <img src="/notifications.svg" alt="" />
        <span>1</span>
      </div> */}
        <div className="user">
          {/* <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          /> */}
          <img src={UserLogo} alt="userlogo" width={30} />
          <span>{user?.username}</span>
        </div>
        {/* <img src="/images/setting.svg" alt="" className="icon" /> */}
        <NavDropdown />
      </div>
    </div>
  );
};

export default Navbar;
