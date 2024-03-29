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
  Text,
  Heading,
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import _ from "lodash";
import ReportHeader from "../../Components/Headers/ReportHeader";
import { getRevenueByAircraftModel } from "../../api/report-api";
import { getModels } from "../../api/aircraft-model-api";

const RevenueReport = (props) => {
  var [modelList, setModelList] = useState([]);
  const [data, setData] = useState([]);
  const [filterValues, setFilterValues] = useState({
    model: null,
  });
  useEffect(async () => {
    let response = await getRevenueByAircraftModel(filterValues);
    if (response.data) {
      var newData = Object.keys(response.data).map((key) => [
        key,
        response.data[key],
      ]);
      setData(newData);
      let models = await getModels();
      setModelList(models.data);
    }
  }, [filterValues]);
  const handleFilterChange = (filterChange) => {
    setFilterValues(filterChange);
  };
  const handleSortChange = (orderBy, order) => {
    var sortedData = data.map((row) => [
      row[0],
      _.orderBy(row[1], [orderBy], [order]),
    ]);
    setData(sortedData);
  };
  return (
    <Box textAlign="center" mx="10px">
      <ReportHeader header="Total Revenue Generated by each Aircraft Type" />
      <FilterComponent
        modelList={modelList}
        handleModelChange={handleFilterChange}
        handleSortChange={handleSortChange}
      />
      <RevenueReportContent
        content={data}
        tableCaption="Total Revenue Generated by "
      />
    </Box>
  );
};

const FilterComponent = ({
  modelList,
  handleModelChange,
  handleSortChange,
}) => {
  const [orderBy, setOrderBy] = useState("month");
  const [order, setOrder] = useState("asc");
  const handleChange = (event) => {
    var value = event.target.value;
    if (value === "all") {
      value = null;
    }
    handleModelChange({ model: value });
  };
  const handleClick = (ord) => {
    setOrder(ord);
    handleSortChange(orderBy, ord);
  };
  const handleOrderChange = (event) => {
    setOrderBy(event.target.value);
    handleSortChange(orderBy, order);
  };

  return (
    <Box m={4} px={2}>
      <Flex direction="row" ml={3}>
        <Box flex="2" ml={3} h="100%">
          <Select placeholder="Select Model" onChange={handleChange}>
            <option value="all">All</option>
            {modelList.map((model) => (
              <option value={model}>{model}</option>
            ))}
          </Select>
        </Box>
        <Box flex="3" ml={3} h="100%">
          <Flex direction="row" ml={3}>
            <Select
              placeholder="Sort By"
              onChange={handleOrderChange}
            >
              <option value="month">Month</option>
              <option value="revenue">Revenue</option>
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

const RevenueReportContent = ({ content, tableCaption }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <Box pb={10}>
      {content.map((row) => (
        <Box my={5} mb={10}>
          <Heading as="h4" size="md">
            {row[0]}
          </Heading>
          <Table variant="striped" colorScheme="gray">
            <TableCaption>{tableCaption + " " + row[0]}</TableCaption>
            <Thead>
              <Tr>
                <Th>Month</Th>
                <Th isNumeric>Revenue</Th>
              </Tr>
            </Thead>
            <Tbody>
              {row[1].map((rev) => {
                return (
                  <Tr>
                    <Td>
                      {months[Number(rev.month.split("-")[1]) - 1] +
                        " " +
                        rev.month.split("-")[0]}
                    </Td>
                    <Td isNumeric>{rev.revenue}</Td>
                  </Tr>
                );
              })}
              <Tr>
                <Td>Total Revenue</Td>
                <Td isNumeric>
                  {row[1].reduce((total, rev) => {
                    return total + rev.revenue;
                  }, 0)}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      ))}
    </Box>
  );
};

RevenueReport.propTypes = {};

export default RevenueReport;
