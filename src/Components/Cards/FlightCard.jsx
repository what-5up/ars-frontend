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
	Divider,
} from '@chakra-ui/react';
import Fab from '@material-ui/core/Fab';
import FlightIcon from '@material-ui/icons/Flight';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import airplane from '../../assets/img/airplane.png';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { getDateTime } from '../../utils/helpers';
const FlightCard = ({
	id,
	origin,
	destination,
	departure,
	arrival,
	origin_code,
	destination_code,
	bookFlight,
	prices,
	setTravellerClass,
}) => {
	departure = getDateTime(departure);
	arrival = getDateTime(arrival);
	return (
		<Box
			borderRadius="10px"
			m="10px"
			p="8px"
			style={{
				boxShadow: '0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)',
				minWidth: '80%',
			}}
		>
			<Grid h="210px" w="80vw" templateRows="repeat(2, 1fr)" templateColumns="repeat(20, 1fr)" gap={2}>
				<GridItem rowSpan={2} colSpan={3}>
					<Box pt={4}>
						<VStack spacing={-0.5}>
							<FlightTakeoffIcon style={{ fontSize: 40 }} />
							{/* <Text color="gray.500">{origin}</Text> */}
							<Heading pt={0}>{origin_code}</Heading>
							<Text color="gray.500">{departure.day}</Text>
							<Text color="gray.500">{departure.time}</Text>
						</VStack>
					</Box>
				</GridItem>
				<GridItem rowSpan={2} colSpan={4}>
					<Flex>
						<Flex alignItems="center" mb={{ base: 12, md: 0 }}>
							<MyLocationIcon />
							<Divider
								width="148px"
								backgroundColor="black"
								opacity="1"
								borderBottomWidth="2px"
								borderColor="black"
							/>
						</Flex>
						<Flex
							justifyContent="center"
							alignItems="center"
							w={{ base: '80%', sm: '60%', md: '50%' }}
							mx="auto"
							mb={{ base: 12, md: 0 }}
						>
							<Image src={airplane} height="70px" mt="3" rounded="1rem" alt="flight image" />
						</Flex>
						<Flex alignItems="center" mb={{ base: 12, md: 0 }}>
							<Divider
								width="148px"
								backgroundColor="black"
								opacity="1"
								borderBottomWidth="2px"
								borderColor="black"
							/>
							<LocationOnIcon />
						</Flex>
					</Flex>
				</GridItem>
				<GridItem rowSpan={2} colSpan={3}>
					<Box pt={4}>
						<VStack spacing={-0.5}>
							<FlightLandIcon style={{ fontSize: 40 }} />
							{/* <Text color="gray.500">{destination}</Text> */}
							<Heading pt={0}>{destination_code}</Heading>
							<Text color="gray.500">{arrival.day}</Text>
							<Text color="gray.500">{arrival.time}</Text>
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
									minHeight="100px"
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
