import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { useTransition, animated } from 'react-spring';
import Footer from '../../Components/Footer/Footer';
import LandingHeader from '../../Containers/Landing/LandingHeader';
import LandingHomeContent from '../../Containers/Landing/LandingHomeContent';
import Signout from '../../Containers/Routes/Signout';
import DiscoverFlights from '../../Containers/DiscoverFlights/DiscoverFlights';
import Passenger from '../../Containers/AddPassenger/Passenger';
import SRDashBoard from '../SR/SRDashBoard';
import SeatMap from '../../Containers/SeatMap/SeatMap';
import CostSummary from '../../Containers/CostSummary/CostSummary'

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
						<CostSummary />
					</Box>
				</Route>
				<Route path={`/seatmap`}>
					<Box width="100vw">
					{location.state == undefined ? (
						<Redirect to={{ pathname: '/' }} />
					) : (
						<Box style={{ width: '100vw' }}>
							<SeatMap passengers = {location.state.passengers} flightID ={location.state.flightID}/>
						</Box>
					)}
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
