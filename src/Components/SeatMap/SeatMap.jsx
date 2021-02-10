import React, { Component } from 'react'

import SeatPicker from 'react-seat-picker'
import { Spinner } from "@chakra-ui/react";

import { getSeatMap } from '../../api';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

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
                    loading: false
                });
        }
        );
    }

    nextChar = (c) => {
        return String.fromCharCode(c.charCodeAt(0) + 1);
    }

    generateMap = () => {

        var seatMap = [...this.state.map];

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
                        isReserved: seat.is_reserved,
                        tooltip: seat.is_reserved ? "Reserved" : `${seat.class} Rs.${seat.amount}`
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
        let passengerTable = <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
        />
        let seatMap = <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
        />
        if (!this.state.loading) {
            passengerTable =
                <table width="75%" align>
                    <tr align="left">
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Seat Number</th>
                        <th>Class</th>
                        <th>Price (Rs.)</th>
                    </tr>
                    {this.state.passengers.map(p => {
                        return <tr key={p.id}>
                            <td>{p.first_name} {this.state.passengerPointer === p.id ? "***" : null}</td>
                            <td>{p.last_name}</td>
                            <td>{p.seatNumber}</td>
                            <td>{p.class}</td>
                            <td>{p.amount}</td>
                        </tr>
                    })}
                </table>;

            seatMap =
                <div style={{ marginTop: '30px' }}>
                    <SeatPicker
                        addSeatCallback={this.addSeatCallback}
                        removeSeatCallback={this.removeSeatCallback}
                        rows={this.generateMap()}
                        visible
                        maxReservableSeats={this.state.passengers.length}
                        selectedByDefault
                        tooltipProps={{ multiline: true }}
                    />
                </div>
        }

        return (
            <div>
                <h1>Passengers</h1>
                {passengerTable}
                <h2>Total Price = {this.state.unassigned.length === 0 ? "Rs. " + this.state.passengers.reduce(((total, p) => total + p.amount), 0) : null}</h2>
                <h1>Seat Picker</h1>
                {seatMap}
            </div>
        )
    }
}

export default withErrorHandler(SeatMap);