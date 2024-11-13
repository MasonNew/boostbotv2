import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Forms/LoginForm";
import SignupForm from "../components/Forms/SignupForm";
import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { user, newUser } = useContext(AuthContext);

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
      <SignupForm />
    </div>
  );
};

export default RegisterPage;
