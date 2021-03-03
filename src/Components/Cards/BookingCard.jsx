import { useState, useRef } from 'react';
import {
	Box,
	Button,
	Center,
	Grid,
	Flex,
	GridItem,
	Heading,
	Image,
	Text,
	VStack,
	HStack,
	Badge,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Divider,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	useDisclosure
} from '@chakra-ui/react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { formatPrice, getDateTime } from '../../utils/helpers';
import PaymentCard from './PaymentCard';
import Fab from '@material-ui/core/Fab';
import airplane from '../../assets/img/airplane.png';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {getBookingByUser} from '../../api/user-api';
import { useSelector } from 'react-redux';
import BookingDetails from './BookingDetails';

const BookingCard = ({
	id,
	departure,
	arrival,
	origin_code,
	destination_code,
	final_amount,
	state,
	cancelBooking,
	addPayment,
}) => {
    let userID = useSelector((state) => state.auth.userID);
	const [booking, setBooking] = useState({})
	const getBookingDetails = async () => {
		let result = await getBookingByUser(userID,id);
		if(!result.hasOwnProperty('error')){

			result = result.data || []
			if(result.length > 0){
				result = {passengers: result, class:result[0].class}
			}
			setBooking(result)
			onOpen();
		}
	}
	const { onOpen, isOpen, onClose } = useDisclosure();
	departure = getDateTime(departure);
	arrival = getDateTime(arrival);

	return (
		<Flex
			boxShadow="xl"
			borderRadius="10px"
			m="10px"
			mt="5"
			p="8px"
			justifyContent="center"
			style={{
				cursor:"pointer",
				boxShadow: '0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)',
				minWidth: '80%',
			}}
			onClick={getBookingDetails}
		>
			<Grid h="200px" w="80vw" templateRows="repeat(3, 1fr)" templateColumns="repeat(20, 1fr)" gap={2} mx="auto">
				<GridItem rowSpan={2} colSpan={4}>
					<Box pt={4}>
						<VStack spacing={-0.5}>
							<Heading pt={0}>{origin_code}</Heading>
							<Text color="gray.500">{departure.time}</Text>
							<Text color="gray.500">{departure.day}</Text>
						</VStack>
					</Box>
				</GridItem>
				<GridItem rowSpan={2} colSpan={7}>
					<Flex>
						<Flex alignItems="center" mb={{ base: 12, md: 0 }}>
							<MyLocationIcon />
							<Divider
								width="148px"
								backgroundColor="black"
								opacity="1"
								borderBottomWidth="2px"
								borderColor="black"
							/>
						</Flex>
						<Flex
							justifyContent="center"
							alignItems="center"
							w={{ base: '80%', sm: '60%', md: '50%' }}
							mx="auto"
							mb={{ base: 12, md: 0 }}
						>
							<Image src={airplane} height="70px" mt="3" rounded="1rem" alt="flight image" />
						</Flex>
						<Flex alignItems="center" mb={{ base: 12, md: 0 }}>
							<Divider
								width="148px"
								backgroundColor="black"
								opacity="1"
								borderBottomWidth="2px"
								borderColor="black"
							/>
							<LocationOnIcon />
						</Flex>
					</Flex>
				</GridItem>
				<GridItem rowSpan={2} colSpan={4}>
					<Box pt={4}>
						<VStack spacing={-0.5}>
							<Heading pt={0}>{destination_code}</Heading>
							<Text color="gray.500">{arrival.time}</Text>
							<Text color="gray.500">{arrival.day}</Text>
						</VStack>
					</Box>
				</GridItem>
				<GridItem rowSpan={2} colSpan={5}>
					<Center pt={4}>
						<VStack spacing={-0.5}>
							<Badge ml="1" fontSize="0.8em" colorScheme={state != 'completed' ? 'red' : 'green'}>
								{state != 'completed' ? 'Not Paid' : 'Paid'}
							</Badge>
							<Heading pt={0}>{formatPrice(final_amount)}</Heading>
							<Text color="gray.500">3 Passengers</Text>
							<Text color="gray.500">Economy Class</Text>
						</VStack>
					</Center>
				</GridItem>
				<GridItem rowSpan={1} colSpan={20} mb="4">
					<Center mt={3}>
						<HStack spacing={8}>
							{state === 'booked' && <CancelBooking cancelBooking={() => cancelBooking(id)} />}
							{state === 'booked' && (
								<PaymentCard
									addPayment={(transactionKey) => {
										addPayment(id, transactionKey);
									}}
								/>
							)}
						</HStack>
					</Center>
				</GridItem>
			</Grid>
			<Modal
				isCentered
				closeOnOverlayClick={false}
				isOpen={isOpen}
				onClose={onClose}
				size="md"
				motionPreset="slideInBottom"
				isCentered
				closeOnEsc
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Passengers</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<BookingDetails booking = {booking}/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

const CancelBooking = ({ cancelBooking }) => {
	const [isOpen, setIsOpen] = useState(false);
	const onClose = () => setIsOpen(false);
	const cancelRef = useRef();
	return (
		<>
			<Button bg="transparent" onClick={() => setIsOpen(true)} _hover={{ bg: 'trasparent' }}>
				<Fab color="secondary" variant="extended">
					<DeleteForeverIcon />
					<Text mx={2}>Cancel Booking</Text>
				</Fab>
			</Button>
			<AlertDialog
				motionPreset="slideInBottom"
				leastDestructiveRef={cancelRef}
				onClose={onClose}
				isOpen={isOpen}
				isCentered
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Cancel Booking
						</AlertDialogHeader>

						<AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

						<AlertDialogFooter justifyContent="center">
							<Button
								colorScheme="red"
								onClick={() => {
									onClose();
									cancelBooking();
								}}
								ml={3}
								mr={8}
								px={10}
							>
								Yes
							</Button>
							<Button ref={cancelRef} colorScheme="teal" onClick={onClose} mr={8} px={10}>
								No
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};

export default BookingCard;
