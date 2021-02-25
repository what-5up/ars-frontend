import React, { useState, useEffect } from 'react';
import { Box, Flex, Input, Button, Divider, FormErrorMessage, FormControl, FormLabel } from '@chakra-ui/react';
import Select from 'react-select';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {getTitles} from '../../api/title-api'
import {gender} from '../../utils/constants';

const AddPassenger = ({ initialValues, addPassenger, countries }) => {
	const [title, setTitle] = useState([]);
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
				first_name: '',
				last_name: '',
				title: '',
				gender: '',
				country: '',
				birthday: '',
				passport_no: '',
				passport_expiry: '',
				...initialValues,
			}}
			validationSchema={Yup.object({
				first_name: Yup.string().required('Required'),
				last_name: Yup.string().required('Required'),
				title: Yup.string()
					// .oneOf(title.map((item) => item.value))
					.required('Required'),
				gender: Yup.string()
					.oneOf(gender.map((item) => item.value))
					.required('Required'),
				country: Yup.string(),
				// .oneOf(countries.map((item) => item.value))
				// .required('Required'),,
				birthday: Yup.date().max(new Date(), 'Enter a valid birthday').required('Required'),
				passport_no: Yup.number().required('Required'),
				passport_expiry: Yup.date().required('Required'),
			})}
			onSubmit={(values) => {
				addPassenger(values);
			}}
		>
			{(props) => (
				<Box p={2} width="80%">
					<Flex direction="column" ml={3}>
						<Flex mb={5} mt={3} style={{ justifyContent: 'center' }} mx="5">
							<Box flex="3" mr={3} maxWidth="150px">
								<FormControl isInvalid={props.errors.title && props.touched.title}>
									<FormLabel>Title</FormLabel>
									<Select
										name="title"
										options={title}
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
							<Box flex="3" mr={3}>
								<FormControl isInvalid={props.errors.first_name && props.touched.first_name}>
									<FormLabel>First Name</FormLabel>
									<Input
										type="text"
										value={props.initialValues.first_name}
										{...props.getFieldProps('first_name')}
									/>
									<FormErrorMessage>{props.errors.first_name}</FormErrorMessage>
								</FormControl>
							</Box>
							<Box flex="3">
								<FormControl isInvalid={props.errors.last_name && props.touched.last_name}>
									<FormLabel>Last Name</FormLabel>
									<Input
										type="text"
										value={props.initialValues.last_name}
										{...props.getFieldProps('last_name')}
									/>
									<FormErrorMessage>{props.errors.last_name}</FormErrorMessage>
								</FormControl>
							</Box>
						</Flex>
						<Flex mb={5} style={{ justifyContent: 'center' }} mx="5">
							<Flex width="80%">
								<Box flex="1" mr={3}>
									<FormControl isInvalid={props.errors.gender && props.touched.gender}>
										<FormLabel>Gender</FormLabel>
										<Select
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
								<Box flex="1" mr={3}>
									<FormControl isInvalid={props.errors.country && props.touched.country}>
										<FormLabel>Country</FormLabel>
										<Select
											options={countries}
											name="country"
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
										<FormLabel>Date of Birth</FormLabel>
										<Input
											type="date"
											max={new Date()}
											value={props.initialValues.date}
											{...props.getFieldProps('birthday')}
										/>
										<FormErrorMessage>{props.errors.birthday}</FormErrorMessage>
									</FormControl>
								</Box>
							</Flex>
						</Flex>
						<Flex mb={5} style={{ justifyContent: 'center' }} mx="5">
							<Flex width="50%">
								<Box flex="5" mr={3}>
									<FormControl
										isInvalid={props.errors.passport_no && props.touched.passport_no}
									>
										<FormLabel>Passport Number</FormLabel>
										<Input
											name="passport_no"
											type="number"
											value={props.initialValues.passport_no}
											{...props.getFieldProps('passport_no')}
										/>
										<FormErrorMessage>{props.errors.passport_no}</FormErrorMessage>
									</FormControl>
								</Box>
								<Box flex="5">
									<FormControl
										isInvalid={props.errors.passport_expiry && props.touched.passport_expiry}
									>
										<FormLabel>Passport Expiry Date</FormLabel>
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
						</Flex>
						<Flex mb={3} style={{ justifyContent: 'center' }}>
							<Divider />
						</Flex>
						<Flex mb={3} style={{ justifyContent: 'center' }}>
							<Button type="submit" onClick={props.submitForm}>
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
