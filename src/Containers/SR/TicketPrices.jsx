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
  InputGroup,
  InputLeftAddon,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { getRoutes, getRoutePrice } from "../../api/route-api";
import { getTravelerClasses } from "../../api/traveller-class-api";
import UpdateModal from "../../Components/SR/UpdateModal";
import DeleteModal from "../../Components/SR/DeleteModal";

const TicketPrices = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [used, setUsed] = useState([])
  const [routes, setRoutes] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [travellerClasses, setTravellerClasses] = useState([]);
  const location = useLocation();
  const locationParams = location.state || { route: null };
  const [selectedRoute, setSelectedRoute] = useState(locationParams.route);
  useEffect(async () => {
    var routs = await getRoutes();
    routs = routs.data || [];
    setRoutes(routs);
    var classes = await getTravelerClasses();
    classes = classes.data || [];
    setTravellerClasses(classes);
    var response;
    var data = [];
    if (selectedRoute) {
      response = await getRoutePrice(selectedRoute);
      data = response.data;
    }
    data = data.map((row) => {
      return {
        id: row.route_id,
        travellerClass: row.traveler_class,
        price: row.amount,
      };
    });
    var usednew = data.map((row)=>{
      return {
        id:row.travellerClass,
        class:classes.find((x) => x.id == row.travellerClass)
        .class
      }
    });
    setUsed(usednew);
    let difference = classes.filter((x) => usednew.includes(x));
    console.log(difference,usednew,classes)
    setAvailableClasses(classes);
    setFetchedData(data);
  }, [selectedRoute]);
  const handleUpdateSuccess = (newValues) => {
    var newData = fetchedData.map((priceData) => {
      return newValues.travellerClass === priceData.travellerClass
        ? newValues
        : priceData;
    });
    setFetchedData(newData);
  };
  const handleAddSuccess = (newValues) => {
    var newData = fetchedData.concat(newValues);
    setFetchedData(newData);
  };
  const handleRouteSelect = (event) => {
    var value = event.target.value;
    setSelectedRoute(value);
    setFetchedData([]);
  };
  const handleDeleteSuccess = async (id) => {
    var newData = fetchedData.filter((row) => row.travellerClass !== id);
    setFetchedData(newData);
  };
  return (
    <Box m={4} px={4}>
      <Heading>Prices</Heading>
      <InputGroup py={8}>
        <InputLeftAddon children="Route" />
        <Select
          defaultValue={selectedRoute}
          value={selectedRoute}
          placeholder={"Select Route"}
          onChange={handleRouteSelect}
        >
          {routes.map((rout) => {
            return (
              <option
                value={rout.id}
              >{`${rout.id} ${rout.origin_code} -> ${rout.destination_code}`}</option>
            );
          })}
        </Select>
      </InputGroup>
      {selectedRoute ? (
        <PricesTable
          routeId={selectedRoute}
          content={fetchedData}
          tableCaption={""}
          handleUpdate={handleUpdateSuccess}
          handleDelete={handleDeleteSuccess}
          handleAdd={handleAddSuccess}
          travellerClasses={travellerClasses}
          availableClasses={availableClasses}
        />
      ) : (
        <Alert
          status="info"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Select a flight to view info
          </AlertTitle>
        </Alert>
      )}
    </Box>
  );
};

const PricesTable = ({
  routeId,
  content,
  tableCaption,
  handleUpdate,
  handleDelete,
  handleAdd,
  travellerClasses,
  availableClasses,
}) => {
  return (
    <>
      <UpdateModal
        values={{ routeId: routeId }}
        handleUpdate={handleAdd}
        forNew={true}
        travellerClasses={travellerClasses}
        availableClasses={availableClasses}
        route={routeId}
      />
      <Table mt={5} variant="striped" colorScheme="gray">
        <TableCaption>{tableCaption}</TableCaption>
        <Thead>
          <Tr>
            <Th>Traveller Class</Th>
            <Th isNumeric>Price (Rs.)</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {content.map((row) => {
            return (
              <Tr key={row.travellerClass}>
                <Td>
                  {
                    travellerClasses.find((x) => x.id == row.travellerClass)
                      .class
                  }
                </Td>
                <Td isNumeric>{row.price}</Td>
                <Td>
                  <UpdateModal
                    values={row}
                    handleUpdate={handleUpdate}
                    forNew={false}
                    travellerClasses={travellerClasses}
                    availableClasses={availableClasses}
                    route={routeId}
                  />
                </Td>
                <Td>
                  <DeleteModal
                    routeId={routeId}
                    classId={row.travellerClass}
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

// const showToast = ({ title, message, status }) => {
//   const toast = useToast();
//   toast({
//     title: title,
//     description: message,
//     status: status,
//     duration: 9000,
//     isClosable: true,
//   });
// };

export default TicketPrices;
