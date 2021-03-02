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
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import _ from "lodash";
import ReportHeader from "../../Components/Headers/ReportHeader";
import { getPassengerCountByDest } from "../../api/report-api";

const PassengersForDestinationReport = (props) => {
  const [data, setData] = useState([]);
  const [filterValues, setFilterValues] = useState({
    startDate: null,
    endDate: null,
    destination: null,
  });
  useEffect(async () => {
    if (
      (filterValues.startDate && filterValues.endDate) ||
      (!filterValues.startDate && !filterValues.endDate)
    ) {
      let response = await getPassengerCountByDest(filterValues);
      if (response && response.data) {
        var newData = response.data.map((row) => {
          return {
            dest_code: row.dest_code,
            destination: row.dest_name
              .split(/\s+/)
              .map((w) => w[0].toUpperCase() + w.slice(1))
              .join(" "),
            count: row.no_of_passengers,
          };
        });
        setData(newData);
      }
    }
  }, [filterValues]);
  const handleFilterChange = (filterChange) => {
    setFilterValues({ ...filterValues, ...filterChange });
  };
  const handleSortChange = (orderBy, order) => {
    var sortedData = _.orderBy(data, [orderBy], [order]);
    setData(sortedData);
  };
  return (
    <Box textAlign="center" mx="10px">
      <ReportHeader header="Number of Passengers Travelling to a Given Destination" />
      <FilterComponent
        handleDateChange={handleFilterChange}
        handleSortChange={handleSortChange}
      />
      <PassengersForDestinationReportContent
        content={data}
        tableCaption="Number of Passengers Travelling to a Given Destination"
      />
    </Box>
  );
};

const FilterComponent = ({
  handleDateChange,
  handleSortChange,
  
}) => {
  const [orderBy, setOrderBy] = useState("destination");
  const [order, setOrder] = useState("asc");
  const handleChange = (event) => {
    var value = event.target.value;
    handleDateChange({ [event.target.name]: value });
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
              defaultValue="destination"
              onChange={handleOrderChange}
            >
              <option value="destination">Destination</option>
              <option value="count">Passengers Count</option>
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

const PassengersForDestinationReportContent = ({ content, tableCaption }) => {
  return (
    <Table variant="striped" colorScheme="gray">
      <TableCaption>{tableCaption}</TableCaption>
      <Thead>
        <Tr>
          <Th>Code</Th>
          <Th>Destination</Th>
          <Th isNumeric>Count</Th>
        </Tr>
      </Thead>
      <Tbody>
        {content.map((row) => {
          return (
            <Tr key={row.dest_code}>
              <Td>{row.dest_code}</Td>
              <Td>{row.destination}</Td>
              <Td isNumeric>{row.count}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

PassengersForDestinationReport.propTypes = {};

export default PassengersForDestinationReport;
