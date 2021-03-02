import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { useTransition, animated } from "react-spring";
import BookingsByPassengerTypeReport from "../../Containers/Reports/BookingsByPassengerTypeReport";
import PassengersForDestinationReport from "../../Containers/Reports/PassengersForDestinationReport";
import PassengersInFlightReport from "../../Containers/Reports/PassengersInFlightReport";
import RevenueReport from "../../Containers/Reports/RevenueReport";
import FlightDetailsReport from "../../Containers/Reports/FlightDetailsReport";
import ManagementHeader from "../../Containers/Management/ManagementHeader";
import Footer from "../../Components/Footer/Footer";

const Dashboard = () => {
  return (
    <Router>
      <div>
        <ManagementHeader />
        <Buttons />
        <Content />
        <Footer />
      </div>
    </Router>
  );
};

const Buttons = () => {
  return (
    <div>
      <Link to={"/BookingsByPassengerTypeReport"}>
        <Button borderRadius="8px" py="4" px="4" lineHeight="1" size="md">
          Bookings By Passenger Type Report
        </Button>
      </Link>
      <Link to={"/PassengersForDestinationReport"}>
        <Button borderRadius="8px" py="4" px="4" lineHeight="1" size="md">
          PassengersForDestinationReport
        </Button>
      </Link>
      <Link to={"/PassengersInFlightReport"}>
        <Button borderRadius="8px" py="4" px="4" lineHeight="1" size="md">
          PassengersInFlightReport
        </Button>
      </Link>
      <Link to={"/RevenueReport"}>
        <Button borderRadius="8px" py="4" px="4" lineHeight="1" size="md">
          RevenueReport
        </Button>
      </Link>
      <Link to={"/FlightDetailsReport"}>
        <Button borderRadius="8px" py="4" px="4" lineHeight="1" size="md">
          FlightDetailsReport
        </Button>
      </Link>
    </div>
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
        <Flex justifyContent="center" minWidth="80%">
          <Switch location={item}>
            <Route path="/BookingsByPassengerTypeReport">
              <BookingsByPassengerTypeReport />
            </Route>
            <Route path="/PassengersForDestinationReport">
              <PassengersForDestinationReport />
            </Route>
            <Route path="/PassengersInFlightReport">
              <PassengersInFlightReport />
            </Route>
            <Route path="/RevenueReport">
              <RevenueReport />
            </Route>
            <Route path="/FlightDetailsReport">
              <FlightDetailsReport />
            </Route>
            <Route path="/">
              <BookingsByPassengerTypeReport />
            </Route>
          </Switch>
        </Flex>
      </Flex>
    </animated.div>
  ));
};

export default Dashboard;
