import React, { useState } from 'react';
import { Flex, Modal, useDisclosure, ModalBody, ModalOverlay, ModalContent, ModalCloseButton } from '@chakra-ui/react';
import { connect, useSelector } from 'react-redux';
import FindFlights from '../../Components/Cards/FindFlights';
import SearchComponent from '../../Components/Cards/SearchComponent';
import FlightCard from '../../Components/Cards/FlightCard';
import BookingCard from '../../Components/Cards/BookingCard';
import GuestUser from '../../Components/Cards/GuestUser';
import { useHistory } from 'react-router-dom';
import AddedPassengers from '../../Components/Cards/AddedPassengers'

const DiscoverFlights = () => {
	let isAuthenticated = useSelector((state) => state.auth.token !== null);
	let [travellerClass, setTravellerClass] = useState('');
	let [flights, setFlights] = useState([]);
	let [passengerCount, setPassengerCount] = useState(0);
	let history = useHistory();
	const goToPassenger = (state = {},id) => {
		let flight = flights.find(item => item.id == id)
		history.push('/passenger', { ...state, flight: flight, travellerClass:travellerClass, count:passengerCount });
	};
	const handleClick = (id) => {
		console.log(id);
		console.log(isAuthenticated);
		// if (travellerClass != '') {
		// 	if (isAuthenticated) {
				goToPassenger({},id);
			// } else {
			// 	onOpen();
			// }
		// } else {
		// 	console.log("Not selected");
		// }
	};
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex mt={5} flexDirection="column" minWidth="100vw">
			<Flex justifyContent="center" minWidth="80%">
				<FindFlights setFlights={setFlights} setPassengerCount={setPassengerCount}/>
			</Flex>
			<Flex justifyContent="center" minWidth="80%">
				<SearchComponent />
			</Flex>
			<Flex justifyContent="center">
				<AddedPassengers/>
			</Flex>
			<Flex justifyContent="center" minWidth="80%" mx="auto" flexDirection="column">
				{flights.map((item, index) => {
					return (
						<FlightCard
							key={index}
							{...item}
							bookFlight={handleClick}
							setTravellerClass={setTravellerClass}
						/>
					);
				})}
			</Flex>
			<Modal
				closeOnOverlayClick={false}
				isOpen={isOpen}
				onClose={onClose}
				size="4xl"
				motionPreset="slideInBottom"
				isCentered
				closeOnEsc
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody>
						<GuestUser routeForward={goToPassenger} closeModal={onClose} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
	);
};



export default connect(null, null)(DiscoverFlights);
