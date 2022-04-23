import { useState, useContext } from 'react';
import { useNavigate  } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import styles from './AuthForm.module.css';
import useInput from '../../hooks/use-input';
import LoadingSpinner from '../UI/LoadingSpinner';
import Card from '../UI/Card';

const AuthForm = () => {
  const navigate = useNavigate ();
  const { value:enteredUsername, isValid: usernameIsValid, hasError: usernameHasError, valueChangeHandler: usernameChangeHandler, inputBlurHandler: usernameInputBlurHandler, reset: resetUsername} = useInput(value => value.trim().length >= 1);
  const { value:enteredPassword, isValid: passwordIsValid, hasError: passwordHasError, valueChangeHandler: passwordChangeHandler, inputBlurHandler: passwordInputBlurHandler, reset: resetPassword} = useInput(value => value.trim().length >= 6);

  let formIsValid = false;

  if(usernameIsValid && passwordIsValid) {
      formIsValid = true;
  }

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(!formIsValid) {
      return;
    }

    let url; 
    setIsLoading(true);
    if(isLogin) {
      url = 'http://localhost:5000/api/auth/login';
    } else {
      url = 'http://localhost:5000/api/users';
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        username: enteredUsername,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // const expirationTime = new Date(
        //   new Date().getTime() + +data.expiresIn * 1000
        // );
        authCtx.login(data.token); // authCtx.login(data.idToken, expirationTime.toISOString());
        resetUsername();
        resetPassword();
        navigate('/');
      })
      .catch((err) => {
        alert(err.message);
      });
      if(!isLogin) {
        const id = authCtx.authorId;
        const sendRequest = async () => {
          await fetch('http://localhost:5000/api/carts', {
              method: 'POST',
              body: JSON.stringify({
                    _id: id,
                    items: [],
                    totalQuantity: 0
              })
          });
          }
          sendRequest();
      }
  };

  const usernameClass = usernameHasError ? `${styles.control} ${styles.invalid}` : styles.control;
  const passwordClass = passwordHasError ? `${styles.control} ${styles.invalid}` : styles.control;
  


  return (
    <Card>
    <section className={styles.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
          {isLoading && (
            <div className={styles.loading}>
              <LoadingSpinner />
            </div>
          )}
          <div className={usernameClass}>
            <label htmlFor='username'>Your Username</label>
            <input 
                type='text' 
                id='username'
                onChange={usernameChangeHandler}
                onBlur={usernameInputBlurHandler}
                value={enteredUsername}
            />
            {usernameHasError && <p className={styles['error-text']}>Username must be valid</p>}
          </div>
       
          <div className={passwordClass}>
            <label htmlFor='password'>Your Password</label>
            <input 
                type='password' 
                id='password'
                onChange={passwordChangeHandler}
                onBlur={passwordInputBlurHandler}
                value={enteredPassword}
            />
            {passwordHasError && <p className={styles['error-text']}>Password must contain 6 characters</p>}
          </div>
        <div className={styles.actions}>
          {!isLoading && (
            <button disabled={!formIsValid}>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={styles.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
    </Card>
  );
};

export default AuthForm;