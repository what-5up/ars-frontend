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
import { getBookingsByPassengerType } from "../../api/report-api";

const BookingsByPassengerTypeReport = (props) => {
  const [data, setData] = useState([]);
  const [filterValues, setFilterValues] = useState({
    startDate: null,
    endDate: null,
  });
  useEffect(async () => {
    let response = await getBookingsByPassengerType(filterValues);
    var newData = response.data.map((row) => {
      return {
        accountType: row.account_type
          .split(/\s+/)
          .map((w) => w[0].toUpperCase() + w.slice(1))
          .join(" "),
        count: row.number_of_bookings,
      };
    });
    setData(newData);
  }, [filterValues]);
  const handleFilterChange = (filterChange) => {
    setFilterValues({ ...filterValues, ...filterChange });
    console.log(filterValues);
  };
  const handleSortChange = (orderBy, order) => {
    var sortedData = _.orderBy(data, [orderBy], [order]);
    setData(sortedData);
  };
  return (
    <Box textAlign="center" mx="10px">
      <ReportHeader header="Number of Bookings by each Passenger Type" />
      <FilterComponent
        handleDateChange={handleFilterChange}
        handleSortChange={handleSortChange}
      />
      <BookingsByPassengerTypeReportContent
        content={data}
        tableCaption="Number of Bookings by each Passenger Type"
      />
    </Box>
  );
};

const FilterComponent = ({ handleDateChange, handleSortChange }) => {
  const [orderBy, setOrderBy] = useState("accountType");
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
              defaultValue="accountType"
              onChange={handleOrderChange}
            >
              <option value="accountType">Account Type</option>
              <option value="count">Count</option>
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

const BookingsByPassengerTypeReportContent = ({ content, tableCaption }) => {
  return (
    <Table variant="striped" colorScheme="gray">
      <TableCaption>{tableCaption}</TableCaption>
      <Thead>
        <Tr>
          <Th>Account Type</Th>
          <Th isNumeric>Count</Th>
        </Tr>
      </Thead>
      <Tbody>
        {content.map((row) => {
          return (
            <Tr key={row.accountType}>
              <Td>{row.accountType}</Td>
              <Td isNumeric>{row.count}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

BookingsByPassengerTypeReport.propTypes = {};

export default BookingsByPassengerTypeReport;
