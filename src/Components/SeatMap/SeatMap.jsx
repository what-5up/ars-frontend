import React, { Component } from 'react'

import SeatPicker from 'react-seat-picker'

export default class SeatMap extends Component {
    state = {
        passengers: [],
        passengerPointer: null,
        unassigned: [],
    }

    constructor(props) {
        super(props)
        this.state = {
            passengers: props.passengers,
            passengerPointer: props.passengers[0].id,
            unassigned: props.passengers.map(p => { return p.id })
        }
    }

    assignSeatToPassenger = (passengerID, seatID, seatNumber) => {
        const passengerIndex = this.state.passengers.findIndex(passenger => {
            return passenger.id === passengerID;
        });

        const passenger = {
            ...this.state.passengers[passengerIndex]
        };

        passenger.seatID = seatID;
        passenger.seatNumber = seatNumber;

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
                unassigned : unassigned,
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

        const passengers = [...this.state.passengers];
        passengers[passengerIndex] = passenger;

        this.setState({ passengers: passengers });

        console.log(`Removed seat from ${passenger.first_name} ${passenger.last_name}`);

        const unassigned = [...this.state.unassigned];
        unassigned.push(passenger.id);
        unassigned.sort((a,b)=>{return a-b});

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
            removeCb(row, number, id);
        })
    }

    render() {
        const rows = [
            [null, { id: 1, number: "1B", isReserved: false, tooltip: "Platinum Rs.52000" }, { id: 2, number: "1C", isReserved: false, tooltip: "Platinum Rs.52000" }, null, { id: 3, number: "1E", isReserved: false, tooltip: "Platinum Rs.52000" }, { id: 4, number: "1F", isReserved: false, tooltip: "Platinum Rs.52000" }],
            [null, { id: 5, number: "2B", isReserved: true, tooltip: "Platinum Rs.52000" }, { id: 6, number: "2C", isReserved: false, tooltip: "Platinum Rs.52000" }, null, { id: 7, number: "2E", isReserved: false, tooltip: "Platinum Rs.52000" }, { id: 8, number: "2F", isReserved: false, tooltip: "Platinum Rs.52000" }],
            [{ id: 8, number: "3A", isReserved: true, tooltip: "Platinum Rs.52000" }, { id: 9, number: "3B", isReserved: false, tooltip: "Platinum Rs.52000" }, { id: 10, number: "3C", isReserved: true, tooltip: "Platinum Rs.52000" }, null, { id: 7, number: "3E", isReserved: true, tooltip: "Platinum Rs.52000" }, { id: 8, number: "3F", isReserved: false, tooltip: "Platinum Rs.52000" }, { id: 8, number: "3G", isReserved: false, tooltip: "Platinum Rs.52000" }],
            [{ id: 19, number: "4A", isReserved: false, tooltip: "Platinum Rs.52000" }, { id: 5, number: "4B", isReserved: false, tooltip: "Platinum Rs.52000" }, { id: 6, number: "4C", isReserved: false, tooltip: "Platinum Rs.52000" }, null, { id: 7, number: "4E", isReserved: false, tooltip: "Platinum Rs.52000" }, { id: 8, number: "4F", isReserved: false, tooltip: "Platinum Rs.52000" }, { id: 8, number: "4G", isReserved: false, tooltip: "Platinum Rs.52000" }],
            [{ id: 20, number: "5A", isReserved: false, tooltip: "Platinum Rs.52000" }, { id: 5, number: "5B", isReserved: false, tooltip: "Platinum Rs.52000" }, { id: 6, number: "5C", isReserved: false, tooltip: "Platinum Rs.52000" }, null, { id: 7, number: "5E", isReserved: true, tooltip: "Platinum Rs.52000" }, { id: 8, number: "5F", isReserved: true, tooltip: "Platinum Rs.52000" }, { id: 8, number: "5G", isReserved: false, tooltip: "Platinum Rs.52000" }]
        ]
        
        return (
            <div>
                <h1>Passengers</h1>
                {this.state.passengers.map(p => {
                    return <p>{p.first_name} {p.last_name} ==== Seat Number: {p.seatNumber}</p>
                })}
                <h1>Seat Picker</h1>
                <div style={{ marginTop: '100px' }}>
                    <SeatPicker
                        addSeatCallback={this.addSeatCallback}
                        removeSeatCallback={this.removeSeatCallback}
                        rows={rows}
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