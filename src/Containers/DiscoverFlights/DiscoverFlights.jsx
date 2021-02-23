import React, { useState } from 'react';
import { Flex, Modal, useDisclosure, ModalBody, ModalOverlay, ModalContent, ModalCloseButton } from '@chakra-ui/react';
import { connect, useSelector } from 'react-redux';
import FindFlights from '../../Components/Cards/FindFlights';
import SearchComponent from '../../Components/Cards/SearchComponent';
import FlightCard from '../../Components/Cards/FlightCard';
import BookingCard from '../../Components/Cards/BookingCard';
import GuestUser from '../../Components/Cards/GuestUser';
import { useHistory } from "react-router-dom";

const DiscoverFlights = () => {
	let isAuthenticated = useSelector((state) => state.auth.token !== null);
	let [flightID, setFlightID] = useState(-1);
	let history = useHistory();
	const goToPassenger = (state ={}) => {
		history.push('/passenger',{...state,flightID:flightID})
	}
	const handleClick = (id) => {
		setFlightID(id)
		if(isAuthenticated){
			goToPassenger();
		}
		else{
			onOpen();
		}
	}
	let [flights, setFlights] = useState([]);
	let [guestUser, setGuestUser] = useState(true);
	const { isOpen, onOpen, onClose } = useDisclosure();

	console.log(flights);
	return (
		<Flex mt={5} flexDirection="column" minWidth="100vw">
			<Flex justifyContent="center" minWidth="80%">
				<FindFlights setFlights={setFlights} />
			</Flex>
			<Flex justifyContent="center" minWidth="80%">
				<SearchComponent />
			</Flex>
			<Flex justifyContent="center" minWidth="80%" mx="auto" flexDirection="column">
				{flights.map((item,index) => {
					return <FlightCard key = {index} {...item} bookFlight = {handleClick}/>;
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
						<GuestUser routeForward = {goToPassenger}  closeModal={onClose}/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default DiscoverFlights;
