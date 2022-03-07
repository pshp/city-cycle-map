import React, {
  useState, useRef, useContext, useEffect,
} from 'react';
import './UserForm.css';
import CloseIcon from '@mui/icons-material/Close';
import bikeIcon from '../../assets/bike-logo.ico';
import { newUser } from '../../services/api-service';
import MyContext from '../../context';

export default function Register() {
  const { handleRegisterClose } = useContext(MyContext);
  const [correct, setCorrect] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    newUser(body)
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

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <div className="user-form-container">
      <CloseIcon
        className="user-form-close close-button icon-button"
        onClick={() => handleRegisterClose()}
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
          Register
        </button>
      </form>
      {correct && <p className="correct">Account created. Please log in</p>}
      {error && <p className="error">Something went wrong...</p>}
    </div>
  );
}
