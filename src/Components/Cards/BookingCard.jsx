import { useState, useRef } from "react";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  VStack,
  HStack,
  Badge,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import Fab from "@material-ui/core/Fab";
import PaymentIcon from "@material-ui/icons/Payment";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const BookingCard = () => {
  return (
    <Box
      boxShadow="xl"
      borderRadius="10px"
      m="10px"
      p="8px"
    >
      <Grid
        h="200px"
        w="80vw"
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(20, 1fr)"
        gap={2}
      >
        <GridItem rowSpan={2} colSpan={4}>
          <Box pt={4}>
            <VStack spacing={-0.5}>
              <Text color="gray.500">Los Angeles</Text>
              <Heading pt={0}>LAX</Heading>
              <Text color="gray.500">10.10 am</Text>
              <Text color="gray.500">June 20, 2021</Text>
            </VStack>
          </Box>
        </GridItem>
        <GridItem rowSpan={2} colSpan={7}>
          <Box
            w={{ base: "80%", sm: "60%", md: "50%" }}
            mb={{ base: 12, md: 0 }}
          >
            <Image
              src={"/images/flight-icon.png"}
              size="100%"
              rounded="1rem"
              alt="flight image"
            />
          </Box>
        </GridItem>
        <GridItem rowSpan={2} colSpan={4}>
          <Box pt={4}>
            <VStack spacing={-0.5}>
              <Text color="gray.500">Los Angeles</Text>
              <Heading pt={0}>LAX</Heading>
              <Text color="gray.500">10.10 am</Text>
              <Text color="gray.500">June 20, 2021</Text>
            </VStack>
          </Box>
        </GridItem>
        <GridItem rowSpan={2} colSpan={5}>
          <Center pt={4}>
            <VStack spacing={-0.5}>
              <Badge ml="1" fontSize="0.8em" colorScheme="green">
                Not paid
              </Badge>
              <Heading pt={0}>Rs. 400.00</Heading>
              <Text color="gray.500">3 Passengers</Text>
              <Text color="gray.500">Economy Class</Text>
            </VStack>
          </Center>
        </GridItem>
        <GridItem rowSpan={1} colSpan={20}>
          <Center mt={3}>
            <HStack spacing={8}>
              <CancelBooking />
              <Button
                bg="transparent"
                _hover={{ bg: "trasparent" }}
              >
                <Fab color="primary" variant="extended" size="large">
                  <PaymentIcon />
                  <Text mx={2}>Pay For Booking</Text>
                </Fab>
              </Button>
            </HStack>
          </Center>
        </GridItem>
      </Grid>
    </Box>
  );
};

const CancelBooking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  return (
    <>
      <Button
        bg="transparent"
        onClick={() => setIsOpen(true)}
        _hover={{ bg: "trasparent" }}
      >
        <Fab color="secondary" variant="extended">
          <DeleteForeverIcon />
          <Text mx={2}>Cancel Booking</Text>
        </Fab>
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
              Cancel Booking
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter justifyContent="center">
              <Button colorScheme="red" onClick={onClose} ml={3} mr={8} px={10}>
                Yes
              </Button>
              <Button
                ref={cancelRef}
                colorScheme="teal"
                onClick={onClose}
                mr={8}
                px={10}
              >
                No
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default BookingCard;
