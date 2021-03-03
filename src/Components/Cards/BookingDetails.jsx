import React from 'react';
import {
	Divider,
	Flex,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Text
} from '@chakra-ui/react';

const BookingDetails = ({ booking  }) => {
	return (
		<>
			<Flex mb={2} mx="5" maxHeight>
				<Text color="gray.500">{`Class: ${booking.class}`}</Text>
			</Flex>
			<Flex mb={2} mt={3} mx="5">
				<Divider />
			</Flex>
			<Flex mb="5">
				<Table variant="simple" p="5">
					<Thead>
						<Tr>
							<Th>First Name</Th>
							<Th>Last Name</Th>
							<Th>Seat Number</Th>
							<Th>Passport Number</Th>
						</Tr>
					</Thead>
					<Tbody>
						{booking.passengers.map((item) => {
							return (
								<Tr>
									<Td>{item.first_name}</Td>
									<Td>{item.last_name}</Td>
									<Td>{item.seat_number}</Td>
									<Td>{item.passport_no}</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</Flex>
			<Flex>
				<Divider />
			</Flex>
		</>
	);
};
export default BookingDetails;
