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
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  addAccountType,
  getAccountTypes,
  updateAccountType,
  deleteAccountType,
} from "../../api/account-types";

const AccountTypesPage = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const toast = useToast();
  useEffect(async () => {
    var results = await getAccountTypes();
    var recievedData = results.data || [];
    var data = recievedData.map((row) => {
      return {
        typeId: row.id,
        accountType: row.account_type_name,
        discount: row.discount,
        bookingsCriteria: row.criteria,
      };
    });
    setFetchedData(data);
  }, []);
  const handleDelete = async (id) => {
    var response = await deleteAccountType(id);
    if (response.message === "Account type deleted successfully") {
      var newData = fetchedData.filter((type) => type.typeId !== id);
      setFetchedData(newData);
      toast({
        title: "Account Type Deleted.",
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
  const handleNew = async (newValues) => {
    var dataToSend = {
      accountTypeName: newValues.accountType,
      discount: newValues.discount,
      criteria: newValues.bookingsCriteria,
    };
    var response = await addAccountType(dataToSend);
    if (response.message === "Account type added successfully") {
      var newData = fetchedData.concat({
        ...newValues,
        typeId: response.data.id,
      });
      setFetchedData(newData);
      toast({
        title: "Account Type Deleted.",
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
  const handleUpdate = async (newValues) => {
    var dataToSend = {
      accountTypeName: newValues.accountType,
      discount: newValues.discount,
      criteria: newValues.bookingsCriteria,
    };
    var response = await updateAccountType(newValues.typeId, dataToSend);
    if (response.message === "Updated successfully") {
      var newData = fetchedData.map((type) => {
        return newValues.typeId === type.typeId ? newValues : type;
      });
      setFetchedData(newData);
      toast({
        title: "Account Type Updated.",
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
      <UpdateModal values={{}} handleUpdate={handleNew} forNew={true} />
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      {forNew ? (
        <Button colorScheme="teal" onClick={onOpen} m={4}>
          <AddIcon />
          <Text mx={2}>
            {forNew ? "Add New Account Type" : "Update Account Type"}
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
          <ModalHeader>
            {forNew ? "New Account Type" : "Update Account Type"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                typeId: forNew ? "" : values.typeId,
                accountType: forNew ? "" : values.accountType,
                discount: forNew ? "" : values.discount,
                bookingsCriteria: forNew ? "" : values.bookingsCriteria,
              }}
              validationSchema={Yup.object({
                accountType: Yup.string().required("Required"),
                discount: Yup.number().lessThan(100).required("Required"),
                bookingsCriteria: Yup.number().required("Required"),
              })}
              onSubmit={(values) => {
                handleUpdate(values);
                onClose();
              }}
            >
              {(props) => (
                <Box>
                  <FormControl
                    isInvalid={
                      props.errors.accountType && props.touched.accountType
                    }
                  >
                    <Input
                      type="text"
                      placeholder="Enter Account Type"
                      name="accountType"
                      value={props.initialValues.accountType}
                      {...props.getFieldProps("accountType")}
                    />
                    <FormErrorMessage>
                      {props.errors.accountType}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={props.errors.discount && props.touched.discount}
                  >
                    <FormLabel>Discount:</FormLabel>
                    <InputGroup>
                      <Input
                        type="number"
                        placeholder="Enter Discount"
                        name="discount"
                        value={props.initialValues.discount}
                        {...props.getFieldProps("discount")}
                      />
                    </InputGroup>
                    <FormErrorMessage>{props.errors.discount}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      props.errors.bookingsCriteria &&
                      props.touched.bookingsCriteria
                    }
                  >
                    <FormLabel>Booking Criteria:</FormLabel>
                    <InputGroup>
                      <Input
                        type="number"
                        placeholder="Enter Booking Criteria"
                        name="bookingsCriteria"
                        value={props.initialValues.bookingsCriteria}
                        {...props.getFieldProps("bookingsCriteria")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {props.errors.bookingsCriteria}
                    </FormErrorMessage>
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
