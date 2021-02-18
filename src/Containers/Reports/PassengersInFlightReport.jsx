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
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import _ from "lodash";
import ReportHeader from "../../Components/Headers/ReportHeader";
import { getPassengersByFlightNo } from "../../api/report-api";

const PassengersInFlightReport = (props) => {
  const [data, setData] = useState([]);
  const [filterValues, setFilterValues] = useState({
    route: null,
  });
  useEffect(async () => {
    let response = await getPassengersByFlightNo(filterValues);
    response = response.results;
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

    setData(dummydata);
  }, [filterValues]);
  const handleFilterChange = (filterChange) => {
    setFilterValues({ ...filterValues, ...filterChange });
  };
  const handleSortChange = (orderBy, order) => {
    var sortedData = _.orderBy(data, [orderBy], [order]);
    setData(sortedData);
  };
  const handleAgeSelect=(val)=>{
    var filteredData = _.filter(data,(row)=>{
      if (val==='below18') {
        return row.age<=18;
      } 
      else if(val==='above18') {
        return row.age>18;
      } else {
        return true;
      }
    })
    setData(filteredData);
  }
  return (
    <Box textAlign="center" mx="10px">
      <ReportHeader header="Passengers Travelling in a Flight" />
      <FilterComponent
        handleDateChange={handleFilterChange}
        handleSortChange={handleSortChange}
        handleAgeSelect={handleAgeSelect}
      />
      <PassengersInFlightReportContent
        content={data}
        tableCaption="Passengers Travelling in a Flight"
      />
    </Box>
  );
};

const FilterComponent = ({
  handleDateChange,
  handleSortChange,
  handleAgeSelect,
}) => {
  const [orderBy, setOrderBy] = useState("firstName");
  const handleChange = (event) => {
    var value = event.target.value;
    handleDateChange({ [event.target.name]: value });
  };
  const handleClick = (order) => {
    handleSortChange(orderBy, order);
  };
  const handleOrderChange = (event) => {
    setOrderBy(event.target.value);
  };
  const [age, setAge] = useState("all");
  const radioChange = (val) => {
    handleAgeSelect(val);
    setAge(val);
  };
  return (
    <Box m={4} px={2}>
      <Flex direction="row" ml={3}>
        <Box flex="2" ml={3} h="100%">
          <InputGroup>
            <InputLeftAddon children="Start Date" />
            <Input
              type="date"
              name="startDate"
              placeholder="Select"
              onChange={(event) => handleChange(event)}
            />
          </InputGroup>
        </Box>
        <Box flex="2" ml={3} h="100%">
          <InputGroup>
            <InputLeftAddon children="End Date" />
            <Input
              type="date"
              name="endDate"
              placeholder="Select"
              onChange={(event) => handleChange(event)}
            />
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
        <Box flex="3" ml={3} h="100%">
          <RadioGroup onChange={(val) => radioChange(val)} value={age}>
            <Stack direction="row">
              <Radio value="all">All</Radio>
              <Radio value="below18">Below 18</Radio>
              <Radio value="above18">Above 18</Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </Flex>
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
