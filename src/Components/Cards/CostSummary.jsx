import {
	Box,
	Button,
	Heading,
	Text,
	VStack,
	Flex,
	Divider,
	useDisclosure,
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
import PaymentIcon from '@material-ui/icons/Payment';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import { WatchLater } from '@material-ui/icons';
import {} from '../../utils/helpers';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {formatPrice} from '../../utils/helpers';
import { useHistory } from 'react-router-dom';


const CostSummary = ({ flight, reservedSeats,addBooking, totalCost, priceAfterDiscount }) => {
	let date = new Date(flight.departure);
	let time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	let day = date.toLocaleDateString();
	let history = useHistory();

	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box w="50%" justifyContent="center" mx="auto">
			<Flex flexDirection="column" justifyContent="center" mx="auto">
				<Flex justifyContent="space-between">
					<Box pt={4} ml="5">
						<VStack spacing={-0.5}>
							<FlightTakeoffIcon style={{ fontSize: 40 }} />
							<Heading pt={0}>{flight.origin_code}</Heading>
							<Text color="gray.500">{day}</Text>
							<Text color="gray.500">{time}</Text>
						</VStack>
					</Box>

					<Box pt={4} mr="5">
						<VStack spacing={-0.5}>
							<FlightLandIcon style={{ fontSize: 40 }} />

							<Heading pt={0}>{flight.destination_code}</Heading>
							<Text color="gray.500">10.10 am</Text>
							<Text color="gray.500">June 20, 2021</Text>
						</VStack>
					</Box>
				</Flex>
				<Flex mb="3" mt="3" justifyContent="space-between">
					<Box>
						<Text fontSize="2xl">Passengers </Text>
					</Box>
					<Box>
						<Text fontSize="2xl">{reservedSeats.length}</Text>
					</Box>
				</Flex>
				<Flex mb="3"justifyContent="space-between">
					<Box>
						<Text fontSize="2xl">Flight </Text>
					</Box>
					<Box>
						<Text fontSize="2xl">{formatPrice(totalCost)} </Text>
					</Box>
				</Flex>
				<Flex mb="3" justifyContent="space-between">
					<Box>
						<Text fontSize="2xl">Discount </Text>
					</Box>
					<Box>
						<Text fontSize="2xl">{formatPrice(totalCost - priceAfterDiscount)} </Text>
					</Box>
				</Flex>
				<Flex mt="2">
					<Divider borderBottomWidth="2px" />
				</Flex>
				<Flex justifyContent="space-between" mt="3" mb="3">
					<Box>
						<Text fontSize="2xl">Total Cost</Text>
					</Box>
					<Box>
						<Text fontSize="2xl">{formatPrice(priceAfterDiscount)} </Text>
					</Box>
				</Flex>
				<Flex mb="3" justifyContent="center">
					<Button colorScheme="teal" width="60%" leftIcon={<WatchLater />} textAlign="center" onClick={() => {addBooking("hold_payment")}}>
						Hold
					</Button>
				</Flex>
				<Flex mb="3" justifyContent="center">
					<Button colorScheme="teal" width="60%" onClick={onOpen} leftIcon={<PaymentIcon />}>
						Pay Now
					</Button>
				</Flex>
				<Flex mb="3" justifyContent="center">
					<Button colorScheme="teal" width="60%" onClick={() => {history.push('/')}}>
						Cancel
					</Button>
				</Flex>
			</Flex>
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
					<ModalHeader>Payment</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Formik
							initialValues={{
								transactionKey: 0,
							}}
							validationSchema={Yup.object({
								transactionKey: Yup.number().required('Required'),
							})}
							onSubmit={async (values) => {
								console.log(values);
								await addBooking("complete_payment", values.transactionKey)
								onClose();
							}}
						>
							{(props) => (
								<Box>
									<FormControl
										isInvalid={props.errors.transactionKey && props.touched.transactionKey}
									>
										<FormLabel>Transaction Key:</FormLabel>
										<Input
											type="number"
											name="transactionKey"
											value={props.initialValues.transactionKey}
											{...props.getFieldProps('transactionKey')}
										/>
										<FormErrorMessage>{props.errors.transactionKey}</FormErrorMessage>
									</FormControl>
									<Box my={4}>
										<Button colorScheme="red" onClick={onClose}>
											<Text mx={2}>Cancel</Text>
										</Button>
										<Button colorScheme="teal" onClick={props.submitForm} mx={4}>
											<Text mx={2} >Confirm Booking</Text>
										</Button>
									</Box>
								</Box>
							)}
						</Formik>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default CostSummary;
