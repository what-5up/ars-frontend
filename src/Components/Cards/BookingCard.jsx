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
  Modal,
	ModalOverlay,
	ModalCloseButton,
	ModalBody,
	ModalContent,
	FormControl,
	FormLabel,
	FormErrorMessage,
	ModalHeader,
	Input,
} from '@chakra-ui/react';
import Fab from '@material-ui/core/Fab';
import PaymentIcon from '@material-ui/icons/Payment';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { formatPrice, getDateTime } from '../../utils/helpers';
import { Formik } from 'formik';
import * as Yup from 'yup';

const BookingCard = ({ id, departure, arrival, origin_code, destination_code, final_amount, state, cancelBooking }) => {
	departure = getDateTime(departure);
	arrival = getDateTime(arrival);
	return (
		<Flex boxShadow="xl" borderRadius="10px" m="10px" mt="5" p="8px" justifyContent="center">
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
					<Box w={{ base: '80%', sm: '60%', md: '50%' }} mb={{ base: 12, md: 0 }}>
						<Image src={'/images/flight-icon.png'} size="100%" rounded="1rem" alt="flight image" />
					</Box>
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
							<Badge ml="1" fontSize="0.8em" colorScheme={state === 'complete' ? 'red' : 'green'}>
								{state === 'complete' ? 'Paid' : 'Not Paid'}
							</Badge>
							<Heading pt={0}>{formatPrice(final_amount)}</Heading>
							<Text color="gray.500">3 Passengers</Text>
							<Text color="gray.500">Economy Class</Text>
						</VStack>
					</Center>
				</GridItem>
				<GridItem rowSpan={1} colSpan={20}>
					<Center mt={3}>
						<HStack spacing={8}>
							<CancelBooking cancelBooking={() => cancelBooking(id)} />
							<Button bg="transparent" _hover={{ bg: 'trasparent' }} >
								<Fab color="primary" variant="extended" size="large">
									<PaymentIcon />
									<Text mx={2}>Pay For Booking</Text>
								</Fab>
							</Button>
						</HStack>
					</Center>
				</GridItem>
			</Grid>
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

// const PaymentCard = () => {
// 	const { isOpen, onOpen, onClose } = useDisclosure();

// 	return (
// 		<Modal
// 			isCentered
// 			closeOnOverlayClick={false}
// 			isOpen={isOpen}
// 			onClose={onClose}
// 			size="md"
// 			motionPreset="slideInBottom"
// 			isCentered
// 			closeOnEsc
// 		>
// 			<ModalOverlay />
// 			<ModalContent>
// 				<ModalHeader>Payment</ModalHeader>
// 				<ModalCloseButton />
// 				<ModalBody>
// 					<Formik
// 						initialValues={{
// 							transactionKey: 0,
// 						}}
// 						validationSchema={Yup.object({
// 							transactionKey: Yup.number().required('Required'),
// 						})}
// 						onSubmit={async (values) => {
// 							console.log(values);
// 							await addBooking('complete_payment', values.transactionKey);
// 							onClose();
// 						}}
// 					>
// 						{(props) => (
// 							<Box>
// 								<FormControl isInvalid={props.errors.transactionKey && props.touched.transactionKey}>
// 									<FormLabel>Transaction Key:</FormLabel>
// 									<Input
// 										type="number"
// 										name="transactionKey"
// 										value={props.initialValues.transactionKey}
// 										{...props.getFieldProps('transactionKey')}
// 									/>
// 									<FormErrorMessage>{props.errors.transactionKey}</FormErrorMessage>
// 								</FormControl>
// 								<Box my={4}>
// 									<Button colorScheme="red" onClick={onClose}>
// 										<Text mx={2}>Cancel</Text>
// 									</Button>
// 									<Button colorScheme="teal" onClick={props.submitForm} mx={4}>
// 										<Text mx={2}>Confirm Booking</Text>
// 									</Button>
// 								</Box>
// 							</Box>
// 						)}
// 					</Formik>
// 				</ModalBody>
// 			</ModalContent>
// 		</Modal>
// 	);
// };

export default BookingCard;
