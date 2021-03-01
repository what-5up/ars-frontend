import React from "react";
import { Flex } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { useTransition, animated } from "react-spring";
import CRCHeader from "../../Containers/CRC/CRCHeader";
import ScheduledFlightPage from "../../Containers/CRC/ScheduledFlightPage";
import Footer from "../../Components/Footer/Footer";

const CRCHome = () => {
  return (
    <Router>
      <div>
        <CRCHeader />
        <Content />
        <Footer />
      </div>
    </Router>
  );
};

const Content = () => {
  const location = useLocation();
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transitions.map(({ item, props, key }) => (
    <animated.div key={key} style={props}>
      <Flex mt={5} flexDirection="column" minWidth="100vw">
        <Switch location={item}>
          <Route path="/">
            <ScheduledFlightPage />
          </Route>
        </Switch>
      </Flex>
    </animated.div>
  ));
};

export default CRCHome;
