import React from 'react';
import { Flex } from '@chakra-ui/react';
import FindFlights from '../../Components/Cards/FindFlights';
import SearchComponent from '../../Components/Cards/SearchComponent';
import FlightCard from '../../Components/Cards/FlightCard';
import BookingCard from '../../Components/Cards/BookingCard';

const DiscoverFlights = () => {
	return (
		<Flex mt={5} flexDirection= 'column' minWidth= '100vw' >
			<Flex justifyContent= 'center' minWidth= '80%' >
				<FindFlights />
			</Flex>
			<Flex justifyContent= 'center' minWidth= '80%' >
				<SearchComponent />
			</Flex>
			<Flex justifyContent= 'center' minWidth= '80%' >
				<FlightCard />
			</Flex>
			<Flex justifyContent= 'center' minWidth= '80%' >
				<BookingCard />
			</Flex>
		</Flex>
	);
};

export default DiscoverFlights;