import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Text,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	FormControl,
	InputGroup,
	Input,
	InputLeftAddon,
	useToast,
	Select,
	FormErrorMessage,
} from '@chakra-ui/react';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';
import { getRoutes } from '../../api/route-api';
import { getAircrafts } from '../../api/aircraft-api';
import { updateScheduledFlight, addScheduledFlight } from '../../api/scheduled-flight-api';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getDateTime } from '../../utils/helpers';

const UpdateModal = ({ values, handleUpdate, forNew }) => {
	const toast = useToast();
	const [routes, setRoutes] = useState([]);
	const [aircrafts, setAircrafts] = useState([]);
	console.log(values);
	if (values.hasOwnProperty('departure') && values.hasOwnProperty('arrival')) {
		let departure = getDateTime(values.departure);
		let arrival = getDateTime(values.arrival);
		values.departureDate = new Date(departure.day).toISOString().slice(0, 10);
		values.departureTime = new Date(values.departure).toTimeString().slice(0, 8);
		values.arrivalDate = new Date(arrival.day).toISOString().slice(0, 10);
		values.arrivalTime = new Date(values.arrival).toTimeString().slice(0, 8);
	}
	console.log(values);

	const convertToTimestamp = (time, date) => {
		return `${date} ${time}:00`;
	};

	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(async () => {
		var routs = await getRoutes();
		routs = routs.data || [];
		setRoutes(routs);
		var aircrfts = await getAircrafts();
		aircrfts = aircrfts.data || [];
		setAircrafts(aircrfts);
	}, []);

	return (
		<div>
			{forNew ? (
				<Button colorScheme="teal" onClick={onOpen} m={4}>
					<AddIcon />
					<Text mx={2}>Add New Scheduled Flight</Text>
				</Button>
			) : (
				<Button bg="transparent" _hover={{ bg: 'trasparent' }} onClick={onOpen}>
					<CreateIcon />
					<Text mx={2}>Update</Text>
				</Button>
			)}
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{forNew ? 'Add New Scheduled Flight' : 'Update Scheduled Flight'}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Formik
							initialValues={{
								route: '',
								departureDate: '',
								departureTime: '',
								arrivalDate: '',
								arrivalTime: '',
								assignedAircraftId: '',
								...values,
							}}
							validationSchema={Yup.object({
								route: Yup.number()
									.oneOf(routes.map((item) => item.id))
									.required('Required'),
								departureDate: Yup.string().required('Required'),
								assignedAircraftId: Yup.number()
									.oneOf(aircrafts.map((item) => item.id))
									.required('Required'),
								departureTime: Yup.string().required('Required'),
								arrivalDate: Yup.string().required('Required'),
								arrivalTime: Yup.string().required('Required'),
							}).test('schedule-valid', 'Invalid schedule', function (value) {
								let arrival = new Date(convertToTimestamp(value.arrivalTime, value.arrivalDate));
								let departure = new Date(convertToTimestamp(value.departureTime, value.departureDate));
								if (departure >= arrival) {
									toast({
										title: 'Invalid delayed and arrival dates',
										status: 'error',
										duration: 9000,
										isClosable: true,
									})
									return this.createError({ message: '${path} nope!', path: 'my.path' });
								}
								return true;
							})}
							onSubmit={async (formValues) => {
								formValues.id = values.id;
								formValues.arrival = convertToTimestamp(formValues.arrivalTime, formValues.arrivalDate);
								formValues.departure = convertToTimestamp(
									formValues.departureTime,
									formValues.departureDate
								);

								if (forNew) {
									var response = await addScheduledFlight(formValues);
									if (response.message === 'Added successfully') {
										toast({
											title: 'New Scheduled Flight Added.',
											description: response.message,
											status: 'success',
											duration: 9000,
											isClosable: true,
										});
										var newData = {
											...formValues,
											id: response.data.id,
										};
										handleUpdate(newData);
										onClose();
									} else {
										toast({
											title: 'An error occurred.',
											description: response.message,
											status: 'error',
											duration: 9000,
											isClosable: true,
										});
									}
								} else {
									var response = await updateScheduledFlight(formValues.id, formValues);
									if (response.message === 'Updated successfully') {
										handleUpdate(formValues);
										onClose();
										toast({
											title: 'Schedule Updated.',
											description: response.message,
											status: 'success',
											duration: 9000,
											isClosable: true,
										});
									} else {
										toast({
											title: 'An error occurred.',
											description: `Unable to delete schedule ${formValues.id}.`,
											status: 'error',
											duration: 9000,
											isClosable: true,
										});
									}
								}
								console.log(formValues);
							}}
						>
							{(props) => (
								<Box p={2}>
									<FormControl isInvalid={props.errors.route && props.touched.route}>
										<InputGroup>
											<InputLeftAddon children="Route" />
											<Select
												placeholder={forNew ? 'Select Route' : ''}
												{...props.getFieldProps('route')}
											>
												{routes.map((rout) => {
													return (
														<option
															value={rout.id}
														>{`${rout.id} ${rout.origin_code} -> ${rout.destination_code}`}</option>
													);
												})}
											</Select>
										</InputGroup>

										<FormErrorMessage>{props.errors.route}</FormErrorMessage>
									</FormControl>
									<FormControl
										isInvalid={props.errors.assignedAircraftId && props.touched.assignedAircraftId}
										mt={4}
									>
										<InputGroup>
											<InputLeftAddon children="Aircraft" />
											<Select
												placeholder={forNew ? 'Select Aircraft' : ''}
												{...props.getFieldProps('assignedAircraftId')}
											>
												{aircrafts.map((aircraft) => {
													return (
														<option value={aircraft.id}>
															{`ID: ${aircraft.id}, Model: ${aircraft.model_name}`}
														</option>
													);
												})}
											</Select>
										</InputGroup>
										<FormErrorMessage>{props.errors.assignedAircraftId}</FormErrorMessage>
									</FormControl>
									<FormControl
										isInvalid={props.errors.departureDate && props.touched.departureDate}
										mt={4}
									>
										<InputGroup>
											<InputLeftAddon children="Departure date" />
											<Input
												type="date"
												name="departureDate"
												{...props.getFieldProps('departureDate')}
											/>
										</InputGroup>
										<FormErrorMessage>{props.errors.departureDate}</FormErrorMessage>
									</FormControl>
									<FormControl
										isInvalid={props.errors.departureTime && props.touched.departureTime}
										mt={4}
									>
										<InputGroup>
											<InputLeftAddon children="Departure time" />
											<Input
												type="time"
												name="departureTime"
												placeholder="Select"
												{...props.getFieldProps('departureTime')}
											/>
										</InputGroup>
										<FormErrorMessage>{props.errors.departureTime}</FormErrorMessage>
									</FormControl>
									<FormControl
										isInvalid={props.errors.arrivalDate && props.touched.arrivalDate}
										mt={4}
									>
										<InputGroup>
											<InputLeftAddon children="Arrival date" />
											<Input
												type="date"
												name="arrivalDate"
												{...props.getFieldProps('arrivalDate')}
											/>
										</InputGroup>
										<FormErrorMessage>{props.errors.arrivalDate}</FormErrorMessage>
									</FormControl>
									<FormControl
										isInvalid={props.errors.arrivalTime && props.touched.arrivalTime}
										mt={4}
									>
										<InputGroup>
											<InputLeftAddon children="Arrival time" />
											<Input
												type="time"
												name="arrivalTime"
												placeholder="Select"
												{...props.getFieldProps('arrivalTime')}
											/>
										</InputGroup>
										<FormErrorMessage>{props.errors.arrivalTime}</FormErrorMessage>
									</FormControl>
									<Box my={4}>
										<Button colorScheme="red" onClick={onClose}>
											<Text mx={2}>Cancel</Text>
										</Button>
										<Button colorScheme="teal" onClick={props.submitForm} mx={4}>
											<Text mx={2}>Save</Text>
										</Button>
									</Box>
								</Box>
							)}
						</Formik>
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default UpdateModal;
