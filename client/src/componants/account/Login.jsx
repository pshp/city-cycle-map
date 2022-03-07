import React, { useState, useContext } from 'react';
import './UserForm.css';
import CloseIcon from '@mui/icons-material/Close';
import bikeIcon from '../../assets/bike-logo.ico';
import { loginUser } from '../../services/api-service';
import MyContext from '../../context';

function Login() {
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
      .then((res) => {
        if (res.error) throw new Error(res.error);
        setCorrect(true);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setCorrect(false);
        setError(true);
      });
  };

  return (
    <div className="user-form-container">
      <CloseIcon
        className="user-form-close close-button icon-button"
        onClick={() => handleLoginClose()}
      />
      <div className="logo-title">
        <img alt="" className="logo" src={bikeIcon} />
        <p>Cycle Map Berlin</p>
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
        <button className="user-form-button" type="submit">
          Login
        </button>
      </form>
      {correct && <p className="correct">Success</p>}
      {error && <p className="error">Wrong username or password</p>}
    </div>
  );
}

export default Login;
