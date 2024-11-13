import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Forms/LoginForm";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!!user) {
      navigate("/token");
    }
  }, [navigate, user]);

  return (
    <div>
      {/* <div className="navbar">
        <div className="flex items-center"></div>
        <div className="icons">
          <img src="/images/user.svg" width={32} alt="" className="icon" />
        </div>
      </div> */}
      <LoginForm />
    </div>
  );
};

export default LoginPage;
