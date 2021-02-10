import { useState, useRef } from "react";
import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Avatar,
  AvatarBadge,
  Input,
  Image,
  Box,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";

const EditMyProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text onClick={onOpen}>Edit Profile</Text>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior="outside"
        size="4xl"
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MyDetails />
          </ModalBody>
          <ModalFooter>
            <DeleteMyAccount />
            <Button colorScheme="blue" mx={3}>
              Save
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const MyDetails = ({ user }) => {
  const [userDetails, setUserDetails] = useState(user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    var value = event.target.value;
    setUserDetails({ ...userDetails, [event.target.name]: value });
    console.log(userDetails);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 3000);
  };
  return (
    <Box justifyContent="center">
      <Avatar size="2xl">
        <AvatarBadge boxSize="1em" onClick={() => {}}>
          <Image src="/images/change-picture.png" size="100%" shadow="2xl" />
        </AvatarBadge>
      </Avatar>
      <Editable defaultValue="user.firstname">
        <EditablePreview />
        <EditableInput />
      </Editable>
    </Box>
  );
};

MyDetails.defaultProps = {
  user: {
    title: "Mr",
    firstname: "sdfs",
    lastname: "ssf",
    email: "sfsdfs",
    gender: "m",
  },
};

const DeleteMyAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  return (
    <>
      <Button colorScheme="red" onClick={() => setIsOpen(true)}>
        Delete Account
      </Button>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Your Account
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default EditMyProfile;
