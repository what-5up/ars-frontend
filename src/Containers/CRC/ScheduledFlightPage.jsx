import React, { useState, useEffect } from "react";
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Button,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  InputGroup,
  Input,
  FormLabel,
  InputLeftAddon,
  Select,
} from "@chakra-ui/react";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import ScheduleIcon from "@material-ui/icons/Schedule";
import AddIcon from "@material-ui/icons/Add";
import { getRoutes } from "../../api/route-api";
import { getAircrafts } from "../../api/aircraft-api";

const ScheduledFlightPage = () => {
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    // TODO: fetch account types
    // format is
    // {
    //   id: ,
    //   route: ,
    //   departure: ,
    //   assignedAircraftID: ,
    //   delayedDeparture: ,
    // }
    var dummy = [
      {
        id: 1,
        route: 12,
        departure: "new Date()",
        assignedAircraftID: 1,
        delayedDeparture: "new Date()",
      },
      {
        id: 2,
        route: 5,
        departure: "new Date()",
        assignedAircraftID: 7,
        delayedDeparture: "new Date()",
      },
      {
        id: 3,
        route: 5,
        departure: "new Date()",
        assignedAircraftID: 5,
        delayedDeparture: "new Date()",
      },
      {
        id: 4,
        route: 3,
        departure: "new Date()",
        assignedAircraftID: 9,
        delayedDeparture: "new Date()",
      },
    ];
    setFetchedData(dummy);
  }, []);
  const handleDelete = (id) => {
    //   TODO: send delete to backend
    var newData = fetchedData.filter((row) => row.id !== id);
    setFetchedData(newData);
  };
  const handleNew = (newValues) => {
    // TODO: send data to backend
    // format is
    // {
    //   id: ,
    //   route: ,
    //   departure: ,
    //   assignedAircraftID: ,
    //   delayedDeparture: ,
    // }
    // TODO: need scheduled id from backend
    var newData = fetchedData.concat(newValues);
    setFetchedData(newData);
  };
  const handleUpdate = (newValues) => {
    //   TODO: send data to backend
    // format is
    // {
    //   id: ,
    //   route: ,
    //   departure: ,
    //   assignedAircraftID: ,
    //   delayedDeparture: ,
    // }
    var newData = fetchedData.map((row) => {
      return newValues.id === row.id
        ? {
            id: row.id,
            route: newValues.route,
            departure: newValues.departure,
            assignedAircraftID: newValues.assignedAircraftID,
            delayedDeparture: row.delayedDeparture,
          }
        : row;
    });
    setFetchedData(newData);
  };
  const handleAddDelay = (newValues) => {
    //   TODO: send data to backend
    // format is
    // {
    //   id: ,
    //   route: ,
    //   departure: ,
    //   assignedAircraftID: ,
    //   delayedDeparture: ,
    // }
    var newData = fetchedData.map((row) => {
      return newValues.id === row.id
        ? {
            id: row.id,
            route: row.route,
            departure: row.departure,
            assignedAircraftID: row.assignedAircraftID,
            delayedDeparture: newValues.delayedDeparture,
          }
        : row;
    });
    setFetchedData(newData);
  };
  return (
    <Box m={4} px={4}>
      <Heading>Scheduled Flights</Heading>
      <ScheduledFlightTable
        content={fetchedData}
        tableCaption={""}
        handleNew={handleNew}
        handleUpdate={handleUpdate}
        handleAddDelay={handleAddDelay}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

const ScheduledFlightTable = ({
  content,
  tableCaption,
  handleNew,
  handleUpdate,
  handleDelete,
  handleAddDelay,
}) => {
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
                <Td>{row.route}</Td>
                <Td>{row.assignedAircraftID}</Td>
                <Td>{row.departure}</Td>
                <Td>{row.delayedDeparture}</Td>
                <Td>
                  <AddDelayModel values={row} handleUpdate={handleAddDelay} />
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
const UpdateModal = ({ values, handleUpdate, forNew }) => {
  const [routes, setRoutes] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);
  const [formValues, setFormValues] = useState(values);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(async () => {
    var routs = await getRoutes();
    routs = routs.data || [];
    setRoutes(routs);
    var aircrfts = await getAircrafts();
    aircrfts = aircrfts.data || [];
    setAircrafts(aircrfts);
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdate(formValues);
    onClose();
  };
  const handleChange = (event) => {
    var value = event.target.value;
    if (event.target.name === "departureDate") setSelectedDate(value);
    if (event.target.name === "departureTime") setSelectedTime(value);
    if (
      (selectedDate && event.target.name === "departureTime") ||
      (selectedTime && event.target.name === "departureDate")
    )
      setFormValues({
        ...formValues,
        departure: `${
          event.target.name === "departureTime" ? selectedDate : value
        } ${event.target.name === "departureDate" ? selectedTime : value}:00`,
      });
  };
  const handleRouteSelect = (event) => {
    var value = event.target.value;
    setFormValues({ ...formValues, route: value });
  };
  const handleAircraftSelect = (event) => {
    var value = event.target.value;
    setFormValues({ ...formValues, assignedAircraftID: value });
  };
  return (
    <div>
      {forNew ? (
        <Button colorScheme="teal" onClick={onOpen} m={4}>
          <AddIcon />
          <Text mx={2}>Add New Scheduled Flight</Text>
        </Button>
      ) : (
        <Button bg="transparent" _hover={{ bg: "trasparent" }} onClick={onOpen}>
          <CreateIcon />
          <Text mx={2}>Update</Text>
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {forNew ? "Add New Scheduled Flight" : "Update Scheduled Flight"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <InputGroup>
                  <InputLeftAddon children="Route" />
                  <Select
                    defaultValue={formValues.route}
                    placeholder={forNew ? "Select Route" : ""}
                    onChange={handleRouteSelect}
                  >
                    {routes.map((rout) => {
                      return (
                        <option
                          value={rout.id}
                        >{`${rout.id} ${rout.origin_code} -> ${rout.destination_code}`}</option>
                      );
                    })}
                  </Select>
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <InputGroup>
                  <InputLeftAddon children="Aircraft" />
                  <Select
                    defaultValue={formValues.assignedAircraftID}
                    placeholder={forNew ? "Select Aircraft" : ""}
                    onChange={handleAircraftSelect}
                  >
                    {aircrafts.map((aircraft) => {
                      return (
                        <option value={aircraft.id}>
                          {`ID: ${aircraft.id}, Model: ${aircraft.model_name}`}
                        </option>
                      );
                    })}
                  </Select>
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <InputGroup>
                  <InputLeftAddon children="Departure date" />
                  <Input
                    type="date"
                    name="departureDate"
                    placeholder="Select"
                    // value={formValues.departure}
                    onChange={(event) => handleChange(event)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <InputGroup>
                  <InputLeftAddon children="Departure time" />
                  <Input
                    type="time"
                    name="departureTime"
                    placeholder="Select"
                    onChange={(event) => handleChange(event)}
                  />
                </InputGroup>
              </FormControl>
              <Box my={4}>
                <Button colorScheme="red" onClick={onClose}>
                  <Text mx={2}>Cancel</Text>
                </Button>
                <Button colorScheme="teal" type="submit" mx={4}>
                  <Text mx={2}>Save</Text>
                </Button>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
const AddDelayModel = ({ values, handleUpdate }) => {
  const [formValues, setFormValues] = useState(values);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdate(formValues);
    onClose();
  };
  const handleChange = (event) => {
    var value = event.target.value;
    if (event.target.name === "delayedDepartureDate") setSelectedDate(value);
    if (event.target.name === "delayedDepartureTime") setSelectedTime(value);
    if (
      (selectedDate && event.target.name === "delayedDepartureTime") ||
      (selectedTime && event.target.name === "delayedDepartureDate")
    )
      setFormValues({
        ...formValues,
        delayedDeparture: `${
          event.target.name === "delayedDepartureTime" ? selectedDate : value
        } ${
          event.target.name === "delayedDepartureDate" ? selectedTime : value
        }:00`,
      });
  };
  return (
    <div>
      <Button bg="transparent" _hover={{ bg: "trasparent" }} onClick={onOpen}>
        <ScheduleIcon />
        <Text mx={2}>Mark Delayed</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mark Delayed</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl mt={4}>
                <InputGroup>
                  <InputLeftAddon children="Departure date" />
                  <Input
                    type="date"
                    name="delayedDepartureDate"
                    placeholder="Select"
                    // value={formValues.departure}
                    onChange={(event) => handleChange(event)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <InputGroup>
                  <InputLeftAddon children="Departure time" />
                  <Input
                    type="time"
                    name="delayedDepartureTime"
                    placeholder="Select"
                    onChange={(event) => handleChange(event)}
                  />
                </InputGroup>
              </FormControl>
              <Box my={4}>
                <Button colorScheme="red" onClick={onClose}>
                  <Text mx={2}>Cancel</Text>
                </Button>
                <Button colorScheme="teal" type="submit" mx={4}>
                  <Text mx={2}>Save</Text>
                </Button>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
const DeleteModal = ({ id, handleDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const handleYes = () => {
    handleDelete(id);
  };
  return (
    <div>
      <Button colorScheme="red" onClick={onOpen}>
        <DeleteIcon />
        <Text mx={2}>Delete</Text>
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Discard Account Type?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to discard this account type?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleYes}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ScheduledFlightPage;
