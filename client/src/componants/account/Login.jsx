import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import './UserForm.css';
import CloseIcon from '@mui/icons-material/Close';
import bikeIcon from '../../assets/bike-logo.ico';
import { loginUser } from '../../services/api-service';
import MyContext from '../../context';

function Login() {
  const { handleLoginClose, handleLoginSubmit } = useContext(MyContext);
  const [correct, setCorrect] = useState(false);
  const [error, setError] = useState(false);

  const usernameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    loginUser(body)
      .then((res) => {
        if (res.error) throw new Error(res.error);
        setCorrect(true);
        setError(false);
        handleLoginSubmit(res.data.username);
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
          autoComplete="off"
          type="text"
          placeholder="username"
          ref={usernameRef}
        />
        <input
          autoComplete="new-password"
          type="password"
          placeholder="password"
          ref={passwordRef}
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
