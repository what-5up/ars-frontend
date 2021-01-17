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
} from "@chakra-ui/react";

const FlightCard = () => {
  return (
    <Box boxShadow="xl" borderRadius="10px" m="10px" p="8px">
      <Grid
        h="200px"
        w="80vw"
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(20, 1fr)"
        gap={2}
      >
        <GridItem rowSpan={2} colSpan={3}>
          <Box pt={4}>
            <VStack spacing={-0.5}>
              <Text color="gray.500">Los Angeles</Text>
              <Heading pt={0}>LAX</Heading>
              <Text color="gray.500">10.10 am</Text>
              <Text color="gray.500">June 20, 2021</Text>
            </VStack>
          </Box>
        </GridItem>
        <GridItem rowSpan={2} colSpan={6}>
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
        <GridItem rowSpan={2} colSpan={3}>
          <Box pt={4}>
            <VStack spacing={-0.5}>
              <Text color="gray.500">Los Angeles</Text>
              <Heading pt={0}>LAX</Heading>
              <Text color="gray.500">10.10 am</Text>
              <Text color="gray.500">June 20, 2021</Text>
            </VStack>
          </Box>
        </GridItem>
        <GridItem rowSpan={2} colSpan={5} bg="tomato">
          <Center>Prices</Center>
        </GridItem>
        <GridItem rowSpan={1} colSpan={15} bg="tomato">
          <Center>List of Routes</Center>
        </GridItem>
        <GridItem rowSpan={1} colSpan={5}>
          <Box align="center" justifyItems="center">
            <Button colorScheme="teal" size="lg">
              Book Flight
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default FlightCard;
