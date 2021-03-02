import {
	Box,
	Button,
	Center,
	Grid,
	GridItem,
	Heading,
	Image,
	Text,
	VStack,
	Stat,
	StatLabel,
	StatNumber,
	Flex,
	Spacer,
} from '@chakra-ui/react';
import Fab from '@material-ui/core/Fab';
import FlightIcon from '@material-ui/icons/Flight';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';

const FlightCard = ({
	id,
	origin,
	destination,
	departure,
	origin_code,
	destination_code,
	bookFlight,
	prices,
	setTravellerClass,
}) => {
	let date = new Date(departure);
	let time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	let day = date.toLocaleDateString();
	return (
		<Box boxShadow="xl" borderRadius="10px" m="10px" p="8px">
			<Grid h="210px" w="80vw" templateRows="repeat(2, 1fr)" templateColumns="repeat(20, 1fr)" gap={2}>
				<GridItem rowSpan={2} colSpan={3}>
					<Box pt={4}>
						<VStack spacing={-0.5}>
							<FlightTakeoffIcon style={{ fontSize: 40 }} />
							{/* <Text color="gray.500">{origin}</Text> */}
							<Heading pt={0}>{origin_code}</Heading>
							<Text color="gray.500">{day}</Text>
							<Text color="gray.500">{time}</Text>
						</VStack>
					</Box>
				</GridItem>
				<GridItem rowSpan={2} colSpan={4}>
					<Box w={{ base: '80%', sm: '60%', md: '50%' }} mb={{ base: 12, md: 0 }}>
						<Image src={'/images/flight-icon.png'} size="100%" rounded="1rem" alt="flight image" />
					</Box>
				</GridItem>
				<GridItem rowSpan={2} colSpan={3}>
					<Box pt={4}>
						<VStack spacing={-0.5}>
							<FlightLandIcon style={{ fontSize: 40 }} />
							{/* <Text color="gray.500">{destination}</Text> */}
							<Heading pt={0}>{destination_code}</Heading>
							<Text color="gray.500">10.10 am</Text>
							<Text color="gray.500">June 20, 2021</Text>
						</VStack>
					</Box>
				</GridItem>
				<GridItem rowSpan={1} colSpan={10} mb={0}>
					<Box justifyItems="flex-end">
						{prices.map((item) => {
							return (
								<Button
									onClick={(event) => {
										let selectedClass = event.target.closest('.travellerClass');
										if (selectedClass && selectedClass.id != null) {
											setTravellerClass(selectedClass.id.split('_')[1]);
										}
									}}
									boxShadow="xl"
									borderRadius="10px"
									m="10px"
									p="6"
									cursor="pointer"
									minHeight ="100px"
								>
									<Box className="travellerClass" id={`${id}_${item.class}`}>
										<Stat>
											<StatLabel>{item.class.toUpperCase()}</StatLabel>
											<StatNumber>{item.amount}</StatNumber>
										</Stat>
										<Spacer />
									</Box>
								</Button>
							);
						})}
					</Box>
				</GridItem>
				<GridItem rowSpan={1} colSpan={10}>
					<Box align="center" justifyItems="center">
						<Button
							bg="transparent"
							size="lg"
							_hover={{ bg: 'trasparent' }}
							onClick={() => {
								bookFlight(id);
							}}
						>
							<Fab color="primary" variant="extended">
								<FlightIcon />
								<Text mx={2}>Book This Flight</Text>
							</Fab>
						</Button>
					</Box>
				</GridItem>
			</Grid>
		</Box>
	);
};

export default FlightCard;
