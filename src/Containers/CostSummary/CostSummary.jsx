import React, { useState, useEffect } from 'react';
import {
	Flex,
	Box,
	Heading,
	Divider,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import CostSummary from '../../Components/Cards/CostSummary';
import { useSelector } from 'react-redux';
import {addBookingByUser} from '../../api/user-api'

const Cost = () => {
	let userID = useSelector((state) => state.auth.userID);

	const location = useLocation();
	console.log(location);
	const flight = location.state.flight;
	
	const [reservedSeats, setReservedSeats] = useState([]);

	const addBooking = async (scenario, transactionKey =null) => {
		let payload = {
			scenario: scenario,
			reservedSeats: reservedSeats,
			scheduled_flight_id:location.state.flight.id,
			user_id:userID
		}
		if(transactionKey !=null){
			payload.transactionKey = transactionKey
		}
		console.log(payload);
		await addBookingByUser(userID,payload)
	}
	useEffect(() => {
		let tempReserved = location.state.passengers.map((passenger) => {
			let obj = {};
			obj['seat_id'] = passenger.seatID;
			obj['passenger'] = passenger;
			obj.passenger.id = passenger.existing ? passenger.currentID: null
			return obj;
		});
		console.log(tempReserved);
		setReservedSeats(tempReserved);
	}, []);
	return (
		<Box
			width="95%"
			mx="auto"
			p={5}
			style={{
				boxShadow: '0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)',
				minWidth: '80%',
				borderColor: 'gray.200',
			}}
		>
			<Heading ml="12" mt="3" mb="5" fontWeight="400" textAlign="center">
				COST SUMMARY
			</Heading>
			<Divider />
			<Flex mt="5" width="100%">
				<CostSummary flight={flight} reservedSeats={reservedSeats} addBooking={addBooking} totalCost={location.state.totalCost}/>
			</Flex>
		</Box>
	);
};
export default Cost;
