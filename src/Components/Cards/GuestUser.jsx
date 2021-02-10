import React, { useState } from 'react';
import { Box, Flex, Input, InputGroup, InputLeftElement, FormLabel, Button, Heading } from '@chakra-ui/react';
import Select from 'react-select';

const title = [
	{ value: 'Mr', label: 'Mr' },
	{ value: 'Mrs', label: 'Mrs' },
	{ value: 'Ms.', label: 'Ms.' },
	{ value: 'Master', label: 'Master' },
	{ value: 'Rev.', label: 'Rev.' },
];
const gender = [
	{ value: 'Male', label: 'Male' },
	{ value: 'Female', label: 'Female' },
	{ value: 'Other', label: 'Other' },
];

function GuestUser() {
	return (
		<Box
			p={2}
			mx={3}
			boxShadow="xs"
			border="1px"
			borderColor="gray.200"
			borderRadius="20px"
			style={{ boxShadow: '0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)', minWidth: '70%' }}
		>
			<Flex direction="column" ml={3}>
                <Flex mb={1} mt={3} style={{ justifyContent: 'center' }} mx="5">
                <Heading mb={4} fontWeight="500" fontSize="2rem">Guest Information</Heading>
                </Flex>
				<Flex mb={5} mt={3} style={{ justifyContent: 'center' }} mx="5">
					<Box flex="3" mr={3} maxWidth="150px">
						<Select defaultValue={title[0].value} options={title} placeholder="Title" />
					</Box>
					<Box flex="3" mr={3}>
						<Input placeholder="First Name"/>
					</Box>
					<Box flex="3">
						<Input placeholder="Last Name"/>
					</Box>
				</Flex>
				<Flex mb={5} style={{ justifyContent: 'center' }}>
					<Flex minWidth="55%">
						<Box flex="1" mr={3}>
							<Select defaultValue={gender[0].value} options={gender} placeholder="Gender" />
						</Box>
						<Box flex="5">
							<Input placeholder="Email"/>
						</Box>
					</Flex>
				</Flex>
				<Flex  mb={3} style={{ justifyContent: 'center' }}>
					<Button>Continue as a guest user</Button>
				</Flex>
				<Flex  mb={3} style={{ justifyContent: 'center' }}>
					<Button>Sign-In and Continue</Button>
				</Flex>
			</Flex>
		</Box>
	);
}
export default GuestUser;
