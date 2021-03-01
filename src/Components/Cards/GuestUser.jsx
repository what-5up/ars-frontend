import React, { useState, useEffect, useCallback } from 'react';
import {
	Box,
	Flex,
	Input,
	FormLabel,
	Button,
	Heading,
	FormControl,
	FormErrorMessage,
	Divider,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalCloseButton,
	ModalBody,
	ModalContent,
} from '@chakra-ui/react';
import Select from 'react-select';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addGuest } from '../../api/guest-api';
import { getTitles } from '../../api/title-api';
import { ArrowForwardIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import LoginArea from '../Forms/LoginArea';
import { connect, useSelector, useDispatch } from 'react-redux';
import {gender} from '../../utils/constants';
import * as actions from '../../store/actions/index';


const GuestUser = ({ routeForward, closeModal }) => {
	const [title, setTitle] = useState([]);
	const signup = useDisclosure();
	const dispatch = useDispatch();
	const userID = useSelector((state) => state.auth.userID);
	const onAuth = useCallback(
		(values) => dispatch(actions.guestAuth(values)),
		[dispatch]
	  )
	

	useEffect(async () => {
		let titles = await getTitles();
		titles = titles.data;
		titles = titles.map((title) => {
			return { value: title.id, label: title.title_name };
		});
		setTitle(titles);
	}, []);
	return (
		<Formik
			initialValues={{
				firstName: '',
				lastName: '',
				title: '',
				gender: '',
				email: '',
			}}
			validationSchema={Yup.object({
				firstName: Yup.string().required('Required'),
				lastName: Yup.string().required('Required'),
				title: Yup.string().required('Required'),
				email: Yup.string().email().required('Required'),
				gender: Yup.string()
					.oneOf(gender.map((item) => item.value))
					.required('Required'),
			})}
			onSubmit={(values) => onAuth(values, routeForward)}
		>
			{(props) => (
				<Box p={2}>
					<Flex direction="column" ml={3}>
						<Flex mb={1} mt={3} style={{ justifyContent: 'center' }} mx="5">
							<Heading mb={4} fontWeight="500" fontSize="2rem">
								Guest Information
							</Heading>
						</Flex>
						<Flex mb={5} mt={3} style={{ justifyContent: 'center' }} mx="5">
							<Box flex="3" mr={3} maxWidth="150px">
								<FormControl isInvalid={props.errors.title && props.touched.title}>
									<Select
										id="title"
										name="title"
										options={title}
										placeholder="Title"
										value={title ? title.find((option) => option.value === props.values.title) : ''}
										onChange={(option) => props.setFieldValue('title', option.value)}
										onBlur={() => props.setFieldTouched('title', true)}
										error={props.errors.title}
										touched={props.touched.title}
									/>
									<FormErrorMessage>{props.errors.title}</FormErrorMessage>
								</FormControl>
							</Box>
							<Box flex="3" mr={3}>
								<FormControl isInvalid={props.errors.firstName && props.touched.firstName}>
									<Input
										id="firstName"
										type="text"
										placeholder="First Name"
										{...props.getFieldProps('firstName')}
									/>
									<FormErrorMessage>{props.errors.firstName}</FormErrorMessage>
								</FormControl>
							</Box>
							<Box flex="3">
								<FormControl isInvalid={props.errors.lastName && props.touched.lastName}>
									<Input
										id="lastName"
										type="text"
										placeholder="Last Name"
										{...props.getFieldProps('lastName')}
									/>
									<FormErrorMessage>{props.errors.lastName}</FormErrorMessage>
								</FormControl>
							</Box>
						</Flex>
						<Flex mb={5} mt={5} style={{ justifyContent: 'center' }}>
							<Flex minWidth="80%">
								<Box flex="2" mr={3}>
									<FormControl isInvalid={props.errors.gender && props.touched.gender}>
										<Select
											id="gender"
											name="gender"
											options={gender}
											placeholder="Gender"
											value={
												gender
													? gender.find((option) => option.value === props.values.gender)
													: ''
											}
											onChange={(option) => props.setFieldValue('gender', option.value)}
											onBlur={() => props.setFieldTouched('gender', true)}
											error={props.errors.gender}
											touched={props.touched.gender}
										/>
										<FormErrorMessage>{props.errors.gender}</FormErrorMessage>
									</FormControl>
								</Box>
								<Box flex="5">
									<FormControl isInvalid={props.errors.email && props.touched.email}>
										<Input
											id="email"
											type="text"
											placeholder="Email"
											{...props.getFieldProps('email')}
										/>
										<FormErrorMessage>{props.errors.email}</FormErrorMessage>
									</FormControl>
								</Box>
							</Flex>
						</Flex>
						<Flex my={3}>
							<Divider />
						</Flex>

						<Flex mb={3} style={{ justifyContent: 'center' }}>
							<Button
								onClick={props.submitForm}
								colorScheme="teal"
								rightIcon={<ArrowForwardIcon />}
								width="full"
								mt={4}
							>
								Continue as a guest user
							</Button>
						</Flex>
						<Flex mb={3} style={{ justifyContent: 'center' }}>
							<Button
								onClick={() => {
									closeModal();
									signup.onOpen();
								}}
								colorScheme="teal"
								rightIcon={<ArrowForwardIcon />}
								width="full"
							>
								Sign-In and Continue
							</Button>
						</Flex>
					</Flex>
					<Modal
						closeOnOverlayClick={false}
						isOpen={signup.isOpen}
						onClose={() => {
							console.log('Here');
							signup.onClose();
						}}
						size="lg"
						motionPreset="slideInBottom"
						isCentered
						closeOnEsc
					>
						<ModalOverlay />
						<ModalContent>
							<ModalCloseButton />
							<ModalBody>
								<LoginArea onLogin={() => console.log('Logged in')} />
							</ModalBody>
						</ModalContent>
					</Modal>
				</Box>
			)}
		</Formik>
	);
};
export default connect(null, null)(GuestUser);;
