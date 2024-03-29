import React, { useState, useEffect } from 'react';
import { Flex, Box, Heading, Divider, useToast } from '@chakra-ui/react';
import { useLocation, useHistory } from 'react-router-dom';
import CostSummary from '../../Components/Cards/CostSummary';
import { useSelector } from 'react-redux';
import { addBookingByUser } from '../../api/user-api';
import { getPricing } from '../../api/scheduled-flight-api';

const Cost = () => {
	let userID = useSelector((state) => state.auth.userID);

	const location = useLocation();
	let locationState = location.state;
	const flight = location.state.flight;
	const history = useHistory();

	const [reservedSeats, setReservedSeats] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [discount, setDiscount] = useState(0);
	const toast = useToast();

	const addBooking = async (scenario, transactionKey = null) => {
		let payload = {
			scenario: scenario,
			reservedSeats: reservedSeats,
			scheduled_flight_id: location.state.flight.id
		};
		if (transactionKey != null) {
			payload.transactionKey = transactionKey;
		}
		console.log(JSON.stringify(payload));
		let result = await addBookingByUser(userID, payload);
		if (!result.hasOwnProperty('error')) {
			history.push('/');
			toast({
				title: 'Booking Placed.',
				description: result.message,
				status: 'success',
				duration: 2000,
				isClosable: false,
			});
		} else {
			toast({
				title: 'An error occurred.',
				description: result.message,
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		}
	};

	useEffect(async () => {
		let tempReserved = locationState.passengers.map((passenger) => {
			let obj = {};
			obj['seat_id'] = passenger.seatID;
			obj['passenger'] = passenger;
			obj.passenger.id = passenger.existing ? passenger.currentID : null;
			return obj;
		});

		let reserved_seats = locationState.passengers.map((passenger) => {
			return { seat_id: passenger.seatID };
		});

		let result = await getPricing(flight.id, { reserved_seats: reserved_seats });
		if (!result.hasOwnProperty('error')) {
			setDiscount(result.data.price_after_discount);
			setTotalPrice(result.data.total_price);
		}
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
				<CostSummary
					flight={flight}
					reservedSeats={reservedSeats}
					addBooking={addBooking}
					totalCost={totalPrice}
					priceAfterDiscount={discount}
				/>
			</Flex>
		</Box>
	);
};
export default Cost;
