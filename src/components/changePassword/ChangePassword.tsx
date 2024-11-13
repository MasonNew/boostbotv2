import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./changePassword.scss";

type Props = {
  slug: string;
  setPwdOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChangePassword = (props: Props) => {
  const [newPwd, setNewPwd] = useState("");
  const { changePassword, user, } = useContext(AuthContext);

  const handleSubmit = (newPassword: string) => {
    console.log('debug pwd::', user.username, user.email)
    changePassword(newPassword, user.username, user.email);
  };
  // //////////////////////
  return (
    <div className="change-pwd">
      <div className="modal">
        {/* <span className="close" onClick={() => props.setPwdOpen(false)}>
          X
        </span> */}
        <h2 className="mt-2 mb-6 text-xl">{props.slug}</h2>

        <input
          type="password"
          placeholder="enter new password"
          name="password"
          onChange={(e) => setNewPwd(e.target.value)}
          value={newPwd}
          className="token-input"
        />
        <div className="flex justify-between mt-4">
          <button className="btn-primary mt-2 mx-2" onClick={() => {handleSubmit(newPwd)}}>Add </button>
          <button className="btn-primary mt-2 mx-2" onClick={() => {props.setPwdOpen(false)}}>Cancel </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
