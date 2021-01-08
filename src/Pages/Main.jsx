import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./Landing/LandingPage";

const Main = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
export default Main;
