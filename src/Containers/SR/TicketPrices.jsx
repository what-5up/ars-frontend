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
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
import { Formik } from "formik";
import * as Yup from "yup";
import { getRoutes } from "../../api/route-api";

const TicketPrices = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [routes, setRoutes] = useState([]);
  const location = useLocation();
  const locationParams = location.state || { route: null };
  const [selectedRoute, setSelectedRoute] = useState(locationParams.route);
  useEffect(async () => {
    var routs = await getRoutes();
    routs = routs.data || [];
    setRoutes(routs);
    // TODO: fetch prices
    var dummy = [
      {
        id: 1,
        travellerClass: "A",
        price: 5000,
      },
      {
        id: 2,
        travellerClass: "B",
        price: 10000,
      },
      {
        id: 3,
        travellerClass: "C",
        price: 12000,
      },
    ];
    setFetchedData(dummy);
  }, []);
  const handleUpdate = (newValues) => {
    //   TODO: send data to backend
    var newData = fetchedData.map((priceData) => {
      return newValues.id === priceData.id ? newValues : priceData;
    });
    setFetchedData(newData);
  };
  const handleRouteSelect = (event) => {
    var value = event.target.value;
    setSelectedRoute(value);
  };
  return (
    <Box m={4} px={4}>
      <Heading>Prices</Heading>
      <InputGroup>
        <InputLeftAddon children="Route" />
        <Select
          defaultValue={selectedRoute}
		  value={selectedRoute}
          placeholder={"Select Route"}
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
      <PricesTable
        content={fetchedData}
        tableCaption={""}
        handleUpdate={handleUpdate}
      />
    </Box>
  );
};

const PricesTable = ({ content, tableCaption, handleUpdate }) => {
  return (
    <Table mt={5} variant="striped" colorScheme="gray">
      <TableCaption>{tableCaption}</TableCaption>
      <Thead>
        <Tr>
          <Th>Traveller Class</Th>
          <Th isNumeric>Price (Rs.)</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {content.map((row) => {
          return (
            <Tr key={row.id}>
              <Td>{row.travellerClass}</Td>
              <Td isNumeric>{row.price}</Td>
              <Td>
                <UpdateModal values={row} handleUpdate={handleUpdate} />
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
const UpdateModal = ({ values, handleUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Button bg="transparent" _hover={{ bg: "trasparent" }} onClick={onOpen}>
        <CreateIcon />
        <Text mx={2}>Update</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Price</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                travellerClass: values.travellerClass,
                price: values.price,
              }}
              validationSchema={Yup.object({
                travellerClass: Yup.string().required("Required"),
                price: Yup.number().required("Required"),
              })}
              onSubmit={(newValues) => {
                console.log(newValues);
                console.log("Onvy");
                handleUpdate(newValues);
                onClose();
                console.log("after");
              }}
            >
              {(props) => (
                <Box>
                  <FormControl
                    isInvalid={
                      props.errors.travellerClass &&
                      props.touched.travellerClass
                    }
                  >
                    <FormLabel>Account Type:</FormLabel>
                    <Input
                      type="text"
                      name="travellerClass"
                      value={props.initialValues.travellerClass}
                      isDisabled={true}
                    />
                    <FormErrorMessage>
                      {props.errors.travellerClass}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={props.errors.price && props.touched.price}
                  >
                    <FormLabel>Discount:</FormLabel>
                    <InputGroup>
                      <Input
                        type="number"
                        placeholder="Enter Price"
                        name="price"
                        value={props.initialValues.price}
                        {...props.getFieldProps("price")}
                      />
                    </InputGroup>
                    <FormErrorMessage>{props.errors.price}</FormErrorMessage>
                  </FormControl>
                  <Box my={4}>
                    <Button colorScheme="red" onClick={onClose}>
                      <Text mx={2}>Cancel</Text>
                    </Button>
                    <Button
                      colorScheme="teal"
                      onClick={props.submitForm}
                      mx={4}
                    >
                      <Text mx={2}>Save</Text>
                    </Button>
                  </Box>
                </Box>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TicketPrices;
