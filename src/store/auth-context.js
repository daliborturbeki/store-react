import React, {useState, useCallback} from 'react';
import jwt_decode from "jwt-decode";

//let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    _id: '',
    username: '',
    name: '',
    surname: '',
    email: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

// const calculateRemainingTime = (experationTime) => {
//     const currentTime = new Date().getTime();
//     const adjExpirationTime = new Date(experationTime).getTime();

//     const remainingDuration = adjExpirationTime - currentTime;

//     return remainingDuration;
// };

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token')
    //const storedExpirationDate = localStorage.getItem('expirationTime');

    //const remainingtime = calculateRemainingTime(storedExpirationDate); 

    // if(remainingtime <= 3600) {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('expirationTime');
    //     return null;
    // }

    return {
        token: storedToken,
        //duration: remainingtime 
    }

}

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    if(tokenData) {
        initialToken = tokenData.token;
    }
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        //localStorage.removeItem('expirationTime');

        // if(logoutTimer) {
        //     clearTimeout(logoutTimer);
        // }
    }, []);

    const loginHandler = (token) => { // const loginHandler = (token, experationTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        //localStorage.setItem('expirationTime', experationTime);

        //const remainingtime = calculateRemainingTime(experationTime);

        //logoutTimer = setTimeout(logoutHandler, remainingtime);
    };

    // useEffect(() => {
    //     if(tokenData) {
    //         logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    //     }
    // }, [tokenData, logoutHandler]);
    
    let _id;
    let username;
    let name;
    let surname;
    let email;
    if(token) {
        var decodedToken = jwt_decode(token);
        _id = decodedToken._id;
        username = decodedToken.username;
        name = decodedToken.name;
        surname = decodedToken.surname;
        email = decodedToken.email;
    }

    const contextValue = {
        _id: _id,
        username: username,
        name: name,
        surname: surname,
        email: email,
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };
    

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
}

export default AuthContext;