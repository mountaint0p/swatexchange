import React from "react";
import {
	Box,
	Button,
	Heading,
	useColorModeValue,
	useDisclosure,
	Text,
	Center,
	Flex,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import searchIntialValues from "./searchInitialValues";

export default function Sidebar({
	children,
	setLoading,
	setItemList,
	paginate,
	originalItemList,
	searchFunctions,
	SearchFilterComponents,
	searchInitialValues,
}) {
	return (
		<Flex
			alignItems="center"
			minH="100vh"
			bg={useColorModeValue("gray.100", "gray.900")}
		>
			<SidebarContent
				display={{ base: "none", md: "block" }}
				setLoading={setLoading}
				setItemList={setItemList}
				paginate={paginate}
				originalItemList={originalItemList}
				searchFunctions={searchFunctions}
				SearchFilterComponents={SearchFilterComponents}
				searchInitialValues={searchInitialValues}
			/>
			<Flex direction="column" align="center" ml={{ base: 0, md: 80 }} p="4">
				{children}
			</Flex>
		</Flex>
	);
}

//Calls all search functions after submit
const filterSubmit = (
	values,
	originalItemList,
	setItemList,
	paginate,
	searchFunctions
) => {
	paginate(1);
	let newItemList = [...originalItemList];
	searchFunctions.forEach((searchFunction) => {
		newItemList = searchFunction(values, newItemList);
	});
	setItemList(newItemList);
};

const SidebarContent = (
	{
		setLoading,
		setItemList,
		paginate,
		originalItemList,
		searchFunctions,
		SearchFilterComponents,
		searchInitialValues,
	},
	{ onClose, ...rest }
) => {
	return (
		//SIDEBAR PROPERTIES
		<Box
			bg={useColorModeValue("white", "gray.900")}
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 80 }}
			pos={{ base: "static", md: "fixed" }}
			h={{ base: "280px", md: "full" }}
			{...rest}
			pt="10px"
		>
			<Heading ml={{ base: "20px", md: "10px" }} mb="10px" size="md" mt="20px">
				Search Filters
			</Heading>
			<Formik
				initialValues={searchIntialValues}
				onSubmit={(values) => {
					filterSubmit(
						values,
						originalItemList,
						setItemList,
						paginate,
						searchFunctions
					);
				}}
			>
				{({ values, handleChange }) => (
					<Form>
						<SearchFilterComponents
							values={values}
							handleChange={handleChange}
						/>
						<Center mt="20px">
							<Button type="submit" colorScheme="green" pl="30px" pr="30px">
								Search
							</Button>
						</Center>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

const MobileNav = ({ onOpen, ...rest }) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 24 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue("white", "gray.900")}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue("gray.200", "gray.700")}
			justifyContent="flex-start"
			{...rest}
		>
			<Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
				Logo
			</Text>
		</Flex>
	);
};
