import React, { Component } from 'react';

import {
	Flex,
	Heading,
	Text,
	Divider,
	Table,
	Thead,
	Tr,
	Tbody,
	Th,
	Td,
	VStack,
	HStack,
	Spinner,
	Tfoot,
	Spacer,
	Box,
	Button,
	Container,
} from '@chakra-ui/react';
import SeatPicker from '../../Components/SeatPicker';

import { getSeatMap } from '../../api';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import PassengerFlight from '../../Components/Cards/PassengerFlight';
import { formatPrice } from '../../utils/helpers';
import { withRouter } from 'react-router-dom';

class SeatMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			passengers: props.passengers,
			passengerPointer: props.passengers[0].id,
			unassigned: props.passengers.map((p) => {
				return p.id;
			}),
			flight: this.props.flight,
			loading: true,
			maxRows: null,
			maxColumns: null,
			map: [],
		};
	}

	componentDidMount() {
		getSeatMap(this.props.flightID).then((input) => {
			if (input.data)
				this.setState({
					maxRows: input.data.maxRows,
					maxColumns: input.data.maxColumns,
					map: input.data.seatMap,
				});
			this.setState({ loading: false });
		});
		console.log(this.state.passengers);
	}

	nextChar = (c) => {
		return String.fromCharCode(c.charCodeAt(0) + 1);
	};

	generateMap = () => {
		var seatMap = [...this.state.map];
		var map = [];

		for (var i = 0; i < this.state.maxRows; i++) {
			map[i] = [];
			var column = 'A';
			for (var j = 0; j < this.state.maxColumns; j++) {
				var pointer = i + 1 + column;
				if (seatMap.length > 0 && seatMap[0].seat_number === pointer) {
					var seat = seatMap.shift();
					map[i][j] = {
						id: seat.id,
						number: seat.seat_number,
						isUnavailable: seat.class !== this.props.class,
						isReserved: seat.is_reserved,
						tooltip:
							seat.class !== this.props.class
								? seat.class
								: seat.is_reserved
								? 'Reserved'
								: `${seat.class} Rs.${seat.amount}`,
					};
				} else {
					map[i][j] = null;
				}
				column = this.nextChar(column);
			}
		}
		return map;
	};

	assignSeatToPassenger = (passengerID, seatID, seatNumber) => {
		const passengerIndex = this.state.passengers.findIndex((passenger) => {
			return passenger.id === passengerID;
		});

		const passenger = {
			...this.state.passengers[passengerIndex],
		};

		const seatIndex = this.state.map.findIndex((seat) => {
			return seat.id === seatID;
		});

		passenger.seatID = seatID;
		passenger.seatNumber = seatNumber;
		passenger.class = this.state.map[seatIndex].class;
		passenger.amount = this.state.map[seatIndex].amount;

		const passengers = [...this.state.passengers];
		passengers[passengerIndex] = passenger;

		this.setState({ passengers: passengers });

		console.log(`Assigned seat ${seatNumber} to ${passenger.first_name} ${passenger.last_name}`);

		const unassigned = [...this.state.unassigned];
		const index = unassigned.indexOf(this.state.passengerPointer);
		if (index > -1) {
			unassigned.splice(index, 1);
		}
		this.setState({
			unassigned: unassigned,
			passengerPointer: unassigned[0],
		});
	};

	removeSeatFromPassenger = (seatID) => {
		const passengerIndex = this.state.passengers.findIndex((passenger) => {
			return passenger.seatID === seatID;
		});

		const passenger = {
			...this.state.passengers[passengerIndex],
		};

		passenger.seatID = null;
		passenger.seatNumber = null;
		passenger.class = null;
		passenger.amount = null;

		const passengers = [...this.state.passengers];
		passengers[passengerIndex] = passenger;

		this.setState({ passengers: passengers });

		console.log(`Removed seat from ${passenger.first_name} ${passenger.last_name}`);

		const unassigned = [...this.state.unassigned];
		unassigned.push(passenger.id);
		unassigned.sort((a, b) => {
			return a - b;
		});

		this.setState({
			unassigned: unassigned,
			passengerPointer: unassigned[0],
		});
	};

	addSeatCallback = ({ row, number, id }, addCb) => {
		this.setState(async () => {
			this.assignSeatToPassenger(this.state.passengerPointer, id, number);
			addCb(row, number, id);
		});
	};

	removeSeatCallback = ({ row, number, id }, removeCb) => {
		this.setState(async () => {
			this.removeSeatFromPassenger(id);
			removeCb(row, number);
		});
	};

	//TODO: Implement onClick of Continue button
	handleContinue = () => {
		this.props.history.push('/costsummary', {
			passengers: this.state.passengers,
			flight: this.state.flight,
			totalCost: this.state.passengers.reduce((total, p) => total + p.amount, 0),
		});
	};

	render() {
		let passengerTable = <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />;
		let seatMap = <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />;
		let classPrice = null;
		if (!this.state.loading) {
			passengerTable = [
				<Container overflowY="scroll" maxHeight="220px" w="100%" p={0} m={0}>
					<Table variant="simple">
						<Thead>
							<Tr>
								<Th bg="white" position="sticky" top={0}>
									Passenger
								</Th>
								<Th bg="white" position="sticky" top={0}>
									Seat Number
								</Th>
							</Tr>
						</Thead>

						<Tbody>
							{this.state.passengers.map((p) => {
								let style =
									this.state.passengerPointer === p.id
										? this.props.colorMode === 'light'
											? { backgroundColor: '#e9ecef', fontWeight: 'bold' }
											: { backgroundColor: '#000028', fontWeight: 'bold' }
										: {};
								return (
									<Tr key={p.id} style={style}>
										<Td>{`${p.first_name} ${p.last_name}`}</Td>
										<Td>{this.state.passengerPointer !== p.id ? p.seatNumber : 'Pick a seat'}</Td>
									</Tr>
								);
							})}
						</Tbody>
					</Table>
				</Container>,
				<HStack my={4} verticalAlign="bottom" bg="white" position="sticky" bottom={0}>
					<Divider orientation="vertical" />
					<Text fontWeight="bold" color="grey">
						Total Price:{' '}
					</Text>
					<Heading fontSize="18px">
						{this.state.unassigned.length === 0
							? formatPrice(this.state.passengers.reduce((total, p) => total + p.amount, 0))
							: null}
					</Heading>
				</HStack>,
			];

			seatMap = (
				<div>
					<SeatPicker
						addSeatCallback={this.addSeatCallback}
						removeSeatCallback={this.removeSeatCallback}
						rows={this.generateMap()}
						visible
						maxReservableSeats={this.state.passengers.length}
						selectedByDefault
						tooltipProps={{ multiline: true }}
						style={{ width: '100%' }}
					/>
				</div>
			);

			classPrice = (
				<VStack justifyContent="left" align="left">
					<HStack verticalAlign="bottom">
						<Divider orientation="vertical" />
						<Text fontWeight="bold" color="grey">
							Class:{' '}
						</Text>
						<Heading fontSize="18px">{this.props.class}</Heading>
					</HStack>
					<HStack>
						<Divider orientation="vertical" />
						<Text fontWeight="bold" color="grey">
							Price:{' '}
						</Text>
						<Heading fontSize="17px">{formatPrice(this.props.price)}</Heading>
					</HStack>
				</VStack>
			);
		}

		return (
			<Flex flexDirection="column" w="100%" mx="auto" justifyContent="center">
				<Flex justifyContent="center" my="5">
					<Heading>Reserve Your Seats</Heading>
				</Flex>
				<HStack h="100%">
					<Flex w="36%" justifyContent="center">
						{seatMap}
					</Flex>
					<Divider orientation="vertical" />
					<VStack w="32%" align="left">
						{classPrice}
						<Box h={2} />
						<Divider />
						{passengerTable}
					</VStack>
					<Divider orientation="vertical" />
					<VStack w="32%" spacing={8} justify="right">
						<PassengerFlight {...this.state.flight}/>
						<Spacer />
						<Button
							size="lg"
							w="80%"
							colorScheme="purple"
							isDisabled={this.state.unassigned.length !== 0}
							onClick={this.handleContinue}
						>
							Continue
						</Button>
					</VStack>
				</HStack>
			</Flex>
		);
	}
}

export default withRouter(withErrorHandler(SeatMap));
