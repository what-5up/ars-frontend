import React, { useState } from 'react';
import {
	Flex,
	Modal,
	useDisclosure,
	ModalBody,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	Button,
	useToast,
} from '@chakra-ui/react';
import { connect, useSelector } from 'react-redux';
import FindFlights from '../../Components/Cards/FindFlights';
import SearchComponent from '../../Components/Cards/SearchComponent';
import FlightCard from '../../Components/Cards/FlightCard';
import GuestUser from '../../Components/Cards/GuestUser';
import { useHistory } from 'react-router-dom';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const DiscoverFlights = () => {
	let isAuthenticated = useSelector((state) => state.auth.userAuthenticated);

	let [travellerClass, setTravellerClass] = useState('');
	let [flights, setFlights] = useState([]);
	let [passengerCount, setPassengerCount] = useState(0);
	let [flightID, setFlightID] = useState(-1)
	const { onClose, isOpen, onOpen } = useDisclosure({ id: 'opensas' });
	const toast = useToast();

	let history = useHistory();

	const goToPassenger = (state = {}, id =-1) => {
		if (state.hasOwnProperty('isGuest') && state.isGuest) {
			id = flightID
			toast({
				title: 'Guest user added.',
				status: 'success',
				duration: 2000,
				isClosable: false,
			});
		}
		let flight = flights.find((item) => item.id === id);
		history.push('/passenger', {
			isGuest: false,
			...state,
			flight: flight,
			class: travellerClass,
			count: passengerCount,
		});
	};

	const handleClick = (id) => {
		setFlightID(id);
		if (travellerClass != '') {
			if (isAuthenticated) {
				goToPassenger({},id);
			} else {
				onOpen();
			}
		}
	};

	return (
		<Flex mt={5} flexDirection="column" minWidth="100vw">
			<Flex justifyContent="center" minWidth="80%">
				<FindFlights
					setFlights={setFlights}
					setPassengerCount={setPassengerCount}
					setTravellerClass={setTravellerClass}
				/>
			</Flex>
			<Flex justifyContent="center" minWidth="80%">
				<SearchComponent />
			</Flex>
			<Flex justifyContent="center" minWidth="80%" mx="auto" flexDirection="column">
				{flights.length != 0 &&
					flights.map((item, index) => {
						return (
							<FlightCard
								key={index}
								{...item}
								setFlights={setFlights}
								bookFlight={handleClick}
								setTravellerClass={setTravellerClass}
							/>
						);
					})}
			</Flex>
			<Modal
				id="opensas"
				isOpen={isOpen}
				onClose={onClose}
				closeOnOverlayClick={false}
				size="4xl"
				motionPreset="slideInBottom"
				isCentered
				closeOnEsc
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody>
						<GuestUser routeForward={goToPassenger} closeGuest={onClose} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default withErrorHandler(DiscoverFlights);
