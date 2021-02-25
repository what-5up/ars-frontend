import React from 'react';
import { Flex } from '@chakra-ui/react';
import BookingsByPassengerTypeReport from "../../Containers/Reports/BookingsByPassengerTypeReport";
import PassengersForDestinationReport from "../../Containers/Reports/PassengersForDestinationReport";
import PassengersInFlightReport from "../../Containers/Reports/PassengersInFlightReport";
import RevenueReport from "../../Containers/Reports/RevenueReport";
import FlightDetailsReport from "../../Containers/Reports/FlightDetailsReport";

const Dashboard = () => {
	return (
		<Flex mt={5} flexDirection= 'column' minWidth= '100vw' >
			<Flex justifyContent= 'center' minWidth= '80%' >
				<BookingsByPassengerTypeReport />
			</Flex>
			<Flex justifyContent= 'center' minWidth= '80%' >
				<PassengersForDestinationReport />
			</Flex>
			<Flex justifyContent= 'center' minWidth= '80%' >
				<PassengersInFlightReport />
			</Flex>
			<Flex justifyContent= 'center' minWidth= '80%' >
				<RevenueReport />
			</Flex>
			<Flex justifyContent= 'center' minWidth= '80%' >
				<FlightDetailsReport />
			</Flex>
		</Flex>
	);
};

export default Dashboard;