import React from 'react';
import { Divider, Box, Heading, Text, VStack, Flex, Table, Thead, Tbody, Tr, Th, Td, TableCaption,Tfoot } from '@chakra-ui/react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const AddedPassengers = ({ origin_code, destination_code, departure }) => {
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
				height: '300px',
                justifyContent:'center'
			}}
		>
			<Flex mb={2} mt={3} mx="5">
				<Text fontSize="2xl">Added Passengers</Text>
			</Flex>
			<Flex mb={2} mt={3} mx="5">
				<Divider />
			</Flex>
			<Flex >
				<Table variant="simple">
					<TableCaption>passengers added in previous trips</TableCaption>
					<Thead>
						<Tr>
                            <Th></Th>
							<Th>First Name</Th>
							<Th>Last Name</Th>
							<Th isNumeric>Birthday</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td><AddCircleOutlineIcon/></Td>
							<Td>millimetres (mm)</Td>
							<Td>millimetres (mm)</Td>
							<Td isNumeric>25.4</Td>
						</Tr>
						<Tr>
							<Td><AddCircleOutlineIcon/></Td>
							<Td>centimetres (cm)</Td>
							<Td>centimetres (cm)</Td>
							<Td isNumeric>30.48</Td>
						</Tr>
						<Tr>
							<Td><AddCircleOutlineIcon/></Td>
							<Td>metres (m)</Td>
							<Td>metres (m)</Td>
							<Td isNumeric>0.91444</Td>
						</Tr>
					</Tbody>
				</Table>
			</Flex>
			<Flex>
				<Divider />
			</Flex>
		</Box>
	);
};
export default AddedPassengers;
