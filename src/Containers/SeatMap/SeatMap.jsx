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
	HStack,
	Spinner,
	Tfoot,
} from '@chakra-ui/react';
import SeatPicker from '../../Components/SeatPicker';

import { getSeatMap } from '../../api';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class SeatMap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            passengers: props.passengers,
            passengerPointer: props.passengers[0].id,
            unassigned: props.passengers.map(p => { return p.id }),
            flightID: props.flightID,
            loading: true,
            maxRows: null,
            maxColumns: null,
            map: []
        }
    }

    componentDidMount() {
        getSeatMap(this.state.flightID).then(input => {
            if (input.data)
                this.setState({
                    maxRows: input.data.maxRows,
                    maxColumns: input.data.maxColumns,
                    map: input.data.seatMap,      
                });
            this.setState({loading: false});
        }
        );
    }

    nextChar = (c) => {
        return String.fromCharCode(c.charCodeAt(0) + 1);
    }

    generateMap = () => {

        var seatMap = [...this.state.map];

        let className = 'Economy';

        var map = [];
        for (var i = 0; i < this.state.maxRows; i++) {
            map[i] = [];
            var column = 'A';
            for (var j = 0; j < this.state.maxColumns; j++) {
                var pointer = (i + 1) + column;
                if (seatMap.length > 0 && seatMap[0].seat_number === pointer) {
                    var seat = seatMap.shift();
                    map[i][j] = {
                        id: seat.id,
                        number: seat.seat_number,
                        isUnavailable: seat.class !== className,
                        isReserved: seat.is_reserved,
                        tooltip: seat.class !== className ? seat.class : seat.is_reserved ? "Reserved" :`${seat.class} Rs.${seat.amount}`
                    }
                } else {
                    map[i][j] = null;
                }
                column = this.nextChar(column);
            }
        }
        return map;
    }

    assignSeatToPassenger = (passengerID, seatID, seatNumber) => {
        const passengerIndex = this.state.passengers.findIndex(passenger => {
            return passenger.id === passengerID;
        });

        const passenger = {
            ...this.state.passengers[passengerIndex]
        };

        const seatIndex = this.state.map.findIndex(seat => {
            return seat.id === seatID;
        })

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
        this.setState(
            {
                unassigned: unassigned,
                passengerPointer: unassigned[0]
            }
        );
    }

    removeSeatFromPassenger = (seatID) => {
        const passengerIndex = this.state.passengers.findIndex(passenger => {
            return passenger.seatID === seatID;
        });

        const passenger = {
            ...this.state.passengers[passengerIndex]
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
        unassigned.sort((a, b) => { return a - b });

        this.setState({
            unassigned: unassigned,
            passengerPointer: unassigned[0]
        });
    }

    addSeatCallback = ({ row, number, id }, addCb) => {
        this.setState(async () => {
            this.assignSeatToPassenger(this.state.passengerPointer, id, number);
            addCb(row, number, id);
        })
    }

    removeSeatCallback = ({ row, number, id }, removeCb) => {
        this.setState(async () => {
            this.removeSeatFromPassenger(id);
            removeCb(row, number);
        })
    }

    render() {
		let passengerTable = <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />;
		let seatMap = <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />;
		if (!this.state.loading) {
			passengerTable = (
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>First Name</Th>
							<Th>Last Name</Th>
							<Th>Seat Number</Th>
							<Th>Class</Th>
							<Th>Price (Rs.)</Th>
						</Tr>
					</Thead>
					<Tbody>
						{this.state.passengers.map((p) => {
							let style =
								this.state.passengerPointer === p.id
									? { backgroundColor: '#e9ecef', fontWeight: 'bold' }
									: {};
							return (
								<Tr key={p.id} style={style}>
									<Td>{p.first_name}</Td>
									<Td>{p.last_name}</Td>
									<Td>{p.seatNumber}</Td>
									<Td>{p.class}</Td>
									<Td>{p.amount}</Td>
								</Tr>
							);
						})}
					</Tbody>
					<Tfoot>
						<Tr>
							<Th>Total Price</Th>
							<Th></Th>
							<Th isNumeric>
								{this.state.unassigned.length === 0
									? 'Rs. ' + this.state.passengers.reduce((total, p) => total + p.amount, 0)
									: null}
							</Th>
						</Tr>
					</Tfoot>
				</Table>
			);

			seatMap = (
				<div style={{ marginTop: '30px', width:"100%" }}>
					<SeatPicker
						addSeatCallback={this.addSeatCallback}
						removeSeatCallback={this.removeSeatCallback}
						rows={this.generateMap()}
						visible
						maxReservableSeats={this.state.passengers.length}
						selectedByDefault
						tooltipProps={{ multiline: true }}
                        style= {{width:"100%"}}
					/>
				</div>
			);
		}

		return (
			<Flex flexDirection="column" w="90%" mx="auto" justifyContent="center" >
				<Flex justifyContent="center" my="5">
					<Heading >Seat Map</Heading>
				</Flex>
				<Flex>
					<Flex w="50%">{seatMap}</Flex>
                    <Flex w="50%" justifyContent="center">
						{passengerTable}
					</Flex>
				</Flex>
			</Flex>
		);
	}
}

export default withErrorHandler(SeatMap);
