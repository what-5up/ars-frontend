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
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import Fab from "@material-ui/core/Fab";
import FlightIcon from "@material-ui/icons/Flight";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";

const FlightCard = () => {
  return (
    <Box boxShadow="xl" borderRadius="10px" m="10px" p="8px">
      <Grid
        h="190px"
        w="80vw"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(20, 1fr)"
        gap={2}
      >
        <GridItem rowSpan={2} colSpan={3}>
          <Box pt={4}>
            <VStack spacing={-0.5}>
              <FlightTakeoffIcon style={{ fontSize: 40 }}/>
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
              <FlightLandIcon style={{ fontSize: 40 }}/>
              <Text color="gray.500">Los Angeles</Text>
              <Heading pt={0}>LAX</Heading>
              <Text color="gray.500">10.10 am</Text>
              <Text color="gray.500">June 20, 2021</Text>
            </VStack>
          </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={8}>
          <Box pt={4}>
            <Flex>
              <Stat>
                <StatLabel>Economy</StatLabel>
                <StatNumber>Price</StatNumber>
              </Stat>
              <Spacer />
              <Stat>
                <StatLabel>Bussiness</StatLabel>
                <StatNumber>Price</StatNumber>
              </Stat>
              <Spacer />
              <Stat>
                <StatLabel>Platinum</StatLabel>
                <StatNumber>Price</StatNumber>
              </Stat>
            </Flex>
          </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={8}>
          <Box align="center" justifyItems="center" mt={2}>
            <Button bg="transparent" size="lg" _hover={{ bg: "trasparent" }}>
              <Fab color="primary" variant="extended">
                <FlightIcon />
                <Text mx={2}>Book This Flight</Text> 
              </Fab>
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default FlightCard;
