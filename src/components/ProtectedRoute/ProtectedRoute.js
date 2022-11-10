import { useLocation, NavLink} from "react-router-dom"; 

const ProtectedRoute = ({ component: Component, ...props }) => {
  const location = useLocation();

  if (props.isLoggedIn === undefined) return "... LOADING ...";

  return props.isLoggedIn ? (
    Component
  ) : (
    <NavLink to="/" replace state={{ from: location }} />
  );
};

// Предыдущий вариант 

    // return (
    //   <Route>
    //     {
    //       () => props.isLoggedIn ? Component : <Redirect to="/signin"/>
          
    //     }
    //   </Route>
    // );
  // };

  export default ProtectedRoute;