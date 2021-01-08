import React, { Component } from "react";
import CrewScheduleCordinators from "./CrewScheduleCordinators/CrewScheduleCordinators";
import SalesRepresentatives from "./SalesReprentatives/SalesRepresentatives";

class Employees extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
        Employees
        <CrewScheduleCordinators />
        <SalesRepresentatives />
      </div>
    );
  }
}

export default Employees;
