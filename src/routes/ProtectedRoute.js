import React from "react";

// imports for 3rd party libraries
import { Route, Redirect } from "react-router-dom";

// imports for custom hooks
import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
