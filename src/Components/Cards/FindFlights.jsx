import React, { useState } from 'react';
import { Box, Flex, Center, Button, Text, FormLabel, UnorderedList, ListItem } from '@chakra-ui/react';
import Select from 'react-select';
import SelectWithIcon from './SelectWithIcon';
import { components } from 'react-select';
import PeopleIcon from '@material-ui/icons/People';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Picklist, PicklistOption, DatePicker } from 'react-rainbow-components';
const options = [
	{ value: 'Abe', label: 'Abe', customAbbreviation: 'A' },
	{ value: 'John', label: 'John', customAbbreviation: 'J' },
	{ value: 'Dustin', label: 'Dustin', customAbbreviation: 'D' },
];

const classes = [
	{ value: 'Economy', label: 'Economy' },
	{ value: 'Business', label: 'Business' },
	{ value: 'Premium Economy', label: 'Premium Economy' },
	{ value: 'First', label: 'First' },
];

function FindFlights() {
	let [types, setTypes] = useState([
		['Adult', ''],
		['Children', 'Aged 2-12'],
		['Infant', 'on Seat'],
		['Infants', 'on Lap'],
	]);
	let [showDropdown, setShowDropdown] = useState(false);
	const [selectedDate, handleDateChange] = useState(new Date());
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
			<Flex direction="column" ml={3}>
				<Flex mb={5} mt={3} style={{ justifyContent: 'center' }}>
					<Flex mx="auto" style={{ width: '60%', justifyContent: 'center' }}>
						<Box mr={3} style={{ maxWidth: '200px', flex: 2 }}>
							<Select defaultValue={classes[0].value} options={classes} placeholder="Class" />
						</Box>
						<Box position="relative" style={{ flex: 2, maxWidth: '140px' }}>
							<Button
								onClick={() => {
									setShowDropdown(!showDropdown);
								}}
							>
								<PeopleIcon style={{ marginRight: '5px' }} /> 1 <ArrowDropDownIcon />
							</Button>
							<Flex
								flexDirection="column"
								maxW="400px"
								display={showDropdown == true ? 'block' : 'none'}
								position="absolute"
								boxShadow="2xl"
								left="-100px"
								right="-100px"
								zIndex="100"
								backgroundColor="white"
							>
								{types.map((type) => (
									<PassengerType type={type[0]} description={type[1]} />
								))}
								<Box mt={3}>
									<Flex justify="flex-end">
										<Button size="sm" mr={3}>
											Cancel
										</Button>
										<Button size="sm" colorScheme="blue">
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
							<SelectWithIcon options={options} placeholder="From" />
						</Box>
						<Box flex="2" ml={3} h="100%">
							<SelectWithIcon options={options} placeholder="To" />
						</Box>
						<Box flex="2" ml={3} h="100%">
							<DatePicker/>
							{/* <SingleDatePicker startDate={new Date(2020, 0, 15)} /> */}
						</Box>
					</Flex>
				</Flex>

				<Flex mb={3} justifyContent="center">
					{/* <Center> */}
					<Button colorScheme="blue" variant="solid">
						Find Flights
					</Button>
					{/* </Center> */}
				</Flex>
			</Flex>
		</Box>
	);
}

const PassengerType = ({ type, description }) => {
	return (
		<Flex mt={3}>
			<Flex flex={1} flexDirection="column">
				<Box pl={5} flex={1}>
					{/* <Center> */}
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
					{/* </Center> */}
				</Box>
				<Box flex={1} pl={5}>
					{/* <Center> */}
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

					{/* </Center> */}
				</Box>
			</Flex>

			<Box flex={1} style={{ padding: '0px 30px' }}>
				<Button mr={2} width="50px">
					<RemoveIcon style={{ color: '#9aa0a6' }} />
				</Button>
				<label htmlFor="" style={{ color: '#5f6368' }}>
					0
				</label>
				<Button ml={2} width="50px">
					<AddIcon style={{ color: '#1967d2' }} />
				</Button>
			</Box>
		</Flex>
	);
};

export default FindFlights;
