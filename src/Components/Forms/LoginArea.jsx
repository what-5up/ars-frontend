import { React, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	Button,
	IconButton,
	Checkbox,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	Link,
	Flex,
	InputGroup,
	InputRightElement,
	FormErrorMessage,
} from '@chakra-ui/react';
import { ArrowForwardIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { Formik } from 'formik';
import * as Yup from 'yup';

const VARIANT_COLOR = 'teal';

const LoginArea = ({ onLogin }) => {
	return (
		<Flex
			//   minHeight="100vh"
			width="full"
			align="center"
			justifyContent="center"
			mt="10px"
		>
			<Box px={8} py={4} maxWidth="600px" borderRadius={10} width="full" bg="transparent">
				<LoginHeader />
				<LoginForm onLogin={onLogin} />
			</Box>
		</Flex>
	);
};

LoginArea.propTypes = {
	onLogin: PropTypes.func.isRequired,
};

const LoginHeader = () => {
	return (
		<Box textAlign="center">
			<Heading>Sign in to Your Account</Heading>
		</Box>
	);
};

const LoginForm = ({ onLogin }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [passwordShow, setPasswordShow] = useState(false);
	const handlePasswordShow = () => setPasswordShow(!passwordShow);
	const error = useSelector((state) => state.auth.error);
	const isLoading = useSelector((state) => state.auth.loading);
	const dispatch = useDispatch();
	const onAuth = useCallback((email, password, onLogin) => dispatch(actions.systemAuth(email, password, onLogin)), [
		dispatch,
	]);

	return (
		<Box my={8} textAlign="center">
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validationSchema={Yup.object({
					email: Yup.string().max(100).email('Invalid email').required('Required'),
					password: Yup.string().required('Required'),
				})}
				onSubmit={(values) => {
					onAuth(values.email, values.password, onLogin);
				}}
			>
				{(props) => (
					<Box>
						<Text fontSize="16px" color="tomato">
							{error}
						</Text>

						<FormControl isInvalid={props.errors.email && props.touched.email}>
							<FormLabel>Email Address:</FormLabel>
							<Input
								type="email"
								placeholder="Enter your Email Address"
								name="email"
								value={props.initialValues.email}
								{...props.getFieldProps('email')}
							/>
							<FormErrorMessage>{props.errors.password}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={props.errors.password && props.touched.password}>
							<FormLabel>Password:</FormLabel>
							<InputGroup>
								<Input
									type={passwordShow ? 'text' : 'password'}
									placeholder="Enter your Password"
									name="password"
									value={props.initialValues.password}
									{...props.getFieldProps('password')}
								/>
								<InputRightElement width="4.5rem">
									<IconButton
										variant="unstyled"
										colorScheme="teal"
										size="md"
										aria-label={passwordShow ? 'Hide Password' : 'Show Password'}
										onClick={handlePasswordShow}
										icon={passwordShow ? <ViewOffIcon /> : <ViewIcon />}
									/>
								</InputRightElement>
							</InputGroup>
							<FormErrorMessage>{props.errors.password}</FormErrorMessage>
						</FormControl>
						<Stack isInline justifyContent="space-between" mt={4}>
							<Box>
								<Checkbox>Remember Me</Checkbox>
							</Box>
							<Box>
								<Link color={`${VARIANT_COLOR}.500`} href="#">
									Forget Your Password?
								</Link>
							</Box>
						</Stack>
						<Button
							onClick={props.submitForm}
							colorScheme={VARIANT_COLOR}
							rightIcon={<ArrowForwardIcon />}
							width="full"
							mt={4}
							isLoading={isLoading}
							loadingText="Signinig in"
						>
							Sign In
						</Button>
					</Box>
				)}
			</Formik>
		</Box>
	);
};

LoginForm.propTypes = {
	onLogin: PropTypes.func.isRequired,
};

export default connect(null, null)(LoginArea);
