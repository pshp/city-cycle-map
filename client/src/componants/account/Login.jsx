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
      // username: usernameRef.current.value,
      // email: emailRef.current.value,
      // password: passwordRef.current.value,
    };

    loginUser(body)
      .then((res) => {
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
        <input autoComplete="off" type="text" placeholder="username" />
        <input autoComplete="new-password" type="password" placeholder="password" />
        <button className="login-button" type="submit">
          Login
        </button>
        {correct && <p className="correct">Signup successful! Please log in</p>}
        {error && <p className="error">Something went wrong...</p>}
      </form>
    </div>
    </>
  );
}


export default Login;
