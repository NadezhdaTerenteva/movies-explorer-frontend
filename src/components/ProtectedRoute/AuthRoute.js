import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { Redirect } from "react-router-dom";
const AuthRoute = ({ children }) => {
  const { isLoggedIn } = useContext(CurrentUserContext);

  console.info("is logged in", isLoggedIn);
  if (!isLoggedIn) {
    return <Redirect to="/signin" replace />;
  }

  return children;
};

export { AuthRoute };
