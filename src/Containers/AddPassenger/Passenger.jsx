import React, { useState, useEffect } from 'react';
import {
	Flex,
	Button,
	Accordion,
	AccordionButton,
	AccordionItem,
	Box,
	AccordionPanel,
	Heading,
	Text,
	Divider
} from '@chakra-ui/react';
import AddPassenger from '../../Components/Cards/AddPassenger';
import { addOrUpdateArray } from '../../utils/helpers';
import { useLocation, useHistory } from 'react-router-dom';
import { addPassengers } from '../../api/passenger-api';
import PassengerPlaceholder from '../../Components/Cards/PassengerPlaceholder';
import PassengerFlight from '../../Components/Cards/PassengerFlight';

const API_URL = 'https://restcountries.eu/rest/v2/all';

const fetchCountries = async () => {
	let respone = await fetch(API_URL);
	let data = await respone.json();
	data = data.map((item) => {
		return { value: item.name, label: item.name };
	});
	return data;
};

const Passenger = () => {
	let [passengers, setPassengers] = useState([]);
	let [countries, setCountries] = useState([]);
	const location = useLocation();
	const locationParams = location.state;
	const count = 4; //location.state.count;
	const history = useHistory();
	const handleClick = async () => {
		history.push('/seatmap',{passengers:passengers, ...locationParams})
	};

	const checkToContinue = () => {
		let canContinue = true;
		for(let i =0;i <passengers.length;i++){
			if(!passengers[i].hasOwnProperty('first_name')){
				canContinue = false
				break;
			}
		}
		return !canContinue;
	}

	useEffect(async () => {
		let tempArr = [];
		for (let i = 0; i < count; i++) {
			tempArr.push({ key: i, disabled: true });
			if (i != 0) {
				tempArr[0]['disabled'] = false;
			}
		}
		setPassengers(tempArr);
	}, []);
	


	const addOrUpdatePassengers = (obj) => {
		let newPassengers = passengers;
		let index = passengers.findIndex((item) => item.disabled == true);
		if (index > 0) {
			newPassengers = addOrUpdateArray(passengers, { ...passengers[index], disabled: false });
		}
		setPassengers([...addOrUpdateArray(newPassengers, obj)]);
	};
	return (
		<Box width="100%" mx="auto">
			<Heading  ml="12" mt="3" mb="5">
				Passengers
			</Heading>
			<Divider/>
			<Flex>
				<Flex flexDirection="column" w="70%">
					<Flex w="100%" justifyContent="center">
						<Accordion w="90%" allowMultiple allowToggle>
							{passengers.map((item) => (
								<PassengerAccordion
									key={item.key}
									index={item.key}
									disabled={item.disabled}
									addOrUpdatePassengers={addOrUpdatePassengers}
									countries={countries}
								/>
							))}
						</Accordion>
					</Flex>
					<Flex justifyContent="flex-end" mx="12" mb="3">
						<Button onClick={handleClick} isDisabled={checkToContinue()} colorScheme="teal" minWidth="full" mt={4}>
							Continue
						</Button>
					</Flex>
				</Flex>

				<Flex flex={3} w="30%">
					<Flex w="100%" justifyContent="center">
						<PassengerFlight />
					</Flex>
				</Flex>
			</Flex>
		</Box>
	);
};

const PassengerAccordion = ({ index, disabled, countries, addOrUpdatePassengers }) => {
	return (
		<AccordionItem
			boxShadow="xs"
			borderRadius="0px"
			mb={3}
			style={{
				boxShadow: '0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)',
				minWidth: '80%',
				borderColor: 'gray.200',
			}}
			isDisabled={disabled}
			_expanded
		>
			<h2>
				<AccordionButton>
					<Box mb={2} mt={3} mx="5">
						<Text fontSize="2xl">{`Passenger ${index + 1}`}</Text>
					</Box>
				</AccordionButton>
			</h2>
			<AccordionPanel pb={4}>
				<AddPassenger initialValues={{ key: 0 }} addPassenger={addOrUpdatePassengers} countries={countries} />
			</AccordionPanel>
		</AccordionItem>
	);
};
export default Passenger;
