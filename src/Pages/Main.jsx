import React, { useEffect, useCallback } from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./Landing/LandingPage";
import SRDashBoard from './SR/SRDashBoard';
import Dashboard from './Management/Dashboard';
import { connect, useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/actions/index';
import { DesignationEnum } from '../utils/constants';
import AdminHome from "./Admin/AdminHome";
import CRCHome from "./CRC/CRCHome";

const Main = () => {
  const dispatch = useDispatch()
  const autoSignup = useCallback(
    () => dispatch(actions.authCheckState()),
    [dispatch]
  )
  useEffect(() => autoSignup());
  const accType = useSelector(state => state.auth.accType);

  const MainPage = ({accType}) => {
    console.log(accType);
    switch (accType) {
      case DesignationEnum.MANAGEMENT:
        return <Dashboard />
      case DesignationEnum.SALES_REPRESENTATIVE:
        return <SRDashBoard />
      case DesignationEnum.ADMIN:
        return <AdminHome />
      case DesignationEnum.CREW_SCHEDULE_COORDINATOR:
        return <CRCHome />
      default:
        return <LandingPage />
    }
  }

  return (
    <Switch>
      <Route path="/">
        <MainPage accType={accType}/>
      </Route>
    </Switch>
  );
};
export default connect(null, null)(Main);
