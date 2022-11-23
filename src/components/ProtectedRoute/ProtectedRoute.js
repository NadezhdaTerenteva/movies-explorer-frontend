import { Redirect} from "react-router-dom"; 

const ProtectedRoute = ({ component: Component, ...props }) => {

  if (props.isLoggedIn === undefined) return "... LOADING ...";

  return props.isLoggedIn ? (
    Component
  ) : (
    <Redirect to="/"  />
  );
};

  export default ProtectedRoute;
