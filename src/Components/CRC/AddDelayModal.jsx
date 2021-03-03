import React, { useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { updateScheduledFlight } from "../../api/scheduled-flight-api";

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

export default AddDelayModel;
