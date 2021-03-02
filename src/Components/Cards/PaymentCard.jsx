import React from 'react';
import {
	Box,
	Button,
	Text,
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
	useDisclosure,
} from '@chakra-ui/react';
import Fab from '@material-ui/core/Fab';
import PaymentIcon from '@material-ui/icons/Payment';
import { Formik } from 'formik';
import * as Yup from 'yup';

const PaymentCard = ({ addPayment }) => {
	const { onOpen, isOpen, onClose } = useDisclosure();

	return (
		<>
			<Button bg="transparent" _hover={{ bg: 'trasparent' }} onClick={onOpen}>
				<Fab color="primary" variant="extended" size="large">
					<PaymentIcon />
					<Text mx={2}>Pay For Booking</Text>
				</Fab>
			</Button>
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
								addPayment(values.transactionKey);
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
											<Text mx={2}>Confirm Booking</Text>
										</Button>
									</Box>
								</Box>
							)}
						</Formik>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default PaymentCard;
