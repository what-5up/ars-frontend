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
import DeleteIcon from "@material-ui/icons/Delete";

const AccountTypesPage = () => {
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    // TODO: fetch account types
    var dummy = [
      {
        typeId: 1,
        accountType: "A",
        discount: 5,
        bookingsCriteria: 5,
      },
      {
        typeId: 2,
        accountType: "B",
        discount: 10,
        bookingsCriteria: 15,
      },
      {
        typeId: 3,
        accountType: "C",
        discount: 30,
        bookingsCriteria: 25,
      },
      {
        typeId: 4,
        accountType: "D",
        discount: 50,
        bookingsCriteria: 50,
      },
    ];
    setFetchedData(dummy);
  }, []);
  const handleDelete = (id) => {
    //   TODO: send delete to backend
    var newData = fetchedData.filter((type) => type.typeId !== id);
    setFetchedData(newData);
  };
  const handleNew = (newValues) => {
    //   TODO: send data to backend
    var newData = fetchedData.concat(newValues);
    setFetchedData(newData);
  };
  const handleUpdate = (newValues) => {
    //   TODO: send data to backend
    var newData = fetchedData.map((type) => {
      return newValues.typeId === type.typeId ? newValues : type;
    });
    setFetchedData(newData);
  };
  return (
    <Box m={4} px={4}>
      <Heading>Account Types</Heading>
      <AccountTypesTable
        content={fetchedData}
        tableCaption={""}
        handleNew={handleNew}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

const AccountTypesTable = ({
  content,
  tableCaption,
  handleNew,
  handleUpdate,
  handleDelete,
}) => {
  return (
    <>
    <UpdateModal values={{}} handleUpdate={handleNew} forNew={true}/>
      <Table mt={5} variant="striped" colorScheme="gray">
        <TableCaption>{tableCaption}</TableCaption>
        <Thead>
          <Tr>
            <Th>Account Type</Th>
            <Th>Discount</Th>
            <Th isNumeric>Bookings Criteria</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {content.map((row) => {
            return (
              <Tr key={row.typeId}>
                <Td>{row.accountType}</Td>
                <Td>{`${row.discount} %`}</Td>
                <Td isNumeric>{row.bookingsCriteria}</Td>
                <Td>
                  <UpdateModal values={row} handleUpdate={handleUpdate} />
                </Td>
                <Td>
                  <DeleteModal
                    typeId={row.typeId}
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
      {forNew ? (
        <Button colorScheme="teal" onClick={onOpen} m={4}>
          <AddIcon />
          <Text mx={2}>
            {forNew ? "Add New Account Type" : "Add New Account Type"}
          </Text>
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
          <ModalHeader>Update Account Type</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Account Type:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Account Type"
                  name="accountType"
                  value={formValues.accountType}
                  onChange={(event) => handleChange(event)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Discount:</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    placeholder="Enter Discount"
                    name="discount"
                    value={formValues.discount}
                    onChange={(event) => handleChange(event)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Booking Criteria:</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    placeholder="Enter Booking Criteria"
                    name="bookingsCriteria"
                    value={formValues.bookingsCriteria}
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
const DeleteModal = ({ typeId, handleDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const handleYes = () => {
    handleDelete(typeId);
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

export default AccountTypesPage;
