import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
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
} from "@chakra-ui/react";
import CreateIcon from "@material-ui/icons/Create";
import AddIcon from "@material-ui/icons/Add";
import { getRoutes } from "../../api/route-api";
import { getAircrafts } from "../../api/aircraft-api";
import {
  updateScheduledFlight,
  addScheduledFlight,
} from "../../api/scheduled-flight-api";

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

export default UpdateModal;
