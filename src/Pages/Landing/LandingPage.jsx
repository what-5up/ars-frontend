import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { Box, useColorMode } from '@chakra-ui/react';
import { useTransition, animated } from 'react-spring';
import Footer from '../../Components/Footer/Footer';
import LandingHeader from '../../Containers/Landing/LandingHeader';
import LandingHomeContent from '../../Containers/Landing/LandingHomeContent';
import Signout from '../../Containers/Routes/Signout';
import DiscoverFlights from '../../Containers/DiscoverFlights/DiscoverFlights';
import Passenger from '../../Containers/AddPassenger/Passenger';
import SRDashBoard from "../SR/SRDashBoard";
import SeatMap from '../../Containers/SeatMap/SeatMap'

export default function LandingPage() {
	return (
		<Router>
			<div>
				<LandingHeader />
				<Content />
				<Footer />
			</div>
		</Router>
	);
}

const Content = () => {
	const location = useLocation();
	const transitions = useTransition(location, (location) => location.pathname, {
		from: { position: 'absolute', opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
	});
	const { colorMode, _ } = useColorMode();

	return transitions.map(({ item, props, key }) => (
		<animated.div key={key} style={props}>
			<Switch location={item}>
				<Route path={`/discover`}>
					<DiscoverFlights />
				</Route>
				<Route path={`/contact-us`}>
					<Box width="100vw">
						<SRDashBoard />
					</Box>
				</Route>
				<Route path={`/seatmap`}>
					<Box width="100vw">
						<SeatMap
							class="Economy"
							price={75000}
							passengers={[
								{
									id: 1,
									first_name: "Kane",
									last_name: "Williamson"
								},
								{
									id: 3,
									first_name: "Dimuth",
									last_name: "Karunaratne"
								},
								{
									id: 10,
									first_name: "Steve",
									last_name: "Smith"
								}
							]}
							flightID={10}
							colorMode={colorMode} />
					</Box>
				</Route>
				<Route path={`/passenger`}>
					{/* {location.state == undefined ? (
						<Redirect to={{ pathname: '/' }} />
					) : ( */}
					<Box style={{ width: '100vw' }}>
						<Passenger />
					</Box>
					{/* )} */}
				</Route>
				<Route path="/signout" component={Signout} />
				<Route path="/">
					<LandingHomeContent />
				</Route>
			</Switch>
		</animated.div>
	));
};
