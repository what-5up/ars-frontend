import React, { useState } from 'react';
import { Box, Flex, Input, InputGroup, InputLeftElement, FormLabel, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Select from 'react-select';
import SortIcon from '@material-ui/icons/Sort';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const options = [
	{ value: 'All', label: 'All' },
	{ value: 'Upcoming', label: 'Upcoming' },
	{ value: 'Past', label: 'Past' },
];

function SearchComponent() {
	return (
		<Box
			mt={6}
			style={{
				boxShadow: '0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)',
				padding: '20px',
				width:"80%"
			}}
		>
			<Flex style={{}}>
				<Box flex={5} mr={3}>
					<InputGroup>
						<InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
						<Input type="tel" placeholder="Search" />
					</InputGroup>
				</Box>
				<Box flex={3} ml={5}>
					<Select
						style={{ width: '100%', flex: 2 }}
						defaultValue={options[0].label}
						options={options}
						placeholder="State"
						// components ={{Control}}
					/>
				</Box>
				<Box flex={1} ml={3}>
					<Button>
						<SortIcon />
					</Button>
				</Box>
				<Box flex={2}>
					<Button style={{ backgroundColor: 'transparent' }}>
						<ArrowForwardIosIcon />
					</Button>
				</Box>
			</Flex>
		</Box>
	);
}
export default SearchComponent;
