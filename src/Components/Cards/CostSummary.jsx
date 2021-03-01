import {
	Box,
	Button,
	Heading,
	Text,
	VStack,
	Flex,
	Divider,
} from '@chakra-ui/react';
import PaymentIcon from '@material-ui/icons/Payment';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import { WatchLater } from '@material-ui/icons';
import {} from '../../utils/helpers'

const CostSummary = ({ origin_code, destination_code, day, time }) => {
	return (
		<Flex flexDirection="column" w="50%" justifyContent="center" mx="auto">
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
			<Flex mb="3" justifyContent="space-between">
				<Box>
					<Text fontSize="2xl">Passengers </Text>
				</Box>
				<Box>
					<Text fontSize="2xl">2</Text>
				</Box>
			</Flex>
			<Flex mb="3" justifyContent="space-between">
				<Box>
					<Text fontSize="2xl">Flight </Text>
				</Box>
				<Box>
					<Text fontSize="2xl">Price </Text>
				</Box>
			</Flex>
			<Flex mb="3" justifyContent="space-between">
				<Box>
					<Text fontSize="2xl">Discount </Text>
				</Box>
				<Box>
					<Text fontSize="2xl">Price </Text>
				</Box>
			</Flex>
			<Flex mt="2">
				<Divider borderBottomWidth="2px" />
			</Flex>
			<Flex justifyContent="space-between" mt="3" mb="3">
				<Box>
					<Text fontSize="2xl">Total </Text>
				</Box>
				<Box>
					<Text fontSize="2xl">Price </Text>
				</Box>
			</Flex>
			<Flex mb="3" justifyContent="center">
				<Button colorScheme="teal" width="60%" leftIcon={<WatchLater />} textAlign="center">
					Hold
				</Button>
			</Flex>
			<Flex mb="3" justifyContent="center">
				<Button colorScheme="teal" width="60%" leftIcon={<PaymentIcon />}>
					Pay Now
				</Button>
			</Flex>
			<Flex mb="3" justifyContent="center">
				<Button colorScheme="teal" width="60%">
					Cancel
				</Button>
			</Flex>
		</Flex>
	);
};

export default CostSummary;
