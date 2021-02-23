import React, { useState, useEffect } from 'react';
import { Box, Flex, Button, Text, Input, FormErrorMessage, FormControl } from '@chakra-ui/react';
import Select, { components } from 'react-select';
import PeopleIcon from '@material-ui/icons/People';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Fab from '@material-ui/core/Fab';
import FlightIcon from '@material-ui/icons/Flight';
import SearchIcon from '@material-ui/icons/Search';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getTravelerClasses } from '../../api/traveller-class-api';
import { getRoutes } from '../../api/route-api';
import { getScheduledFlights } from '../../api/scheduled-flight-api';

const options = [
	{ value: 'Abe', label: 'Abe', customAbbreviation: 'A' },
	{ value: 'John', label: 'John', customAbbreviation: 'J' },
	{ value: 'Dustin', label: 'Dustin', customAbbreviation: 'D' },
];

const DropdownIndicator = (props) => {
	return (
		components.DropdownIndicator && (
			<components.DropdownIndicator {...props}>
				<LocationOnIcon style={{ color: '#5f6368' }} />
			</components.DropdownIndicator>
		)
	);
};

const customStyles = {
	option: (provided, state) => ({
		...provided,
		color: state.isSelected ? 'red' : 'blue',
		padding: 20,
	}),
	control: (provided) => ({
		// none of react-select's styles are passed to <Control />
		...provided,
		height: '56px',
	}),
};

const formatOptionLabel = ({ value, label, customAbbreviation }) => (
	<div style={{ display: 'flex', flexDirection: 'column' }}>
		<div
			style={{
				font: '400 16px/24px Roboto,Arial,sans-serif',
				letterSpacing: '.1px',
				color: '#202124',
			}}
		>
			{label}
		</div>
		<div
			style={{
				font: '400 12px/16px Roboto,Arial,sans-serif',
				letterSpacing: '.3px',
				color: '#5f6368',
			}}
		>
			{customAbbreviation}
		</div>
	</div>
);

const convertArrToObj = (arr) => {
	let obj = {};
	arr.forEach((item) => {
		obj[item[2]] = 0;
	});
	return obj;
};

const types = [
	['Adult', '', 'adult'],
	['Children', 'Aged 2-12', 'children'],
	['Infant', 'on Seat', 'infantsOnSeat'],
	['Infants', 'on Lap', 'infantsOnLap'],
];

const  FindFlights = ({setFlights}) => {
	const [classes, setClasses] = useState([]);
	const [origins, setOrigins] = useState([]);
	const [destinations, setDestinations] = useState([]);
	useEffect(async () => {
		let classes = await getTravelerClasses();
		console.log(classes);
		classes = classes.data.map((item) => {
			return { label: item.class, value: item.id };
		});
		setClasses(classes);
	}, []);

	useEffect(async () => {
		let routes = await getRoutes();
		console.log(routes);

		let tempDestinations = [];
		let tempOrigins = [];

		// let uniqueOrigins = new Set(routes.data.map(item => {return {origin_code:item.origin_code, origin:item.origin}}));
		// origins  = Array.from(uniqueOrigins);

		routes.data.forEach((item) => {
			let index = tempOrigins.findIndex((entry) => item.origin_code == entry.value);
			if (index < 0) {
				tempOrigins.push({ value: item.origin_code, label: item.origin ,customAbbreviation: item.origin_region});
				tempDestinations.push([]);
				tempDestinations[tempDestinations.length - 1].push({
					id: item.id,
					value: item.destination_code,
					label: item.destination,
					customAbbreviation: item.destination_region
				});
			} else {
				tempDestinations[index].push({
					id: item.id,
					value: item.destination_code,
					label: item.destination,
					customAbbreviation: item.destination_region
				});
			}
		});

		setOrigins(tempOrigins);
		setDestinations(tempDestinations);
		console.log(tempOrigins);
		console.log(tempDestinations);
	}, []);
	let [showDropdown, setShowDropdown] = useState(false);
	let convertedAttr = convertArrToObj(types);
	return (
		<Formik
			initialValues={{
				origin: '',
				destination: '',
				travelClass: '',
				date: '',
				totalPassengers: 0,
				...convertedAttr,
			}}
			validationSchema={Yup.object({
				origin: Yup.string()
					// .oneOf(options.map((item) => item.value))
					.required('Required'),
				destination: Yup.string()
					// .oneOf(options.map((item) => item.value))
					.required('Required'),
				travelClass: Yup.string()
					// .oneOf(classes.map((item) => item.value))
					.required('Required'),
				date: Yup.date()
			})}
			onSubmit={async (values) => {
				// alert(JSON.stringify(values, null, 2));
				let flights = await getScheduledFlights(values);
				console.log(flights);
				setFlights(flights.data);
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
					<Flex direction="column" ml={3}>
						<Flex mb={5} mt={3} style={{ justifyContent: 'center' }}>
							<Flex mx="auto" style={{ width: '60%', justifyContent: 'center' }}>
								<Box mr={3} style={{ maxWidth: '200px', flex: 2 }}>
									<FormControl isInvalid={props.errors.travelClass && props.touched.travelClass}>
										<Select
											options={classes}
											placeholder="Class"
											value={
												classes
													? classes.find(
															(option) => option.value === props.values.travelClass
													  )
													: ''
											}
											onChange={(option) => props.setFieldValue('travelClass', option.value)}
											onBlur={() => props.setFieldTouched('travelClass', true)}
											error={props.errors.travelClass}
											touched={props.touched.travelClass}
										/>
										<FormErrorMessage>{props.errors.travelClass}</FormErrorMessage>
									</FormControl>
								</Box>
								<Box position="relative" style={{ flex: 2, maxWidth: '140px' }}>
									<Button
										onClick={() => {
											setShowDropdown(!showDropdown);
										}}
									>
										<PeopleIcon style={{ marginRight: '5px' }} />{' '}
										{types.reduce((tot, item) => tot + props.values[item[2]], 0)}{' '}
										<ArrowDropDownIcon />
									</Button>
									<Flex
										flexDirection="column"
										maxW="400px"
										display={showDropdown == true ? 'block' : 'none'}
										position="absolute"
										boxShadow="2xl"
										padding="15px"
										left="-100px"
										right="-100px"
										zIndex="100"
										backgroundColor="white"
									>
										{types.map((type, index) => {
											return (
												<FormControl
													isInvalid={props.errors[type[2]] && props.touched[type[2]]}
												>
													<PassengerType
														key={index}
														id={type[2]}
														type={type[0]}
														description={type[1]}
														formik={props}
													/>
													<FormErrorMessage>{props.errors.travelClass}</FormErrorMessage>
												</FormControl>
											);
										})}
										<Box mt={3} mb={3}>
											<Flex justify="flex-end" mr={6}>
												<Button
													size="sm"
													colorScheme="blue"
													onClick={() => {
														setShowDropdown(!showDropdown);
													}}
												>
													Done
												</Button>
											</Flex>
										</Box>
									</Flex>
								</Box>
							</Flex>
						</Flex>
						<Flex mb={3} style={{ justifyContent: 'center' }}>
							<Flex style={{ width: '90%', height: '56px' }}>
								<Box flex="2" mr={3} h="100%">
									<FormControl isInvalid={props.errors.origin && props.touched.origin}>
										<Select
											options={origins}
											isSearchable={true}
											components={{  IndicatorSeparator: () => null, DropdownIndicator }}
											
											formatOptionLabel={formatOptionLabel}
											classNamePrefix="vyrill"
											styles={customStyles}
											placeholder="From"
											value={
												options
													? options.find((option) => option.value === props.values.origin)
													: ''
											}
											onChange={(option) => {
												props.setFieldValue('origin', option.value);
												props.setFieldValue('destination', '');
												console.log(props.values.destination);
											}}
											onBlur={() => props.setFieldTouched('origin', true)}
											error={props.errors.origin}
											touched={props.touched.origin}
										/>
										<FormErrorMessage>{props.errors.from}</FormErrorMessage>
									</FormControl>
								</Box>
								<Box flex="2" ml={3} h="100%">
									<FormControl isInvalid={props.errors.destination && props.touched.destination}>
										<Select
											options={
												props.values.origin == ''
													? []
													: destinations[
															origins.findIndex(
																(entry) => props.values.origin == entry.value
															)
													  ]
											}
											isSearchable={true}
											components={{ DropdownIndicator }}
											formatOptionLabel={formatOptionLabel}
											classNamePrefix="vyrill"
											styles={customStyles}
											placeholder="To"
											value={
												options
													? options.find((option) => option.value === props.values.destination)
													: ''
											}
											onChange={(option) => props.setFieldValue('destination', option.value)}
											onBlur={() => props.setFieldTouched('destination', true)}
											error={props.errors.destination}
											touched={props.touched.destination}
										/>
										<FormErrorMessage>{props.errors.destination}</FormErrorMessage>
									</FormControl>
								</Box>
								<Box flex="2" ml={3} h="100%">
									<FormControl isInvalid={props.errors.date && props.touched.date}>
										<Input type="date" h="56px" {...props.getFieldProps('date')} />
										<FormErrorMessage>{props.errors.date}</FormErrorMessage>
									</FormControl>
								</Box>
							</Flex>
						</Flex>

						<Flex mb={3} justifyContent="center">
							{/* <Center> */}
							<Button bg="transparent" size="lg" _hover={{ bg: 'trasparent' }} onClick={props.submitForm}>
								<Fab color="primary" variant="extended">
									<SearchIcon />
									<Text mx={2}>Find Flights</Text>
								</Fab>
							</Button>
							{/* </Center> */}
						</Flex>
					</Flex>
				</Box>
			)}
		</Formik>
	);
}

const PassengerType = ({ id, type, description, formik }) => {
	return (
		<Flex mt={3}>
			<Flex flex={1} flexDirection="column">
				<Box pl={5} flex={1}>
					<h1
						style={{
							marginLeft: '10px',
							color: '#5f6368',
							letterSpacing: '.1px',
							font: '400 16px/24px Roboto,Arial,sans-serif',
						}}
					>
						{type}
					</h1>
				</Box>
				<Box flex={1} pl={5}>
					<Text
						fontSize="xs"
						style={{
							marginLeft: '10px',
							color: '#5f6368',
							letterSpacing: '.3px',
							font: '400 12px/16px Roboto,Arial,sans-serif',
						}}
					>
						{description}
					</Text>
				</Box>
			</Flex>

			<Box flex={1} style={{ padding: '0px 30px' }}>
				<Button
					mr={2}
					width="50px"
					onClick={() => {
						if (formik.values[id] > 0) formik.setFieldValue(id, formik.values[id] - 1);
					}}
				>
					<RemoveIcon style={{ color: '#9aa0a6' }} />
				</Button>
				<label htmlFor="" style={{ color: '#5f6368' }}>
					{formik.values[id]}
				</label>
				<Button
					ml={2}
					width="50px"
					onClick={() => {
						formik.setFieldValue(id, formik.values[id] + 1);
					}}
				>
					<AddIcon style={{ color: '#1967d2' }} />
				</Button>
			</Box>
		</Flex>
	);
};

export default FindFlights;
