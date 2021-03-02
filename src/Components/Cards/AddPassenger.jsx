import React, { useState, useEffect } from 'react';
import { Box, Flex, Input, Button, Divider, FormErrorMessage, FormControl, FormLabel, Text } from '@chakra-ui/react';
import Select from 'react-select';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getTitles } from '../../api/title-api';
import { gender } from '../../utils/constants';

const AddPassenger = ({ initialValues, addPassenger, countries }) => {
	console.log(initialValues);
	const [title, setTitle] = useState([]);
	const [formValues, setFormValues] = useState({});

	useEffect(async () => {
		let titles = await getTitles();
		titles = titles.data;
		titles = titles.map((title) => {
			return { value: title.id, label: title.title_name };
		});
		setTitle(titles);
	}, []);

	useEffect(() => {
		if (initialValues.hasOwnProperty('birthday') && initialValues.hasOwnProperty('passport_expiry')) {
			if (initialValues.birthday != '' && initialValues.passport_expiry != '') {
				let passport_expiry = new Date(initialValues.passport_expiry);
				let birthday = new Date(initialValues.birthday);
				initialValues.birthday = birthday.toISOString().slice(0, 10);
				initialValues.passport_expiry = passport_expiry.toISOString().slice(0, 10);
			}
		}
		console.log(initialValues);
		setFormValues(initialValues);
	}, [initialValues]);
	
	return (
		<Formik
			initialValues={{
				first_name: '',
				last_name: '',
				title: '',
				gender: '',
				country: '',
				birthday: '',
				passport_no: '',
				passport_expiry: '',
				...formValues,
			}}
			enableReinitialize={true}
			validationSchema={Yup.object({
				first_name: Yup.string().required('Required'),
				last_name: Yup.string().required('Required'),
				title: Yup.number()
					.oneOf(title.map((item) => item.value))
					.required('Required'),
				gender: Yup.string()
					.oneOf(gender.map((item) => item.value))
					.required('Required'),
				country: Yup.string()
					.oneOf(countries.map((item) => item.value))
					.required('Required'),
				birthday: Yup.date().max(new Date(), 'Enter a valid birthday').required('Required'),
				passport_no: Yup.number().required('Required'),
				passport_expiry: Yup.date().min(new Date()).required('Required'),
			})}
			onSubmit={(values) => {
				addPassenger(values);
			}}
		>
			{(props) => (
				<Box p={2}>
					<Flex direction="column" ml={3}>
						<Flex>
							<Divider />
						</Flex>
						<Flex mb={5} mt={3} style={{ justifyContent: 'center' }} mx="5">
							<Box flex="1" mr={3}>
								<FormControl isInvalid={props.errors.title && props.touched.title}>
									<Select
										name="title"
										options={title}
										placeholder="Title"
										value={
											title
												? title.find((option) => option.value === props.values.title)
												: props.initialValues.title
										}
										onChange={(option) => props.setFieldValue('title', option.value)}
										onBlur={() => props.setFieldTouched('title', true)}
										error={props.errors.title}
										touched={props.touched.title}
									/>
									<FormErrorMessage>{props.errors.title}</FormErrorMessage>
								</FormControl>
							</Box>
							<Box flex="1" mr={3}>
								<FormControl isInvalid={props.errors.gender && props.touched.gender}>
									<Select
										placeholder="Gender"
										name="gender"
										options={gender}
										value={
											gender
												? gender.find((option) => option.value === props.values.gender)
												: props.initialValues.gender
										}
										onChange={(option) => props.setFieldValue('gender', option.value)}
										onBlur={() => props.setFieldTouched('gender', true)}
										error={props.errors.gender}
										touched={props.touched.gender}
									/>
									<FormErrorMessage>{props.errors.gender}</FormErrorMessage>
								</FormControl>
							</Box>
						</Flex>
						<Flex mb={5} style={{ justifyContent: 'center' }} mx="5">
							<Box flex="3" mr={3}>
								<FormControl isInvalid={props.errors.first_name && props.touched.first_name}>
									<Input
										type="text"
										placeholder="First Name"
										value={props.initialValues.first_name}
										{...props.getFieldProps('first_name')}
									/>
									<FormErrorMessage>{props.errors.first_name}</FormErrorMessage>
								</FormControl>
							</Box>
							<Box flex="3">
								<FormControl isInvalid={props.errors.last_name && props.touched.last_name}>
									<Input
										type="text"
										placeholder="Last Name"
										value={props.initialValues.last_name}
										{...props.getFieldProps('last_name')}
									/>
									<FormErrorMessage>{props.errors.last_name}</FormErrorMessage>
								</FormControl>
							</Box>
						</Flex>
						<Flex mb={5} style={{ justifyContent: 'center' }} mx="5">
							<Box flex="1" mr={3}>
								<FormControl isInvalid={props.errors.country && props.touched.country}>
									<Select
										options={countries}
										name="country"
										placeholder="Country"
										value={
											countries
												? countries.find((option) => option.value === props.values.country)
												: props.initialValues.countries
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
								<FormControl isInvalid={props.errors.birthday && props.touched.birthday}>
									<Input
										type="date"
										max={new Date()}
										placeholder="date"
										value={props.initialValues.date}
										{...props.getFieldProps('birthday')}
									/>
									<FormErrorMessage>{props.errors.birthday}</FormErrorMessage>
								</FormControl>
							</Box>
						</Flex>

						<Flex mb={5} style={{ justifyContent: 'center' }} mx="5">
							<Box flex="5" mr={3}>
								<FormControl isInvalid={props.errors.passport_no && props.touched.passport_no}>
									<Input
										placeholder="Passport Number"
										name="passport_no"
										type="number"
										value={props.initialValues.passport_no}
										{...props.getFieldProps('passport_no')}
									/>
									<FormErrorMessage>{props.errors.passport_no}</FormErrorMessage>
								</FormControl>
							</Box>
							<Box flex="5">
								<FormControl isInvalid={props.errors.passport_expiry && props.touched.passport_expiry}>
									{/* <DatePicker /> */}
									<Input
										name="passport_expiry"
										type="date"
										value={props.initialValues.passport_expiry}
										{...props.getFieldProps('passport_expiry')}
									/>
									<FormErrorMessage>{props.errors.passport_expiry}</FormErrorMessage>
								</FormControl>
							</Box>
						</Flex>
						<Flex mb={3} style={{ justifyContent: 'center' }}>
							<Divider />
						</Flex>
						<Flex mb={3} style={{ justifyContent: 'center' }}>
							<Button
								type="submit"
								onClick={(e) => {
									e.target.innerHTML = 'Update';
									props.submitForm();
								}}
								colorScheme="teal"
								minWidth={'300px'}
								mt={4}
							>
								Submit
							</Button>
						</Flex>
					</Flex>
				</Box>
			)}
		</Formik>
	);
};
export default AddPassenger;
