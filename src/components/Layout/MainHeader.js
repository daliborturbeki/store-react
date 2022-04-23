import React, { useContext } from "react";
import CartButton from '../Cart/CartButton';
import styles from './MainHeader.module.css';
import { Link } from "react-router-dom";
import AuthContext from '../../store/auth-context';
import { SearchOutlined } from "@mui/icons-material";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const MainHeader = (props) => {
  const authCtx = useContext(AuthContext);
  
  const handleAuthenticaton = () => {
    if(authCtx.isLoggedIn) {
      authCtx.logout();
    }
  }
  let signOutHeaderOption = <div><LogoutOutlinedIcon /></div>;
  let signInHeaderOption = <div><LoginOutlinedIcon /></div>;
  let user = authCtx.username;

  
  return (

    <div className={styles.header}>
      <Link to="/">
        <div className="header__logo">
        <h1>Smartphones</h1>
        </div>
      </Link>

      <div className={styles.header__search}>
        <input className={styles.header__searchInput} type="text" />
        <SearchOutlined className={styles.header__searchIcon} />
      </div>

      <div className={styles.header__nav}>

        <Link to='/orders'>
          <div className={styles.header__option}>
          <span className={styles.header__optionLineTwo}>Orders</span>
            <LocalShippingOutlinedIcon />
          </div>
        </Link>
        

        <Link to={user ? '/profile' : '/auth'}>
        <div className={styles.header__option}>
          <span className={styles.header__optionLineTwo}>{user ? user : 'Guest'}</span>
          <AccountCircleOutlinedIcon />
        </div>
        </Link>

        <div className={styles.header_basketOption}>
          <CartButton />
        </div>

        <Link to={!user && '/auth'}>
          <div onClick={handleAuthenticaton} className={styles.header__option}>
            <span className={styles.header__optionLineTwo}>{user ? 'Sign out' : 'Sign in'}</span>
            <span className={styles.header__optionLineOne}>{user ? signOutHeaderOption : signInHeaderOption}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainHeader;


/*
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <Link to="/">
            <img
              alt="amazon"
              className={classes.header__logo}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/ZDF_logo%21_Logo_2021.svg/640px-ZDF_logo%21_Logo_2021.svg.png"
            />
          </Link>
          <Link to={!user && '/auth'}>
            <div onClick={handleAuthenticaton} className="header__option">
              <span className="header__optionLineOne">Hello {!user ? 'Guest' : user}</span>
              <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
            </div>
          </Link>
            <CartButton />
        </ul>
      </nav>
    </header>

*/