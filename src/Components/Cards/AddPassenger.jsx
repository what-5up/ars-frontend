import React, { useState, useEffect } from 'react';
import { Box, Flex, Input, InputGroup, InputLeftElement, FormLabel, Button, Heading, Form } from '@chakra-ui/react';
import Select from 'react-select';
import { useFormik } from 'formik';
import { Picklist, PicklistOption, DatePicker } from 'react-rainbow-components';

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
	// const formik = useFormik({
	// 	initialValues: {
	// 		firstName: '',
	// 		lastName: '',
	// 		gender: '',
	// 		country: '',
	// 		dateOfBirth: '',
	// 		passportNumber: '',
	// 		passportExpDate: '',
	// 	},
	// 	// validationSchema: Yup.object({
	// 	// 	firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
	// 	// 	lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
	// 	// 	email: Yup.string().email('Invalid email address').required('Required'),
	// 	// }),
	// 	onSubmit: (values) => {
	// 		alert(JSON.stringify(values, null, 2));
	// 	},
	// });
	return (
		<Box
			p={2}
			mx={3}
			boxShadow="xs"
			border="1px"
			borderColor="gray.200"
			borderRadius="20px"
			style={{ boxShadow: '0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)', minWidth: '80%' }}
		>
			{/* <Form onSubmit={formik.handleSubmit}> */}
			{/* <Form > */}
				<Flex direction="column" ml={3}>
					<Flex mb={1} mt={3} style={{ justifyContent: 'center' }} mx="5">
						<Heading mb={4} fontWeight="500" fontSize="2rem">
							Passenger
						</Heading>
					</Flex>
					<Flex mb={5} mt={3} style={{ justifyContent: 'center' }} mx="5">
						<Box flex="3" mr={3} maxWidth="150px">
							<Select defaultValue={title[0].value} options={title} placeholder="Title" />
						</Box>
						<Box flex="3" mr={3}>
							<Input
								id="firstName"
								type="text"
								placeholder="First Name"
								// {...formik.getFieldProps('firstName')}
							/>
						</Box>
						<Box flex="3">
							<Input
								id="lastName"
								type="text"
								placeholder="Last Name"
								// {...formik.getFieldProps('lastName')}
							/>
						</Box>
					</Flex>
					<Flex mb={5} style={{ justifyContent: 'center' }} mx="5">
						<Flex width="80%">
							<Box flex="1" mr={3}>
								<Select
									id="gender"
									defaultValue={gender[0].value}
									options={gender}
									placeholder="Gender"
								/>
							</Box>
							<Box flex="1" mr={3}>
								<Select
									id="country"
									options={countries}
									placeholder="Country"
								/>
							</Box>
							<Box flex="1">
								<DatePicker/>
								{/* <Input
									id="dateOfBirth"
									type="date"
									placeholder="Date of Birth"
									// {...formik.getFieldProps('dateOfBirth')}
								/> */}
							</Box>
						</Flex>
					</Flex>
					<Flex mb={5} style={{ justifyContent: 'center' }} mx="5">
						<Flex width="50%">
							<Box flex="5" mr={3}>
								<Input
									id="passportNumber"
									type="number"
									placeholder="Passport Number"
									// {...formik.getFieldProps('passportNumber')}
								/>
							</Box>
							<Box flex="5">
								<Input
									id="passportExpDate"
									type="date"
									placeholder="Passport Expiry Date"
									// {...formik.getFieldProps('passportExpDate')}
								/>
							</Box>
						</Flex>
					</Flex>
					<Flex mb={3} style={{ justifyContent: 'center' }}>
						<Button >Continue</Button>
					</Flex>
				</Flex>
			{/* </Form> */}
		</Box>
	);
};
export default AddPassenger;
