import React, { useState, useEffect } from 'react';
import {
	Box,
	Flex,
	Input,
	InputGroup,
	InputLeftElement,
	FormLabel,
	Button,
	Heading,
	FormControl,
	FormErrorMessage,
} from '@chakra-ui/react';
import Select from 'react-select';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addGuest } from '../../api/guest-api';
import { getTitles } from '../../api/title-api';
const title = [
	{ value: 'Mr', label: 'Mr' },
	{ value: 'Mrs', label: 'Mrs' },
	{ value: 'Ms.', label: 'Ms.' },
	{ value: 'Master', label: 'Master' },
	{ value: 'Rev.', label: 'Rev.' },
];
const gender = [
	{ value: 'm', label: 'Male' },
	{ value: 'f', label: 'Female' },
	{ value: 'o', label: 'Other' },
];

function GuestUser() {
	const [title, setTitle] = useState([]);
	useEffect(async () => {
		let titles = await getTitles();
		titles = titles.data;
		titles = titles.map((title) => {
			return { value: title.id, label: title.title_name };
		});
		console.log(titles);

		setTitle(titles)
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
				title: Yup.string()
					.required('Required'),
				email: Yup.string().email().required('Required'),
				gender: Yup.string()
					.oneOf(gender.map((item) => item.value))
					.required('Required'),
			})}
			onSubmit={(values) => {
				alert(JSON.stringify(values, null, 2));
				addGuest(values);
			}}
		>
			{(props) => (
				<Box
					p={2}
					mx={3}
					boxShadow="xs"
					border="1px"
					borderColor="gray.200"
					borderRadius="20px"
					style={{
						boxShadow: '0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)',
						minWidth: '70%',
					}}
				>
					<Flex direction="column" ml={3}>
						<Flex mb={1} mt={3} style={{ justifyContent: 'center' }} mx="5">
							<Heading mb={4} fontWeight="500" fontSize="2rem">
								Guest Information
							</Heading>
						</Flex>
						<Flex mb={5} mt={3} style={{ justifyContent: 'center' }} mx="5">
							<Box flex="3" mr={3} maxWidth="150px">
								<FormControl isInvalid={props.errors.title && props.touched.title}>
									<FormLabel>Title</FormLabel>
									<Select
										id="title"
										name="title"
										options={title}
										// placeholder="Title"
										value={title ? title.find((option) => option.value === props.values.title) : ''}
										onChange={(option) => props.setFieldValue('title', option.value)}
										onBlur={() => props.setFieldTouched('title', true)}
										error={props.errors.title}
										touched={props.touched.title}
									/>
									<FormErrorMessage>{props.errors.title}</FormErrorMessage>
								</FormControl>{' '}
							</Box>
							<Box flex="3" mr={3}>
								<FormControl isInvalid={props.errors.firstName && props.touched.firstName}>
									<FormLabel>First Name</FormLabel>
									<Input
										id="firstName"
										type="text"
										// placeholder="First Name"
										{...props.getFieldProps('firstName')}
									/>
									<FormErrorMessage>{props.errors.firstName}</FormErrorMessage>
								</FormControl>
							</Box>
							<Box flex="3">
								<FormControl isInvalid={props.errors.lastName && props.touched.lastName}>
									<FormLabel>Last Name</FormLabel>
									<Input
										id="lastName"
										type="text"
										// placeholder="Last Name"
										{...props.getFieldProps('lastName')}
									/>
									<FormErrorMessage>{props.errors.lastName}</FormErrorMessage>
								</FormControl>
							</Box>
						</Flex>
						<Flex mb={5} style={{ justifyContent: 'center' }}>
							<Flex minWidth="55%">
								<Box flex="1" mr={3}>
									<FormControl isInvalid={props.errors.gender && props.touched.gender}>
										<FormLabel>Gender</FormLabel>
										<Select
											id="gender"
											name="gender"
											options={gender}
											// placeholder="Gender"
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
										<FormLabel>Email</FormLabel>
										<Input
											id="email"
											type="text"
											// placeholder="Last Name"
											{...props.getFieldProps('email')}
										/>
										<FormErrorMessage>{props.errors.email}</FormErrorMessage>
									</FormControl>
								</Box>
							</Flex>
						</Flex>
						<Flex mb={3} style={{ justifyContent: 'center' }}>
							<Button onClick={props.submitForm}>Continue as a guest user</Button>
						</Flex>
						<Flex mb={3} style={{ justifyContent: 'center' }}>
							<Button>Sign-In and Continue</Button>
						</Flex>
					</Flex>
				</Box>
			)}
		</Formik>
	);
}
export default GuestUser;
