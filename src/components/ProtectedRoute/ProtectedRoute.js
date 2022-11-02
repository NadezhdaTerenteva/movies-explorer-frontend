import { Redirect, Route } from "react-router-dom"; 

const ProtectedRoute = ({ component: Component, ...props }) => {
    return (
      // props.isLoggedIn ? Component : <Redirect to="/signin"/>
      <Route>
        {
          () => props.isLoggedIn ? Component : <Redirect to="/signin"/>
          
        }
      </Route>
    );
  };
  
  export default ProtectedRoute;