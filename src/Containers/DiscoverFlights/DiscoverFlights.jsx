import React from 'react';
import { Flex } from '@chakra-ui/react';
import FindFlights from '../../Components/Cards/FindFlights';
import SearchComponent from '../../Components/Cards/SearchComponent';
import FlightCard from '../../Components/Cards/FlightCard';
const DiscoverFlights = () => {
	return (
		<Flex mt={5} style={{ flexDirection: 'column', minWidth: '100vw' }}>
			<Flex style={{ justifyContent: 'center', minWidth: '80%' }}>
				<FindFlights />
			</Flex>
			<Flex style={{ justifyContent: 'center', minWidth: '80%' }}>
				<SearchComponent />
			</Flex>
			<Flex style={{ justifyContent: 'center', minWidth: '80%' }}>
				<FlightCard />
			</Flex>
		</Flex>
	);
};

export default DiscoverFlights;