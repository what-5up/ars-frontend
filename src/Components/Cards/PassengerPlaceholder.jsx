import React, { useState, useEffect } from 'react';
import { Box, Flex, Input, Button, Divider, FormErrorMessage, FormControl, FormLabel, Text } from '@chakra-ui/react';

const PassengerPlaceholder = ({ index }) => {
	return (
		<Flex
            
			p={2}
			width="90%"
			p={2}
			mx= "auto"
			boxShadow="xs"
			border="1px"
			borderColor="gray.200"
			borderRadius="0px"
			style={{
				boxShadow: '0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)',
				minWidth: '80%',
                cursor: 'pointer'
			}}
		>
			<Flex mb={2} mt={3} mx="5">
				<Text fontSize="2xl">{`Passenger ${index}`}</Text>
			</Flex>
			<Flex>
				<Divider />
			</Flex>
		</Flex>
	);
};
export default PassengerPlaceholder;
