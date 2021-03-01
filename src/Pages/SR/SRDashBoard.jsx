import React from "react";
import { Flex} from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { useTransition, animated } from "react-spring";
import SRHeader from "../../Containers/SR/SRHeader";
import AccountTypesPage from "../../Containers/SR/AccountTypesPage";
import FrontPage from "../../Containers/SR/FrontPage";
import TicketPrices from "../../Containers/SR/TicketPrices";
import Footer from "../../Components/Footer/Footer";

const SRDashBoard = () => {
  return (
    <Router>
      <div>
        <SRHeader />
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
          <Route path="/prices">
            <Flex justifyContent="center" minWidth="80%">
              <TicketPrices />
            </Flex>
          </Route>
          <Route path="/account-types">
            <Flex justifyContent="center" minWidth="80%">
              <AccountTypesPage />
            </Flex>
          </Route>
          <Route path="/">
            <FrontPage />
          </Route>
        </Switch>
      </Flex>
    </animated.div>
  ));
};

export default SRDashBoard;
