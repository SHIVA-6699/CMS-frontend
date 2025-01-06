import PropTypes from "prop-types";
import React from "react";

import { Route, Routes } from "react-router-dom";
import { userRoutes, authRoutes } from "./router/router";

import VerticalLayout from "./components/VerticalLayout"
import "./assets/scss/theme.scss";
import NonAuthLayout from "./components/NonAuthLayout";
import Authmiddleware from "./middleware/Authmiddleware";

const App = () => {
  const Layout = VerticalLayout;
  return (
    <React.Fragment>
     
        <Routes>
          {authRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<NonAuthLayout>{route.component}</NonAuthLayout>}
              key={idx}
              isAuthProtected={false}
            />
          ))}

          {userRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <Authmiddleware>
                  <Layout>{route.component}</Layout>
                </Authmiddleware>
              }
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
      </Routes>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

export default App;
