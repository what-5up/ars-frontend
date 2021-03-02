import React, { useState, useEffect } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  VStack,
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
    <>
      {notAllocated.length === 0 ? (
        <Box p={4}>
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            borderRadius={10}
            padding={4}
          >
            <AlertIcon boxSize="70px" />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Prices are allocated to all the tickets
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Visit 'Tickets' Page to see ticket prices
            </AlertDescription>
          </Alert>
        </Box>
      ) : (
        <Box p={4}>
          <Alert
            status="warning"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderRadius={10}
            padding={4}
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
        </Box>
      )}
    </>
  );
};

export default FrontPage;
