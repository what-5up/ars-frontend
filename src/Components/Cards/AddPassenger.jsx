import React, { useState, useEffect } from 'react';
import { Box, Flex, Input, Button, Heading, Divider, FormErrorMessage, FormControl, FormLabel } from '@chakra-ui/react';
import Select from 'react-select';
import { Formik } from 'formik';
import * as Yup from 'yup';

const title = [
	{ value: 'Mr', label: 'Mr' },
	{ value: 'Mrs', label: 'Mrs' },
	{ value: 'Ms.', label: 'Ms.' },
	{ value: 'Master', label: 'Master' },
	{ value: 'Rev.', label: 'Rev.' },
];
const gender = [
	{ value: 'Male', label: 'Male' },
	{ value: 'Female', label: 'Female' },
	{ value: 'Other', label: 'Other' },
];

// const API_URL = 'https://api.printful.com/countries';
const API_URL = 'https://restcountries.eu/rest/v2/all';

const fetchCountries = async () => {
	let respone = await fetch(API_URL);
	let data = await respone.json();
	// data = data.result;
	data = data.map((item) => {
		return { value: item.name, label: item.name };
	});
	console.log(data);
	return data;
};

const AddPassenger = () => {
	let [countries, setCountries] = useState([]);

	useEffect(async () => {
		let data = await fetchCountries();
		setCountries(data);
	}, []);
	return (
		<Formik
			initialValues={{
				firstName: '',
				lastName: '',
				title: '',
				gender: '',
				country: '',
				dateOfBirth: '',
				passportNumber: '',
				passportExpDate: '',
			}}
			validationSchema={Yup.object({
				firstName: Yup.string().required('Required'),
				lastName: Yup.string().required('Required'),
				title: Yup.string()
					.oneOf(title.map((item) => item.value))
					.required('Required'),
				gender: Yup.string()
					.oneOf(gender.map((item) => item.value))
					.required('Required'),
				country: Yup.string()
					.oneOf(countries.map((item) => item.value))
					.required('Required'),
				dateOfBirth: Yup.date().max(new Date(),"Enter a valid birthday").required('Required'),
				passportNumber: Yup.number().required('Required'),
				passportExpDate: Yup.date().required('Required'),
			})}
			onSubmit={(values) => {
				alert(JSON.stringify(values, null, 2));
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
						minWidth: '80%',
					}}
				>
					{/* <Form > */}
					<Flex direction="column" ml={3}>
						<Flex mb={1} mt={3} style={{ justifyContent: 'center' }} mx="5">
							<Heading mb={4} fontWeight="500" fontSize="2rem">
								Passenger
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
								</FormControl>
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
						<Flex mb={5} style={{ justifyContent: 'center' }} mx="5">
							<Flex width="80%">
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
								<Box flex="1" mr={3}>
									<FormControl isInvalid={props.errors.country && props.touched.country}>
										<FormLabel>Country</FormLabel>
										<Select
											id="country"
											options={countries}
											// placeholder="Country"
											name="country"
											value={
												countries
													? countries.find((option) => option.value === props.values.country)
													: ''
											}
											onChange={(option) => props.setFieldValue('country', option.value)}
											onBlur={() => props.setFieldTouched('country', true)}
											error={props.errors.country}
											touched={props.touched.country}
										/>
										<FormErrorMessage>{props.errors.country}</FormErrorMessage>
									</FormControl>
								</Box>
								<Box flex="1">
									{/* <DatePicker style={{ borderRadius: 0 }} /> */}
									<FormControl isInvalid={props.errors.dateOfBirth && props.touched.dateOfBirth}>
										<FormLabel>Date of Birth</FormLabel>
										<Input
											id="dateOfBirth"
											type="date"
											max = {new Date()}
											// placeholder="Date of Birth"
											{...props.getFieldProps('dateOfBirth')}
										/>
										<FormErrorMessage>{props.errors.dateOfBirth}</FormErrorMessage>
									</FormControl>
								</Box>
							</Flex>
						</Flex>
						<Flex mb={5} style={{ justifyContent: 'center' }} mx="5">
							<Flex width="50%">
								<Box flex="5" mr={3}>
									<FormControl
										isInvalid={props.errors.passportNumber && props.touched.passportNumber}
									>
										<FormLabel>Passport Number</FormLabel>
										<Input
											id="passportNumber"
											type="number"
											// placeholder="Passport Number"
											{...props.getFieldProps('passportNumber')}
										/>
										<FormErrorMessage>{props.errors.passportNumber}</FormErrorMessage>
									</FormControl>
								</Box>
								<Box flex="5">
									<FormControl
										isInvalid={props.errors.passportExpDate && props.touched.passportExpDate}
									>
										<FormLabel>Passport Expiry Date</FormLabel>
										<Input
											id="passportExpDate"
											type="date"
											// placeholder="Passport Expiry Date"
											{...props.getFieldProps('passportExpDate')}
										/>
										<FormErrorMessage>{props.errors.passportExpDate}</FormErrorMessage>
									</FormControl>
								</Box>
							</Flex>
						</Flex>
						<Flex mb={3} style={{ justifyContent: 'center' }}>
							<Divider />
						</Flex>
						<Flex mb={3} style={{ justifyContent: 'center' }}>
							<Button type="submit" onClick={props.submitForm}>
								Continue
							</Button>
						</Flex>
					</Flex>
				</Box>
			)}
		</Formik>
	);
};
export default AddPassenger;
