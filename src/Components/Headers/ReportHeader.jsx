import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const ReportHeader = ({ header }) => {
  return (
    <Box textAlign="center">
      <Heading>{header}</Heading>
    </Box>
  );
};

export default ReportHeader;
