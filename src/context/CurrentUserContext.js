import { createContext, useState } from 'react'; 

const CurrentUserContext = createContext();

const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [reqIsProcessing, setReqIsProcessing] = useState(false);
    const value = {
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        reqIsProcessing,
        setReqIsProcessing,
        resetUser: () => {
            setCurrentUser({});
            setIsLoggedIn(false);
            localStorage.clear();
        }
    }

    return (
        <CurrentUserContext.Provider value ={value}>
            { children }
        </CurrentUserContext.Provider>
    );
}

export { UserProvider, CurrentUserContext}