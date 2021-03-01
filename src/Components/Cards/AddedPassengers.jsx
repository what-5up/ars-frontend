import React from 'react';
import {
	Divider,
	Box,
	Heading,
	Text,
	VStack,
	Flex,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	Tfoot,
} from '@chakra-ui/react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const AddedPassengers = ({ passengers, id, addPassenger }) => {
	return (
		<Box
			p={2}
			width="80%"
			maxH="300px"
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
				justifyContent: 'center',
				overflow:'auto'
			}}
		>
			<Flex mb={2} mt={3} mx="5">
				<Text fontSize="2xl">Added Passengers</Text>
			</Flex>
			<Flex mb={2} mt={3} mx="5">
				<Divider />
			</Flex>
			<Flex>
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th></Th>
							<Th>First Name</Th>
							<Th>Last Name</Th>
						</Tr>
					</Thead>
					<Tbody>
						{passengers.map((item) => {
							return (
								<Tr>
									<Td cursor="pointer">
										<AddCircleOutlineIcon onClick= {() => addPassenger({...item,id:id, existing:true, currentID:item.id}) }/>
									</Td>
									<Td>{item.first_name}</Td>
									<Td>{item.last_name}</Td>
								</Tr>
							);
						})}
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
