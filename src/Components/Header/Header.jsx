import { React } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Stack,
  HStack,
  StackDivider,
  Wrap,
  WrapItem,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorMode,
  ReactRouterLink,
} from "@chakra-ui/react";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import LoginArea from "../LoginForm/LoginForm";

const Header = () => {
  const { colorMode, _ } = useColorMode();
  return (
    <Flex
      width="full"
      // position="fixed"
      // top="0"
      mb={4}
      bg={colorMode === "light" ? "white" : "rgba(0, 0, 40)"}
    >
      <Box width="full" boxShadow="lg">
        <Stack isInline justifyContent="space-between" px={8}>
          <LogoName />
          <Stack isInline justifyContent="space-between" mt={4} align="center">
            <Menu />
            <SignInArea />
            <ThemeSelector />
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
};

const LogoName = () => {
  return (
    <Heading
      as="h1"
      size="xlg"
      letterSpacing={".1rem"}
      fontSize="50px"
      fontFamily={"Agustina Regular"}
    >
      B Airways
    </Heading>
  );
};

const MenuItems = (props) => {
  const { children, isLast, to = "/", ...rest } = props;
  return (
    <Text
      fontSize="20px"
      fontWeight="bold"
      fontFamily={"Agustina Regular"}
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
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
const Menu = () => {
  return (
    <HStack divider={<StackDivider borderColor="gray.200" />}>
      <MenuItems to="/">Home</MenuItems>
      <MenuItems to="/discover">Discover </MenuItems>
      <MenuItems to="/contact-us">Contact Us </MenuItems>
      <MenuItems to="/register" isLast>
        Register
      </MenuItems>
    </HStack>
  );
};

const SignInArea = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Wrap>
        <WrapItem>
          <Avatar size="sm" onClick={onOpen} cursor="pointer" />{" "}
        </WrapItem>
      </Wrap>
      <Button
        bg="transparent"
        colorScheme="teal"
        variant="ghost"
        fontSize="20px"
        fontWeight="bold"
        fontFamily={"Agustina Regular"}
        onClick={onOpen}
      >
        Sign in
      </Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        motionPreset="slideInBottom"
        isCentered
        closeOnEsc
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <LoginArea onLogin={() => console.log("Logged in")} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Header;
