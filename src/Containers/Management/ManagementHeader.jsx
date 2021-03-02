import { React} from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Box,
  Heading,
  Text,
  Stack,
  StackDivider,
  useColorMode,
  ReactRouterLink,
} from "@chakra-ui/react";
import Media from "react-media";
import { connect } from "react-redux";
import ThemeSelector from "../../Components/ThemeSelector/ThemeSelector";
import MyProfilePopup from "../../Components/Popups/MyProfilePopup";

const ManagementHeader = () => {
  const { colorMode, _ } = useColorMode();
  return (
    <Flex
      width="full"
      mb={4}
      borderBottomRadius="2rem"
      bgGradient={
        colorMode === "light"
          ? "linear(to-r, #7928CA, #9883a8)"
          : "linear(to-l, #382859, #3d4e69)"
      }
    >
      <Box width="full" boxShadow="lg" borderBottomRadius="2rem">
        <Stack isInline justifyContent="space-between" px={8}>
          <LogoName />
          <Stack isInline justifyContent="space-between" mt={4} align="center">
            <Menu direction={"row"} />
            <ThemeSelector />
            <MyProfilePopup />
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
};

const LogoName = () => {
  return (
    <>
      <Media query="(max-width: 599px)">
        <Heading
          as="h1"
          size="xlg"
          letterSpacing={".1rem"}
          fontSize="30px"
          fontFamily={"Agustina Regular"}
          py="1"
        >
          B Airways
        </Heading>
      </Media>
      <Media query="(min-width: 600px)">
        <Heading
          as="h1"
          size="xlg"
          letterSpacing={".1rem"}
          fontSize="50px"
          fontFamily={"Agustina Regular"}
        >
          B Airways
        </Heading>
      </Media>
    </>
  );
};

const MenuItems = (props) => {
  const { children, isLast, to = "/", ...rest } = props;
  return (
    <Text
      fontSize="20px"
      fontWeight="bold"
      fontFamily={"Agustina Regular"}
      mb={{ base: 2, sm: 0 }}
      mr={{ base: 0, sm: 8 }}
      display="block"
      {...rest}
    >
      <Link as={ReactRouterLink} to={to}>
        {children}
      </Link>
    </Text>
  );
};
const Menu = ({ direction }) => {
  return (
    <Stack
      direction={direction}
      divider={<StackDivider borderColor="gray.200" />}
    >
      <MenuItems to="/">Home</MenuItems>
    </Stack>
  );
};

export default connect(null, null)(ManagementHeader);
