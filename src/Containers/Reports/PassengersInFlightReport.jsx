import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
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
  Radio,
  RadioGroup,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import _ from "lodash";
import ReportHeader from "../../Components/Headers/ReportHeader";
import { getPassengersByFlightNo } from "../../api/report-api";
import { getRoutes } from "../../api/route-api";

const PassengersInFlightReport = (props) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [filterValues, setFilterValues] = useState({
    route: null,
  });
  useEffect(async () => {
    let response = await getPassengersByFlightNo(filterValues.route);
    response = response.data;
    var data = response.above18.concat(response.below18);
    var routs = await getRoutes();
    routs = routs.data || [];
    setRoutes(routs);
    data = data.map((row) => {
      return {
        firstName: row.first_name,
        lastName: row.last_name,
        age: row.passenger_age,
      };
    });
    let dummydata = [
      {
        firstName: "A",
        lastName: "B",
        age: 20,
      },
      {
        firstName: "X",
        lastName: "B",
        age: 2,
      },
      {
        firstName: "A",
        lastName: "Y",
        age: 70,
      },
      {
        firstName: "M",
        lastName: "L",
        age: 18,
      },
    ];
    setFetchedData(data);
    setDataToShow(data);
  }, [filterValues]);
  const handleFilterChange = (filterChange) => {
    setFilterValues({ ...filterValues, ...filterChange });
  };
  const handleSortChange = (orderBy, order) => {
    var sortedData = _.orderBy(dataToShow, [orderBy], [order]);
    setDataToShow(sortedData);
  };
  const handleAgeSelect = (val) => {
    var filteredData = _.filter(fetchedData, (row) => {
      if (val === "below18") {
        return row.age <= 18;
      } else if (val === "above18") {
        return row.age > 18;
      } else {
        return true;
      }
    });
    setDataToShow(filteredData);
  };
  return (
    <Box textAlign="center" mx="10px">
      <ReportHeader header="Passengers Travelling in a Flight" />
      <FilterComponent
        routes={routes}
        handleFlightChange={handleFilterChange}
        handleSortChange={handleSortChange}
        handleAgeSelect={handleAgeSelect}
      />
      {filterValues.route ? (
        <PassengersInFlightReportContent
          content={dataToShow}
          tableCaption="Passengers Travelling in a Flight"
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

const FilterComponent = ({
  routes,
  handleFlightChange,
  handleSortChange,
  handleAgeSelect,
}) => {
  const [orderBy, setOrderBy] = useState("firstName");
  const [order, setOrder] = useState("asc");
  const handleChange = (event) => {
    var value = event.target.value;
    handleFlightChange({ route: value });
  };
  const handleClick = (ord) => {
    setOrder(ord);
    handleSortChange(orderBy, ord);
  };
  const handleOrderChange = (event) => {
    setOrderBy(event.target.value);
    handleSortChange(orderBy, order);
  };
  const [age, setAge] = useState("all");
  const radioChange = (val) => {
    handleAgeSelect(val);
    setAge(val);
  };
  return (
    <Box my={4} px={2}>
      <Flex direction="row" ml={3}>
        <Box flex="4" ml={3} h="100%">
          <InputGroup>
            <InputLeftAddon children="Route" />
            <Select placeholder={"Select Flight"} onChange={handleChange}>
              {routes.map((rout) => {
                return (
                  <option
                    value={rout.id}
                  >{`${rout.id} ${rout.origin_code} -> ${rout.destination_code}`}</option>
                );
              })}
            </Select>
          </InputGroup>
        </Box>
        <Box flex="3" ml={3} h="100%">
          <Flex direction="row" ml={3}>
            <Select
              placeholder="Sort By"
              defaultValue="firstName"
              onChange={handleOrderChange}
            >
              <option value="firstName">First name</option>
              <option value="lastName">Last name</option>
              <option value="age">Age</option>
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
      <Box ml={3} h="100%">
        <RadioGroup onChange={(val) => radioChange(val)} value={age}>
          <Stack direction="row">
            <Radio value="all">All</Radio>
            <Radio value="below18">Below 18</Radio>
            <Radio value="above18">Above 18</Radio>
          </Stack>
        </RadioGroup>
      </Box>
    </Box>
  );
};

const PassengersInFlightReportContent = ({ content, tableCaption }) => {
  return (
    <Table variant="striped" colorScheme="gray">
      <TableCaption>{tableCaption}</TableCaption>
      <Thead>
        <Tr>
          <Th>First Name</Th>
          <Th>Last Name</Th>
          <Th isNumeric>Age</Th>
        </Tr>
      </Thead>
      <Tbody>
        {content.map((row) => {
          return (
            <Tr key={row.firstName + row.lastName + row.age}>
              <Td>{row.firstName}</Td>
              <Td>{row.lastName}</Td>
              <Td isNumeric>{row.age}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

PassengersInFlightReport.propTypes = {};

export default PassengersInFlightReport;
