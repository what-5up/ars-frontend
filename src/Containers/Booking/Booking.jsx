import React, { useState, useEffect } from 'react';
import { Flex, Box, Heading, Divider, useToast } from '@chakra-ui/react';
import { useLocation, useHistory } from 'react-router-dom';
import BookingCard from '../../Components/Cards/BookingCard';
import { getBookingsByUser, deleteBooking } from '../../api/user-api';
import { getPricing } from '../../api/scheduled-flight-api';
import { useSelector } from 'react-redux';

const Booking = () => {
	let userID = useSelector((state) => state.auth.userID);

	const [bookedFlights, setBookedFlights] = useState([]);

	const toast = useToast();

	const cancelBooking = async (bookingId) => {
		let result = await deleteBooking(userID, bookingId);
		if (result.hasOwnProperty('error')) {
			toast({
				title: 'An error occurred.',
				description: result.message,
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		} else {
			toast({
				title: 'Booking Cancelled',
				description: result.message,
				status: 'success',
				duration: 9000,
				isClosable: true,
			});
            let updatedBooking = bookedFlights.filter(item => item.id != bookingId)
            setBookedFlights([...updatedBooking])
		}
        
	};
	useEffect(async () => {
		let bookings = await getBookingsByUser(userID);
		bookings = bookings.data || [];
		console.log(bookings);
		setBookedFlights(bookings);
	}, []);

	return (
		<Flex
			width="95%"
			mx="auto"
			p={5}
			flexDirection="column"
			style={{
				// boxShadow: '0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)',
				minWidth: '95%',
				borderColor: 'gray.200',
				justifyContent: 'center',
			}}
		>
			<Flex justifyContent="center">
				<Heading ml="12" mt="3" mb="5" fontWeight="400">
					BOOKINGS
				</Heading>
			</Flex>
			<Flex>
				<Divider />
			</Flex>
			<Flex flexDirection="column">
				{bookedFlights.map((item) => {
					return (
						<Flex justifyContent="center">
							<BookingCard {...item} cancelBooking={cancelBooking} />
						</Flex>
					);
				})}
			</Flex>
		</Flex>
	);
};
export default Booking;
