import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  Stack,
  Text,
  Center,
} from "@chakra-ui/react";
import RegistrationArea from "../../Components/Forms/RegistrationArea";

const LandingRegisterContent = () => {
  return (
    <Flex
      borderRadius={10}
      boxShadow="lg"
      m={4}
    >
      <Box flex="1">
        <RegistrationArea onRegistration={() => console.log("Logged in")}/>
      </Box>
    </Flex>
  );
};

LandingRegisterContent.propTypes = {};

LandingRegisterContent.defaultProps = {};


export default LandingRegisterContent;
