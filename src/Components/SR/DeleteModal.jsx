import React from "react";
import {
  Button,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useToast,
} from "@chakra-ui/react";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  deleteRoutePrice,
} from "../../api/route-api";

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

export default DeleteModal;
