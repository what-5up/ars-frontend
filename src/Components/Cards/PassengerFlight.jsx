import React from 'react';
import {
	Divider,
	Box,
	Heading,
	Text,
	VStack,
	Flex,
} from '@chakra-ui/react';

import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';

const PassengerFlight = ({ origin_code, destination_code, departure }) => {
	origin_code = 'BKK';
	destination_code = 'CNN';
	let date = new Date(departure);
	let time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	let day = date.toLocaleDateString();
	return (
		<Box
			p={2}
			width="80%"
			p={2}
			mx={3}
			boxShadow="xs"
			border="1px"
			borderColor="gray.200"
			borderRadius="0px"
			style={{
				boxShadow: '0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)',
				minWidth: '80%',
				maxHeight: '300px',
			}}
		>
			<Flex mb={2} mt={3} mx="5">
				<Text fontSize="2xl">Your trip review</Text>
			</Flex>
			<Flex mb={2} mt={3} mx="5">
				<Divider />
			</Flex>
			<Flex justifyContent="space-between">
				<Box pt={4} ml="5">
					<VStack spacing={-0.5}>
						<FlightTakeoffIcon style={{ fontSize: 40 }} />
						<Heading pt={0}>{origin_code}</Heading>
						<Text color="gray.500">{day}</Text>
						<Text color="gray.500">{time}</Text>
					</VStack>
				</Box>

				<Box pt={4} mr="5">
					<VStack spacing={-0.5}>
						<FlightLandIcon style={{ fontSize: 40 }} />

						<Heading pt={0}>{destination_code}</Heading>
						<Text color="gray.500">10.10 am</Text>
						<Text color="gray.500">June 20, 2021</Text>
					</VStack>
				</Box>
			</Flex>
			<Flex>
				<Divider />
			</Flex>
		</Box>
	);
};
export default PassengerFlight;
