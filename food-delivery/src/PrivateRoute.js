import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={() => {
          if (localStorage.getItem('user')) {
            // render component
            return <Component />;
          } else {
            // route to Home
            return <Redirect to="/" />;
          }
        }}
      />
    );
};

export default PrivateRoute;
