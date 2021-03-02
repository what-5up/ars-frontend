import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import _ from "lodash";
import ReportHeader from "../../Components/Headers/ReportHeader";
import { getPastFlightDetails } from "../../api/report-api";
import { getRoutes } from "../../api/route-api";

const FlightDetailsReport = (props) => {
  const [dataToShow, setDataToShow] = useState([]);
  const [filterValues, setFilterValues] = useState({
    origin: null,
    destination: null,
  });
  const [origins, setOrigins] = useState(new Set());
  const [dests, setDests] = useState(new Set());
  useEffect(async () => {
    let routes = await getRoutes();
    routes = routes.data;
    let response = await getPastFlightDetails();
    response = response.data;
    let originSet = new Set();
    let destinationSet = new Set();
    if (response) {
      let data = response.map((row) => {
        let route = routes.find((r) => r.id === row.route);
        originSet.add(route.origin_region);
        destinationSet.add(route.destination_region);
        return {
          origin: route.origin_region,
          destination: route.destination_region,
          departure: row.departure,
          delay: row.delayed_departure
            ? `${
                (new Date(row.delayed_departure) - new Date(row.departure)) /
                1000 /
                60
              } minutes delayed`
            : null,
          passengers: row.passengers,
        };
      });
      data = _.orderBy(data, ["origin", "destination"], ["asc", "asc"]);
      // filtering data
      data = filterValues.origin
        ? data.filter((rw) => rw.origin === filterValues.origin)
        : data;
      data = filterValues.destination
        ? data.filter((rw) => rw.destination === filterValues.destination)
        : data;
      setDataToShow(data);
      setOrigins(originSet);
      setDests(destinationSet);
    }
  }, [filterValues]);
  const handleFilterChange = (filterChange) => {
    setFilterValues({ ...filterValues, ...filterChange });
  };
  const handleSortChange = (orderBy, order) => {
    var sortedData = _.orderBy(
      dataToShow,
      [orderBy, "origin", "destination"],
      [order, "asc", "asc"]
    );
    setDataToShow(sortedData);
  };
  return (
    <Box textAlign="center" mx="10px">
      <ReportHeader header="All Past Flights, States, Passenger Counts Data" />
      <FilterComponent
        origins={Array.from(origins)}
        destinations={Array.from(dests)}
        handleRouteChange={handleFilterChange}
        handleSortChange={handleSortChange}
      />
      <FlightDetailsReportContent
        content={dataToShow}
        tableCaption="All Past Flights, States, Passenger Counts Data"
      />
    </Box>
  );
};

const FilterComponent = ({
  origins,
  destinations,
  handleRouteChange,
  handleSortChange,
}) => {
  const [orderBy, setOrderBy] = useState("departure");
  const [order, setOrder] = useState("asc");
  const handleChange = (event) => {
    var value = event.target.value;
    if (value === "all") {
      value = null;
      handleRouteChange({
        origin: null,
        destination: null,
      });
      return;
    }
    handleRouteChange({ [event.target.name]: value });
  };
  const handleClick = (ord) => {
    setOrder(ord);
    handleSortChange(orderBy, ord);
  };
  const handleOrderChange = (event) => {
    setOrderBy(event.target.value);
    handleSortChange(event.target.value, order);
  };
  return (
    <Box m={4} px={2}>
      <Flex direction="row" ml={3}>
        <Box flex="2" ml={3} h="100%">
          <InputGroup>
            <InputLeftAddon children="Origin" />
            <Select
              placeholder="Select Origin"
              onChange={handleChange}
              name="origin"
            >
              <option value="all">All</option>
              {origins.map((org) => (
                <option value={org}>{org}</option>
              ))}
            </Select>
          </InputGroup>
        </Box>
        <Box flex="2" ml={3} h="100%">
          <InputGroup>
            <InputLeftAddon children="Destination" />
            <Select
              placeholder="Select Destination"
              onChange={handleChange}
              name="destination"
            >
              <option value="all">All</option>
              {destinations.map((dest) => (
                <option value={dest}>{dest}</option>
              ))}
            </Select>
          </InputGroup>
        </Box>
        <Box flex="3" ml={3} h="100%">
          <Flex direction="row" ml={3}>
            <Select
              placeholder="Sort By"
              defaultValue="departure"
              onChange={handleOrderChange}
            >
              <option value="departure">Departure Time</option>
              <option value="passengers">Passenger Count</option>
            </Select>
            <Box textAlign="right">
              <IconButton
                icon={<ArrowUpIcon />}
                variant="ghost"
                onClick={() => handleClick("asc")}
              ></IconButton>
            </Box>
            <Box textAlign="right">
              <IconButton
                icon={<ArrowDownIcon />}
                variant="ghost"
                onClick={() => handleClick("desc")}
              ></IconButton>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

const FlightDetailsReportContent = ({ content, tableCaption }) => {
  return (
    <Table variant="striped" colorScheme="gray">
      <TableCaption>{tableCaption}</TableCaption>
      <Thead>
        <Tr>
          <Th>Origin</Th>
          <Th>Destination</Th>
          <Th>Departure Date</Th>
          <Th>Departure Time</Th>
          <Th>Delayed</Th>
          <Th isNumeric>Passengers</Th>
        </Tr>
      </Thead>
      <Tbody>
        {content.map((row) => {
          return (
            <Tr key={row.id}>
              <Td>{row.origin}</Td>
              <Td>{row.destination}</Td>
              <Td>{row.departure.split("T")[0]}</Td>
              <Td>{row.departure.split("T")[1].split(".")[0]}</Td>
              <Td>
                {row.delay ? (
                  <Badge
                    variant="solid"
                    ml="1"
                    fontSize="0.8em"
                    colorScheme="red"
                  >
                    {row.delay}
                  </Badge>
                ) : (
                  "On Time"
                )}
              </Td>
              <Td isNumeric>{row.passengers}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

FlightDetailsReport.propTypes = {};

export default FlightDetailsReport;
