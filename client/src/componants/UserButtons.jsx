import React from "react";
import "./UserButtons.css";

const UserButtons = () => {
  return (
    <div className="user-buttons">
      <button className="logout">Log Out</button>
      <button className="login">LogIn</button>
      <button className="register">Register</button>
    </div>
  );
};

export default UserButtons;
