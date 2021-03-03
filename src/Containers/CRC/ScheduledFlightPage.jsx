import React, { useState, useEffect } from "react";
import { Heading, Box } from "@chakra-ui/react";
import { getDetailedScheduledFlights } from "../../api/scheduled-flight-api";
import ScheduledFlightTable from "../../Components/CRC/ScheduledFlightTable";
import FilterComponent from "../../Components/CRC/FilterComponent";

const ScheduledFlightPage = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  useEffect(async () => {
    var response = await getDetailedScheduledFlights();
    var data = response.data || [];
    setFetchedData(data);
    setDataToShow(data);
  }, []);
  const handleDelete = (id) => {
    var newData = fetchedData.filter((row) => row.id !== id);
    setFetchedData(newData);
    setDataToShow(newData);
  };
  const handleNew = (newValues) => {
    var newData = fetchedData.concat(newValues);
    setFetchedData(newData);
    setDataToShow(newData);
  };
  const handleUpdate = (newValues) => {
    var newData = fetchedData.map((row) => {
      return newValues.id === row.id
        ? {
            id: row.id,
            route: newValues.route,
            departure: newValues.departure,
            arrival: newValues.arrival,
            assignedAircraftId: newValues.assignedAircraftId,
            delayedDeparture: row.delayedDeparture,
          }
        : row;
    });
    setFetchedData(newData);
    setDataToShow(newData);
  };
  const handleAddDelay = (newValues) => {
    var newData = fetchedData.map((row) => {
      return newValues.id === row.id
        ? {
            id: row.id,
            route: row.route,
            departure: row.departure,
            arrival: row.arrival,
            assignedAircraftId: row.assignedAircraftId,
            delayedDeparture: newValues.delayedDeparture,
          }
        : row;
    });
    setFetchedData(newData);
    setDataToShow(newData);
  };
  const handleRouteSelect = (value) => {
    if (value === "") {
      setDataToShow(fetchedData);
    } else {
      var newData = fetchedData.filter((row) => row.route == value);
      setDataToShow(newData);
    }
  };
  const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  const handleDateSelect = (value) => {
    if (value === "") {
      setDataToShow(fetchedData);
    } else {
      var newData = fetchedData.filter((row) =>
        datesAreOnSameDay(new Date(row.departure), new Date(value))
      );
      setDataToShow(newData);
    }
  };
  return (
    <Box m={4} px={4}>
      <Heading>Scheduled Flights</Heading>
      <FilterComponent
        handleRouteChange={handleRouteSelect}
        handleDateSelect={handleDateSelect}
      />
      <ScheduledFlightTable
        content={dataToShow}
        tableCaption={""}
        handleNew={handleNew}
        handleUpdate={handleUpdate}
        handleAddDelay={handleAddDelay}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default ScheduledFlightPage;
