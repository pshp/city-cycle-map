import React, { useContext } from 'react';
import './UserButtons.css';
import MyContext from '../../context';

function UserButtons() {
  const {
    handleRegisterStart,
    handleLoginStart,
    handleLogout,
  } = useContext(MyContext);

  return (
    <div className="user-buttons">
      <button type="button" className="logout" onClick={handleLogout}>Log Out</button>
      <button type="button" className="login" onClick={handleLoginStart}>LogIn</button>
      <button type="button" className="register" onClick={handleRegisterStart}>Register</button>
    </div>
  );
}

export default UserButtons;
