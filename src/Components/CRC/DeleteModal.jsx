import React from "react";
import {
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
  useToast,
} from "@chakra-ui/react";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  deleteScheduledFlight,
} from "../../api/scheduled-flight-api";

const DeleteModal = ({ id, handleDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();
  const handleYes = async () => {
    var response = await deleteScheduledFlight(id);
    if (response.message === "Scheduled flight deleted successfully") {
      handleDelete(id);
      onClose();
      toast({
        title: "Schedule Deleted.",
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

export default DeleteModal;
