import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./Landing/LandingPage";

const Main = () => {
  return (
      <Switch>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
  );
};
export default Main;
