import React, { useContext } from "react";
import "./UserButtons.css";
import { MyContext } from "../../context";

const UserButtons = () => {
  const {
    handleRegisterStart,
    handleRegisterSubmit,
    handleLoginStart,
    handleLoginSubmit,
    handleLogout,
  } = useContext(MyContext);

  return (
    <div className="user-buttons">
      <button className="logout" onClick={handleLogout}>Log Out</button>
      <button className="login" onClick={handleLoginStart}>LogIn</button>
      <button className="register" onClick={handleRegisterStart}>Register</button>
    </div>
  );
};

export default UserButtons;
