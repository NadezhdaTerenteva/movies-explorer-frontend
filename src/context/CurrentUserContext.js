import { createContext, useEffect, useState, useMemo } from 'react'; 
import { mainApi } from '../utils/MainApi';
const CurrentUserContext = createContext();


const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [reqIsProcessing, setReqIsProcessing] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(true);
    useEffect(()=>{
       
        mainApi
            .getUserInfo()
            .then((res) => {
            setCurrentUser(res);
            setIsLoggedIn(true);
            })
            .catch((err) => {
                resetUser(); 
            }).finally(()=>{
                setLoadingInitial(false);
            });


    },[]);

    const resetUser = () => {
        setCurrentUser({});
        setIsLoggedIn(false);
        localStorage.clear();
    };
   
const value = useMemo(()=>({
    currentUser: currentUser,
    setCurrentUser: setCurrentUser,
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    reqIsProcessing,
    setReqIsProcessing,
    resetUser: resetUser
}), [isLoggedIn, currentUser, reqIsProcessing])

    return (
        <CurrentUserContext.Provider value ={value}>
            { !loadingInitial && children }
        </CurrentUserContext.Provider>
    );
}

export { UserProvider, CurrentUserContext}