import React, { useState, useEffect } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  VStack,
  Flex,
  Stack, 
  Heading,
  Image
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { getRoutesOfUnallocatedPrice } from "../../api/route-api";

const FrontPage = () => {
  const [notAllocated, setNotAllocated] = useState([]);
  let history = useHistory();
  useEffect(async() => {
    var response = await getRoutesOfUnallocatedPrice();
    console.log(response);
    var fetchedResult = response.data;
    setNotAllocated(fetchedResult);
  }, []);
  const goToPricePage = (id) => {
    history.push("/prices", { route: id });
  };
  return (
    <Stack
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column-reverse", md: "row" }}
        wrap="no-wrap"
        minH="70vh"
        px={8}
        mb={16}
        spacing={10}
      >
        {notAllocated.length === 0 ? (
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            w={{ base: "80%", sm: "60%", md: "50%" }}
            borderRadius={10}
            padding={10}
          >
            <AlertIcon boxSize="70px" />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Prices are allocated to all the tickets
            </AlertTitle>
            <AlertDescription >
              Visit 'Tickets' Page to see ticket prices
            </AlertDescription>
          </Alert>
      ) : (
          <Alert
            status="warning"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            w={{ base: "80%", sm: "60%", md: "50%" }}
            borderRadius={10}
            padding={10}
          >
            <AlertIcon boxSize="70px" />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              You have to allocate prices to {notAllocated.length} route{notAllocated.length > 1 ? 's' : ''}
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              <VStack mt={4}>
                {notAllocated.map((id) => {
                  return (
                    <Button
                      colorScheme="teal"
                      variant="ghost"
                      onClick={() => goToPricePage(id)}
                    >
                      {`Flight No ${id}`}
                    </Button>
                  );
                })}
              </VStack>
            </AlertDescription>
          </Alert>
      )}
        <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
          <Image
            src="/images/pricing.jpg"
            size="100%"
            rounded="1rem"
            shadow="2xl"
          />
        </Box>
      </Stack>
  );
};

export default FrontPage;
