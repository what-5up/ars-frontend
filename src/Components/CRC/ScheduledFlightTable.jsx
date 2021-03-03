import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { getRoutes } from "../../api/route-api";
import { getAircrafts } from "../../api/aircraft-api";
import UpdateModal from "./UpdateModal";
import AddDelayModel from "./AddDelayModal";
import DeleteModal from "./DeleteModal";

const getTimeString = (d) => {
  let date = new Date(d);
  let time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  let day = date.toLocaleDateString();
  return `${day} ${time}`;
};

const ScheduledFlightTable = ({
  content,
  tableCaption,
  handleNew,
  handleUpdate,
  handleDelete,
  handleAddDelay,
}) => {
  const [routes, setRoutes] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);
  useEffect(async () => {
    var routs = await getRoutes();
    routs = routs.data || [];
    setRoutes(routs);
    var aircrfts = await getAircrafts();
    aircrfts = aircrfts.data || [];
    setAircrafts(aircrfts);
  }, []);
  const getRouteString = (id) => {
    var rout = routes.find((x) => x.id === id);
    return rout
      ? `${rout.id} ${rout.origin_code} -> ${rout.destination_code}`
      : id;
  };
  const getAircraftString = (id) => {
    var aircraft = aircrafts.find((x) => x.id === id);
    return aircraft ? `ID: ${aircraft.id}, Model: ${aircraft.model_name}` : id;
  };
  return (
    <>
      <UpdateModal values={{}} handleUpdate={handleNew} forNew={true} />
      <Table mt={5} variant="striped" colorScheme="gray">
        <TableCaption>{tableCaption}</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Route ID</Th>
            <Th>Assigned AircraftID</Th>
            <Th>Departure</Th>
            <Th>Arrival</Th>
            <Th>Delayed Departure</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {content.map((row) => {
            return (
              <Tr key={row.id}>
                <Td>{row.id}</Td>
                <Td>{getRouteString(row.route)}</Td>
                <Td>{getAircraftString(row.assignedAircraftId)}</Td>
                <Td>{getTimeString(row.departure)}</Td>
                <Td>{row.arrival ? getTimeString(row.arrival) : null}</Td>
                <Td>
                  {row.delayedDeparture
                    ? getTimeString(row.delayedDeparture)
                    : null}
                </Td>
                <Td>
                  <AddDelayModel
                    id={row.id}
                    values={row}
                    handleUpdate={handleAddDelay}
                  />
                </Td>
                <Td>
                  <UpdateModal values={row} handleUpdate={handleUpdate} />
                </Td>
                <Td>
                  <DeleteModal id={row.id} handleDelete={handleDelete} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default ScheduledFlightTable;
