import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import RegistrationArea from "../../Components/Forms/RegistrationArea";

const LandingRegisterContent = () => {
  return (
    <Flex mt={5} style={{ flexDirection: 'column', minWidth: '100vw' }}>
      <Flex style={{ justifyContent: "center", minWidth: "80%" }}>
        <RegistrationArea onRegistration={() => console.log("Logged in")} />
      </Flex>
    </Flex>
  );
};

LandingRegisterContent.propTypes = {};

LandingRegisterContent.defaultProps = {};

export default LandingRegisterContent;
