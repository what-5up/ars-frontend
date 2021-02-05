import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import Footer from '../../Components/Footer/Footer';
import LandingHeader from '../../Containers/Landing/LandingHeader';
import LandingHomeContent from '../../Containers/Landing/LandingHomeContent';
import LandingRegisterContent from '../../Containers/Landing/LandingRegisterContent';
import DiscoverFlights from '../../Containers/DiscoverFlights/DiscoverFlights';
import { Box, Flex, Input, Center, Button, Text, FormLabel, UnorderedList, ListItem } from '@chakra-ui/react';

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
					<DiscoverFlights/>
				</Route>
				<Route path={`/contact-us`}>
					<LandingHomeContent />
				</Route>
				<Route path={`/register`}>
					<LandingRegisterContent />
				</Route>
				<Route path="/">
					<LandingHomeContent />
				</Route>
			</Switch>
		</animated.div>
	));
};
