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

const FilterComponent = ({ handleRouteChange, handleDateSelect }) => {
    const [routes, setRoutes] = useState([]);
    const [route, setRoute] = useState("all");
    const [dat, setDat] = useState(null)
    useEffect(async () => {
      var routs = await getRoutes();
      routs = routs.data || [];
      setRoutes(routs);
    }, []);
    const handleRouteSelect = (event) => {
      var value = event.target.value;
      if (value === "all") {
        value = '';
      }
      handleRouteChange(value);
      setRoute(value);
      setDat("mm/dd/yyyy");
    };
    const handleChange = (event) => {
      var value = event.target.value;
      handleDateSelect(value);
      setRoute('all');
      setDat(value)
    };
    return (
      <Box m={4} px={2}>
        <Flex direction="row" ml={3}>
          <Box flex="2" ml={3} h="100%">
            <InputGroup>
              <InputLeftAddon children="Route" />
              <Select placeholder={"Select Route"} onChange={handleRouteSelect} value={route}>
                <option value="all">All</option>
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
          <Box flex="2" ml={3} h="100%">
            <InputGroup>
              <InputLeftAddon children="Departure" />
              <Input
                type="date"
                name="departure"
                placeholder="Select"
                value={dat}
                onChange={(event) => handleChange(event)}
              />
            </InputGroup>
          </Box>
        </Flex>
      </Box>
    );
  };

  export default FilterComponent;