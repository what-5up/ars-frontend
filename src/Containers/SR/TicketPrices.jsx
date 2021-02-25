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
} from "@chakra-ui/react";
import CreateIcon from "@material-ui/icons/Create";

const TicketPrices = () => {
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
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
  return (
    <Box m={4} px={4}>
      <Heading>Account Types</Heading>
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
  const [formValues, setFormValues] = useState(values);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdate(formValues);
    onClose();
  };
  const handleChange = (event) => {
    var value = event.target.value;
    setFormValues({ ...formValues, [event.target.name]: value });
  };
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
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Account Type:</FormLabel>
                <Input
                  type="text"
                  name="travellerClass"
                  value={formValues.travellerClass}
                  isDisabled={true}
                  onChange={(event) => handleChange(event)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Discount:</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    placeholder="Enter Price"
                    name="price"
                    value={formValues.price}
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

export default TicketPrices;
