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
  InputLeftAddon,
  Select,
  useToast,
  Flex,
} from "@chakra-ui/react";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import ScheduleIcon from "@material-ui/icons/Schedule";
import AddIcon from "@material-ui/icons/Add";
import { getRoutes } from "../../api/route-api";
import { getAircrafts } from "../../api/aircraft-api";
import {
  getDetailedScheduledFlights,
  deleteScheduledFlight,
  updateScheduledFlight,
  addScheduledFlight,
} from "../../api/scheduled-flight-api";

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
    if (value === '') {
      setDataToShow(fetchedData);
    } else {
      var newData = fetchedData.filter((row) => row.route == value);
      setDataToShow(newData);
    }
  };
  return (
    <Box m={4} px={4}>
      <Heading>Scheduled Flights</Heading>
      <FilterComponent handleRouteChange={handleRouteSelect} />
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
                <Td>{row.route}</Td>
                <Td>{row.assignedAircraftId}</Td>
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

const FilterComponent = ({ handleRouteChange }) => {
  const [routes, setRoutes] = useState([]);
  useEffect(async () => {
    var routs = await getRoutes();
    routs = routs.data || [];
    setRoutes(routs);
  }, []);
  const handleRouteSelect = (event) => {
    var value = event.target.value;
    handleRouteChange(value);
  };
  return (
    <Box m={4} px={2}>
      <Flex direction="row" ml={3}>
        <Box flex="2" ml={3} h="100%">
          <InputGroup>
            <InputLeftAddon children="Route" />
            <Select placeholder={"Select Route"} onChange={handleRouteSelect}>
              {routes.map((rout) => {
                return (
                  <option
                    value={rout.id}
                  >{`${rout.id} ${rout.origin_code} -> ${rout.destination_code}`}</option>
                );
              })}
            </Select>
          </InputGroup>
        </Box>
        <Box flex="2" ml={3} h="100%"></Box>
      </Flex>
    </Box>
  );
};

const UpdateModal = ({ values, handleUpdate, forNew }) => {
  const toast = useToast();
  const [routes, setRoutes] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);
  let departureDate = new Date(values.departure);
  let departureTime = departureDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  let departureDay = departureDate.toLocaleDateString();
  let arrivalDt = new Date(values.arrival);
  let arrivalD = arrivalDt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  let arrivalT = arrivalDt.toLocaleDateString();
  const [formValues, setFormValues] = useState(values);
  const [selectedDate, setSelectedDate] = useState(departureDay);
  const [selectedTime, setSelectedTime] = useState(departureTime);
  const [arrivalDate, setArrivalDate] = useState(arrivalD);
  const [arrivalTime, setArrivalTime] = useState(arrivalT);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(async () => {
    var routs = await getRoutes();
    routs = routs.data || [];
    setRoutes(routs);
    var aircrfts = await getAircrafts();
    aircrfts = aircrfts.data || [];
    setAircrafts(aircrfts);
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    var dataToSend = {
      route: formValues.route,
      departure: formValues.departure,
      arrival: formValues.arrival,
      assignedAircraftId: formValues.assignedAircraftId,
    };
    if (forNew) {
      var response = await addScheduledFlight(dataToSend);
      console.log(response);
      if (response.message === "Added successfully") {
        toast({
          title: "New Scheduled Flight Added.",
          description: response.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        var newData = {
          ...dataToSend,
          id: response.data.id,
        };
        handleUpdate(newData);
        onClose();
      } else {
        toast({
          title: "An error occurred.",
          description: response.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      var response = await updateScheduledFlight(formValues.id, dataToSend);
      if (response.message === "Updated successfully") {
        handleUpdate(formValues);
        onClose();
        toast({
          title: "Schedule Updated.",
          description: response.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "An error occurred.",
          description: `Unable to delete schedule ${formValues.id}.`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };
  const handleChange = (event) => {
    var value = event.target.value;
    if (event.target.name === "departureDate") setSelectedDate(value);
    if (event.target.name === "departureTime") setSelectedTime(value);
    if (event.target.name === "arrivalDate") setArrivalDate(value);
    if (event.target.name === "arrivalTime") setArrivalTime(value);
    if (
      (selectedDate && event.target.name === "departureTime") ||
      (selectedTime && event.target.name === "departureDate")
    ) {
      setFormValues({
        ...formValues,
        departure: `${
          event.target.name === "departureTime" ? selectedDate : value
        } ${event.target.name === "departureDate" ? selectedTime : value}:00`,
      });
    }
    if (
      (arrivalDate && event.target.name === "arrivalTime") ||
      (arrivalTime && event.target.name === "arrivalDate")
    ) {
      setFormValues({
        ...formValues,
        arrival: `${
          event.target.name === "arrivalTime" ? arrivalDate : value
        } ${event.target.name === "arrivalDate" ? arrivalTime : value}:00`,
      });
    }
  };
  const handleRouteSelect = (event) => {
    var value = event.target.value;
    setFormValues({ ...formValues, route: value });
  };
  const handleAircraftSelect = (event) => {
    var value = event.target.value;
    setFormValues({ ...formValues, assignedAircraftId: value });
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
                    defaultValue={formValues.assignedAircraftId}
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
                    value={selectedDate}
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
                    value={selectedTime}
                    onChange={(event) => handleChange(event)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <InputGroup>
                  <InputLeftAddon children="Arrival date" />
                  <Input
                    type="date"
                    name="arrivalDate"
                    placeholder="Select"
                    value={arrivalDate}
                    onChange={(event) => handleChange(event)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <InputGroup>
                  <InputLeftAddon children="Arrival time" />
                  <Input
                    type="time"
                    name="arrivalTime"
                    placeholder="Select"
                    value={arrivalTime}
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
const AddDelayModel = ({ id, values, handleUpdate }) => {
  const toast = useToast();
  const [formValues, setFormValues] = useState(values);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = async (event) => {
    event.preventDefault();
    var response = await updateScheduledFlight(id, {
      delayedDeparture: formValues.delayedDeparture,
    });
    if (response.message === "Updated successfully") {
      handleUpdate(formValues);
      onClose();
      toast({
        title: "Schedule Updated.",
        description: response.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "An error occurred.",
        description: `Unable to delete schedule ${id}.`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
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
            <Text mx={2}>{values.route}</Text>
            <Text mx={2}>{`Scheduled Departure : ${new Date(
              values.departure
            ).toLocaleDateString()} ${new Date(
              values.departure
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`}</Text>
            <form onSubmit={handleSubmit}>
              <FormControl mt={4}>
                <InputGroup>
                  <InputLeftAddon children="Departure date" />
                  <Input
                    type="date"
                    name="delayedDepartureDate"
                    placeholder="Select"
                    value={selectedDate}
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
                    value={selectedTime}
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
  const toast = useToast();
  const handleYes = async () => {
    var response = await deleteScheduledFlight(id);
    if (response.message === "Scheduled flight deleted successfully") {
      handleDelete(id);
      onClose();
      toast({
        title: "Schedule Deleted.",
        description: response.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "An error occurred.",
        description: `Unable to delete schedule ${id}.`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    }
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
