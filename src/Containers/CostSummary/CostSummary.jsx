import React, { useState, useEffect } from 'react';
import {
	Flex,
	Button,
	Accordion,
	AccordionButton,
	AccordionItem,
	Box,
	AccordionPanel,
	Heading,
	Text,
	Divider,
} from '@chakra-ui/react';
import AddPassenger from '../../Components/Cards/AddPassenger';
import { useLocation, useHistory } from 'react-router-dom';
import CostSummary from '../../Components/Cards/CostSummary';

const Cost = () => {
	return (
		<Box
			width="95%"
			mx="auto"
			p={5}
			style={{
				boxShadow: '0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)',
				minWidth: '80%',
				borderColor: 'gray.200',
			}}
		>
			<Heading ml="12" mt="3" mb="5" fontWeight="400" textAlign="center">
				COST SUMMARY
			</Heading>
			<Divider />
			<Flex mt="5" width="100%"> 
				<CostSummary />
			</Flex>
		</Box>
	);
};
export default Cost;
