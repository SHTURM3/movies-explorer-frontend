import React from 'react';
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ loggedIn, children, path }){
  console.log('login', loggedIn);

  return (
      <Route path={path}>
        {loggedIn ? children : <Redirect to="/signin" />}
      </Route>
  );
}

export default ProtectedRoute;