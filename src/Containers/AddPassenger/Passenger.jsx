import React, { useState, useEffect } from 'react';
import {
	Flex,
	Button,
	Accordion,
	AccordionButton,
	AccordionItem,
	Box,
	AccordionIcon,
	AccordionPanel,
	Heading,
} from '@chakra-ui/react';
import AddPassenger from '../../Components/Cards/AddPassenger';
import {addOrUpdateArray} from '../../utils/helpers';
import { useLocation, useHistory } from 'react-router-dom';
import {addPassengers} from '../../api/passenger-api'
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
	const history = useHistory();
	const handleClick = async() => {
		let res = await addPassengers({passengers:passengers})
		console.log(res);
		// history.push('/seatmap',{passengers:passengers, ...locationParams})
	}
	useEffect(async () => {
		let data = await fetchCountries();
		setCountries(data);
	}, []);
	const AddEmptyObject = () => {
		let len = passengers.length
		setPassengers([...[...passengers,{key:len}]])
	}
	const addOrUpdatePassengers = (obj) => {
		setPassengers([...addOrUpdateArray(passengers,obj)])
	}
	return (
		<Box width="80%" mx="auto">
			<Heading textAlign="center" mt="3">
				Add Passengers
			</Heading>
			<Flex justifyContent="flex-end" mx="6" mb="3">
				<Button mr="3" onClick={AddEmptyObject}>Add More</Button>
				<Button onClick={handleClick}>Continue</Button>
			</Flex>
			<Flex w="100%" justifyContent="center">
				{passengers.length === 0 ? (
					<AddPassenger initialValues ={{key:0}} addPassenger={addOrUpdatePassengers} countries={countries}/>
				) : (
					<Flex width="100%">
					<Accordion allowToggle w="100%">
						{passengers.map((item,index) => (
							<AccordionPart key={index} isExpanded={false} initialValues={item} addPassenger={addOrUpdatePassengers} countries={countries}/>
						))}
					</Accordion>
					</Flex>
				)}
			</Flex>
		</Box>
	);
};

const AccordionPart = ({initialValues, addPassenger, countries}) => {
	return (
		<AccordionItem isExpanded={false} >
			<h2>
				<AccordionButton>
					<Box flex="1" textAlign="left">
						{'firstn_ame' in initialValues && 'last_name' in initialValues ?`${initialValues.first_name} ${initialValues.last_name}`:'' }
					</Box>
					<AccordionIcon />
				</AccordionButton>
			</h2>
			<AccordionPanel pb={4}>
				<AddPassenger initialValues = {initialValues} addPassenger={addPassenger} countries={countries}/>
			</AccordionPanel>
		</AccordionItem>
	);
};
export default Passenger;
