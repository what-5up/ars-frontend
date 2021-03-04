import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, Box, Button, Heading, FormControl, FormErrorMessage, useToast } from '@chakra-ui/react';
import Select from 'react-select';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { getTitles } from '../../api/title-api';
import { addUser } from '../../api/user-api';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { gender } from '../../utils/constants';

const RegistrationArea = ({ onClose }) => {
	return (
		<Box m={8} pb={2}>
			<Container component="main" maxWidth="md">
				<div>
					<RegistrationHeader />
					<RegistrationForm onClose={onClose} />
				</div>
			</Container>
		</Box>
	);
};

const RegistrationHeader = ({ title, subtitle }) => {
	return (
		<Box textAlign="center" mb={8}>
			<Heading as="h2" size="lg" fontWeight="bold" color="primary.800">
				{title}
			</Heading>
			<Heading as="h3" size="md" color="primary.900" opacity="0.8" lineHeight={1.5}>
				{subtitle}
			</Heading>
		</Box>
	);
};

RegistrationHeader.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
};
RegistrationHeader.defaultProps = {
	title: 'Create Your Account',
	subtitle: 'Join with us to make your dream journey....',
};

const RegistrationForm = ({ onClose }) => {
	const [titleList, setTitleList] = useState([]);
	const toast = useToast()
	useEffect(async () => {
		let titles = await getTitles();
		titles = titles.data || [];
		titles = titles.map((title) => {
			return { value: title.id, label: title.title_name };
		});
		console.log(titles);
		setTitleList(titles);
	}, []);

	return (
		<Box mt={8} textAlign="center">
			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					title: '',
					email: '',
				}}
				validationSchema={Yup.object({
					firstName: Yup.string().max(150).required('Required'),
					lastName: Yup.string().max(150).required('Required'),
					title: Yup.number()
						.oneOf(titleList.map((item) => item.value))
						.required('Required'),
					gender: Yup.string()
						.oneOf(gender.map((item) => item.value))
						.required('Required'),
					email: Yup.string().max(100).email('Email must be valid').required('Required'),
					password: Yup.string().min(5).required('Required'),
					confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
				})}
				onSubmit={async (values) => {
					var response = await addUser(values);
					if (response.message === 'User created successfully') {
						toast({
							title: 'Account Created.',
							description: 'Now You Have a Account. Enjoy!',
							status: 'success',
							duration: 9000,
							isClosable: true,
						});
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
				}}
			>
				{(props) => (
					<Box p={2}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={2}>
								<FormControl isInvalid={props.errors.title && props.touched.title}>
									<Select
										id="title"
										name="title"
										options={titleList}
										placeholder="Title"
										value={
											titleList
												? titleList.find((option) => option.value === props.values.title)
												: ''
										}
										onChange={(option) => props.setFieldValue('title', option.value)}
										onBlur={() => props.setFieldTouched('title', true)}
										error={props.errors.title}
										touched={props.touched.title}
									/>
									<FormErrorMessage>{props.errors.title}</FormErrorMessage>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={5}>
								<FormControl isInvalid={props.errors.firstName && props.touched.firstName}>
									<Input
										name="firstName"
										placeholder="First Name"
										required
										fullWidth
										id="firstName"
										label="First Name"
										autoFocus
										autoComplete="off"
										{...props.getFieldProps('firstName')}
									/>
									<FormErrorMessage>{props.errors.firstName}</FormErrorMessage>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={5}>
								<FormControl isInvalid={props.errors.lastName && props.touched.lastName}>
									<Input
										required
										fullWidth
										id="lastName"
										label="Last Name"
										placeholder="Last Name"
										name="lastName"
										autoComplete="off"
										{...props.getFieldProps('lastName')}
									/>
									<FormErrorMessage>{props.errors.lastName}</FormErrorMessage>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={8}>
								<FormControl isInvalid={props.errors.email && props.touched.email}>
									<Input
										required
										id="email"
										label="Email Address"
										placeholder="Email Address"
										name="email"
										autoComplete="off"
										{...props.getFieldProps('email')}
									/>
									<FormErrorMessage>{props.errors.email}</FormErrorMessage>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={4}>
								<FormControl isInvalid={props.errors.gender && props.touched.gender}>
									<Select
										id="gender"
										name="gender"
										options={gender}
										placeholder="gender"
										value={
											gender ? gender.find((option) => option.value === props.values.gender) : ''
										}
										onChange={(option) => props.setFieldValue('gender', option.value)}
										onBlur={() => props.setFieldTouched('gender', true)}
										error={props.errors.gender}
										touched={props.touched.gender}
									/>
									<FormErrorMessage>{props.errors.gender}</FormErrorMessage>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<FormControl isInvalid={props.errors.password && props.touched.password}>
									<Input
										required
										fullWidth
										name="password"
										label="Password"
										placeholder="Password"
										type="password"
										id="password"
										{...props.getFieldProps('password')}
									/>
									<FormErrorMessage>{props.errors.password}</FormErrorMessage>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<FormControl isInvalid={props.errors.confirmPassword && props.touched.confirmPassword}>
									<Input
										required
										fullWidth
										name="confirmPassword"
										label="Confirm Password"
										placeholder="Confirm Password"
										type="password"
										id="confirmPassword"
										autoComplete="off"
										{...props.getFieldProps('confirmPassword')}
									/>
									<FormErrorMessage>{props.errors.confirmPassword}</FormErrorMessage>
								</FormControl>
							</Grid>
						</Grid>
						<Button
							colorScheme="teal"
							size="lg"
							onClick={props.submitForm}
							rightIcon={<ArrowForwardIcon />}
							width="full"
							mt={4}
							loadingText="Registering"
						>
							Register
						</Button>
					</Box>
				)}
			</Formik>
		</Box>
	);
};

export default RegistrationArea;
