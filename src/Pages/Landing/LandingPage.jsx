import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { Box, Flex, Input, InputGroup, InputLeftElement, FormLabel, Button, Heading, Form } from '@chakra-ui/react';
import { useTransition, animated } from 'react-spring';
import Footer from '../../Components/Footer/Footer';
import LandingHeader from '../../Containers/Landing/LandingHeader';
import LandingHomeContent from '../../Containers/Landing/LandingHomeContent';
import Signout from '../../Containers/Routes/Signout';
import DiscoverFlights from '../../Containers/DiscoverFlights/DiscoverFlights';
import Passenger from '../../Containers/AddPassenger/Passenger';
import GuestUser from '../../Components/Cards/GuestUser';
import Dashboard from "../Management/Dashboard";
import SeatMap from  '../../Components/SeatMap/SeatMap'

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

	return transitions.map(({ item, props, key }) => (
		<animated.div key={key} style={props}>
			<Switch location={item}>
				<Route path={`/discover`}>
					<DiscoverFlights />
				</Route>
				<Route path={`/contact-us`}>
					<Box width="100vw">
						<Dashboard />
					</Box>
				</Route>
				<Route path={`/seatmap`}>
					<Box width="100vw">
						<SeatMap />
					</Box>
				</Route>
				<Route path={`/passenger`}>
					{location.state == undefined ? (
						<Redirect to={{ pathname: '/' }} />
					) : (
						<Box style={{ width: '100vw' }}>
							<Passenger />
						</Box>
					)}
				</Route>
				<Route path="/signout" component={Signout} />
				<Route path="/">
					<LandingHomeContent />
				</Route>
			</Switch>
		</animated.div>
	));
};
