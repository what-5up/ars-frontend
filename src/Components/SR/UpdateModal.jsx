import React from "react";
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
  Select,
  FormLabel,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import { Formik } from "formik";
import * as Yup from "yup";
import { updateRoutePrice, addRoutePrice } from "../../api/route-api";

const UpdateModal = ({
  values,
  handleUpdate,
  forNew,
  travellerClasses,
  availableClasses,
  route
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const handleUpdatePrice = async (newValues) => {
    var response = await updateRoutePrice(
      route,
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
      travelerClass: newValues.travellerClass,
      amount: newValues.price,
    });
    if (response.message === "Route price added successfully") {
      handleUpdate(newValues);
      toast({
        title: "Price Added.",
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
                routeId: values.routeId,
                travellerClass: values.travellerClass,
                price: values.price,
              }}
              validationSchema={Yup.object({
                travellerClass: Yup.number().required("Required"),
                price: Yup.number().min(0).required("Required"),
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
                    {forNew ? (
                      <Select
                        placeholder={"Select Traveller Class"}
                        // onChange={(option) =>
                        //   props.setFieldValue("travellerClass", option.value)
                        // }
                        // value={
                        //     availableClasses
                        //         ? availableClasses.find((option) => option.value === props.values.travellerClass)
                        //         : ''
                        // }
                        error={props.errors.travellerClass}
                        touched={props.touched.travellerClass}
                        {...props.getFieldProps("travellerClass")}
                      >
                        {availableClasses.map((cls) => {
                          return (
                            <option value={cls.id}>{`${cls.class}`}</option>
                          );
                        })}
                      </Select>
                    ) : (
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
                    <FormLabel>Price:</FormLabel>
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

export default UpdateModal;
