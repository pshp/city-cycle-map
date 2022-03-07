import React, { useState, useRef, useContext } from "react";
import "./Login.css";
import bikeIcon from "../../assets/bike-logo.ico";
import { loginUser } from "../../services/api-service";
import CloseIcon from "@mui/icons-material/Close";
import { MyContext } from "../../context";

const Login = () => {
  const { handleLoginClose } = useContext(MyContext);
  const [correct, setCorrect] = useState(false);
  const [error, setError] = useState(false);
  // const usernameRef = useRef();
  // const emailRef = useRef();
  // const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    loginUser(body)
      .then((result) => {
        if (result.error) throw new Error(result.error);
        setCorrect(true);
        setError(false);
      })
      .catch((e) => {
        console.log(e);
        setCorrect(false);
        setError(true);
      });
  };

  return (
    <>
      <div className="login-container">
        <CloseIcon
          className="login-close close-button icon-button"
          onClick={() => handleLoginClose()}
        />
        <div className="logo-title">
          <img className="logo" src={bikeIcon} />
          <p> &nbsp; &nbsp;Cycle Map Berlin</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            autoComplete="off"
            type="text"
            placeholder="username"
          />
          <input
            name="password"
            autoComplete="new-password"
            type="password"
            placeholder="password"
          />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        {correct && <p className="correct">Success</p>}
        {error && <p className="error">Wrong username or password</p>}
      </div>
    </>
  );
};

export default Login;
