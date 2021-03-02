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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useToast,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  getRoutes,
  getRoutePrice,
  deleteRoutePrice,
  updateRoutePrice,
  addRoutePrice,
} from "../../api/route-api";

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
    var response = await getRoutePrice(selectedRoute);
    var data = response.data || [];
    data = data.map((row) => {
      return {
        id: row.route_id,
        travellerClass: row.traveler_class,
        price: row.amount,
      };
    });
    setFetchedData(data);
  }, [selectedRoute]);
  const handleUpdateSuccess = (newValues) => {
    var newData = fetchedData.map((priceData) => {
      return newValues.travellerClass === priceData.travellerClass
        ? newValues
        : priceData;
    });
    setFetchedData(newData);
  };
  const handleAddSuccess = (newValues) => {
    var newData = fetchedData.concat(newValues);
    setFetchedData(newData);
  };
  const handleRouteSelect = (event) => {
    var value = event.target.value;
    setSelectedRoute(value);
    setFetchedData([]);
  };
  const handleDeleteSuccess = async (id) => {
    var newData = fetchedData.filter((row) => row.travellerClass !== id);
    setFetchedData(newData);
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
        handleUpdate={handleUpdateSuccess}
        handleDelete={handleDeleteSuccess}
        handleAdd={handleAddSuccess}
      />
    </Box>
  );
};

const PricesTable = ({
  content,
  tableCaption,
  handleUpdate,
  handleDelete,
  handleAdd,
}) => {
  return (
    <>
      <UpdateModal values={{}} handleUpdate={handleAdd} forNew={true} />
      <Table mt={5} variant="striped" colorScheme="gray">
        <TableCaption>{tableCaption}</TableCaption>
        <Thead>
          <Tr>
            <Th>Traveller Class</Th>
            <Th isNumeric>Price (Rs.)</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {content.map((row) => {
            return (
              <Tr key={row.travellerClass}>
                <Td>{row.travellerClass}</Td>
                <Td isNumeric>{row.price}</Td>
                <Td>
                  <UpdateModal
                    values={row}
                    handleUpdate={handleUpdate}
                    forNew={false}
                  />
                </Td>
                <Td>
                  <DeleteModal
                    routeId={row.id}
                    classId={row.travellerClass}
                    handleDelete={handleDelete}
                  />
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const handleUpdatePrice = async (newValues) => {
    var response = await updateRoutePrice(
      newValues.routeId,
      newValues.travellerClass,
      newValues.price
    );
    if (response.message === "Updated successfully") {
      handleUpdate(newValues);
      toast({
        title: "Price Updated.",
        description: response.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "An error occurred.",
        description: response.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const handlePriceAdd = async (newValues) => {
    var response = await addRoutePrice(newValues.routeId, {
      travellerClass: newValues.travellerClass,
      amount: newValues.price,
    });
    if (response.message === "Updated successfully") {
      handleUpdate(newValues);
      toast({
        title: "Price Updated.",
        description: response.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "An error occurred.",
        description: response.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <div>
      {forNew ? (
        <Button colorScheme="teal" onClick={onOpen} m={4}>
          <AddIcon />
          <Text mx={2}>Add New Price</Text>
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
          <ModalHeader>{forNew ? "New Price" : "Update Price"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                routeId: values.id,
                travellerClass: values.travellerClass,
                price: values.price,
              }}
              validationSchema={Yup.object({
                travellerClass: Yup.number().required("Required"),
                price: Yup.number().required("Required"),
              })}
              onSubmit={(newValues) => {
                if (forNew) {
                  handlePriceAdd(newValues);
                } else {
                  handleUpdatePrice(newValues);
                }
                onClose();
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
                    <FormLabel>Traveller Class:</FormLabel>
                    {forNew ? null : (
                      <Input
                        type="text"
                        name="travellerClass"
                        value={props.initialValues.travellerClass}
                        isDisabled={true}
                      />
                    )}
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

const DeleteModal = ({ routeId, classId, handleDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();
  const handleYes = async () => {
    var response = await deleteRoutePrice(routeId, classId);
    if (response.message === "Route price deleted successfully") {
      handleDelete(classId);
      onClose();
      toast({
        title: "Price Deleted.",
        description: response.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "An error occurred.",
        description: "Unable to delete route price.",
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
          <AlertDialogHeader>Discard Price?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to discard this price?
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

// const showToast = ({ title, message, status }) => {
//   const toast = useToast();
//   toast({
//     title: title,
//     description: message,
//     status: status,
//     duration: 9000,
//     isClosable: true,
//   });
// };

export default TicketPrices;
