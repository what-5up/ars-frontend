import React, { useEffect, useCallback } from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./Landing/LandingPage";
import { connect, useDispatch } from 'react-redux';
import * as actions from '../store/actions/index';

const Main = () => {
  const dispatch = useDispatch()
  const autoSignup = useCallback(
    () => dispatch( actions.authCheckState() ),
    [dispatch]
  )
  useEffect(() => autoSignup());

  return (
      <Switch>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
  );
};
export default connect(null, null) (Main);
