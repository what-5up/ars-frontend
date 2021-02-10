import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, Flex, Image, Heading, Stack, Text, Center } from '@chakra-ui/react';
import RegistrationArea from '../../Components/Forms/RegistrationArea';
import GuestUser from '../../Components/Cards/GuestUser';
const LandingRegisterContent = () => {
	return (
		<Flex borderRadius={10} boxShadow="lg" m={4} flexDirection="column" width="100vw" overflowX="hidden">
			{/* <Box flex="1">
				<RegistrationArea onRegistration={() => console.log('Logged in')} />
			</Box> */}
			<Box flex="1">
        <GuestUser/>
			</Box>
		</Flex>
	);
};

LandingRegisterContent.propTypes = {};

LandingRegisterContent.defaultProps = {};

export default LandingRegisterContent;
