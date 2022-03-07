import React, { useState, useRef, useContext } from "react";
import "./Register";
import "./Register.css";
import bikeIcon from "../../assets/bike-logo.ico";
import { newUser } from "../../services/api-service";
import CloseIcon from "@mui/icons-material/Close";
import { MyContext } from "../../context";

export default function Register() {
  const { handleRegisterClose } = useContext(MyContext);
  const [correct, setCorrect] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    newUser(body)
      .then((res) => {
        if (res.error) throw new Error(res.error);
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
    <div className="register-container">
      <CloseIcon

              className="register-close close-button icon-button"
              onClick={() => handleRegisterClose()}
            />
      <div className="logo-title">
        <img className="logo" src={bikeIcon} />
        <p> &nbsp; &nbsp;Cycle Map Berlin</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input autoComplete="off" type="text" placeholder="username" ref={usernameRef} />
        <input autoComplete="off" type="email" placeholder="email" ref={emailRef} />
        <input autoComplete="new-password" type="password" placeholder="password" ref={passwordRef} />
        <button className="register-button" type="submit">
          Register
        </button>

      </form>
      {correct && <p className="correct">Account created. Please log in</p>}
        {error && <p className="error">Something went wrong...</p>}
    </div>
  );
}
