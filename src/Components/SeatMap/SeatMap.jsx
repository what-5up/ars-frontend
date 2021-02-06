import React, { Component } from 'react'

import SeatPicker from 'react-seat-picker'

export default class SeatMap extends Component {
    state = {
        passengers: [],
        passengerPointer: null,
        unassigned: [],
        maxRows: null,
        maxColumns: null,
        map: null
    }

    constructor(props) {
        super(props)

        //TODO: Get the seatmap using props.flightID and axios
        const input = {
            maxRows: 3,
            maxColumns: 4,
            map: [
                { id: 1, number: "1B", class: "Platinum", price: 520000, reserved: true }, { id: 2, number: "1C", class: "Platinum", price: 520000, reserved: false },
                { id: 3, number: "2B", class: "Business", price: 340000, reserved: false }, { id: 4, number: "2C", class: "Business", price: 340000, reserved: true },
                { id: 5, number: "3A", class: "Economy", price: 180000, reserved: true }, { id: 6, number: "3B", class: "Economy", price: 180000, reserved: false },
                { id: 7, number: "3C", class: "Economy", price: 180000, reserved: false }, { id: 8, number: "3D", class: "Economy", price: 180000, reserved: false },
            ],
        };

        this.state = {
            passengers: props.passengers,
            passengerPointer: props.passengers[0].id,
            unassigned: props.passengers.map(p => { return p.id }),
            maxRows: input.maxRows,
            maxColumns: input.maxColumns,
            map: input.map
        }
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
                if (seatMap[0].number === pointer) {
                    var seat = seatMap.shift();
                    map[i][j] = {
                        id: seat.id,
                        number: seat.number,
                        isReserved: seat.reserved,
                        tooltip: seat.reserved ? "Reserved" : `${seat.class} Rs.${seat.price}`
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
        passenger.price = this.state.map[seatIndex].price;

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
        passenger.price = null;

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
        return (
            <div>
                <h1>Passengers</h1>
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
                            <td>{p.price}</td>
                        </tr>
                    })}
                </table>
                <h2>Total Price = {this.state.unassigned.length === 0 ? "Rs. " + this.state.passengers.reduce(((total, p) => total + p.price), 0) : null}</h2>
                <h1>Seat Picker</h1>
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
            </div>
        )
    }
}