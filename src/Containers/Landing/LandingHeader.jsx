import { React, useRef } from "react";
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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Media from "react-media";
import { connect, useSelector } from 'react-redux';
import ThemeSelector from "../../Components/ThemeSelector/ThemeSelector";
import LoginArea from "../../Components/Forms/LoginArea";

const LandingHeader = () => {
  const { colorMode, _ } = useColorMode();
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  return (
    <Flex
      width="full"
      // position="fixed"
      // top="0"
      mb={4}
      borderBottomRadius="2rem"
      bgGradient={
        colorMode === "light" ? "linear(to-r, #7928CA, #9883a8)"  : "linear(to-l, #382859, #3d4e69)"
      }
    >
      <Box width="full" boxShadow="lg" borderBottomRadius="2rem">
        <Stack isInline justifyContent="space-between" px={8}>
          <LogoName />

          <Media
            queries={{
              small: "(max-width: 599px)",
              medium: "(min-width: 600px) and (max-width: 1099px)",
              large: "(min-width: 1100px)",
            }}
          >
            {(matches) => (
              <>
                {matches.small && <MenuDrawer />}
                {matches.medium && <MenuDrawer />}
                {matches.large && (
                  <Stack
                    isInline
                    justifyContent="space-between"
                    mt={4}
                    align="center"
                  >
                    <Menu direction={"row"} />
                    <SignInArea withAvatar={true} isAuthenticated = {isAuthenticated} />
                    <ThemeSelector />
                  </Stack>
                )}
              </>
            )}
          </Media>
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
      <MenuItems to="/discover">Discover </MenuItems>
      <MenuItems to="/contact-us">Contact Us </MenuItems>
      <MenuItems to="/register" isLast>
        Register
      </MenuItems>
    </Stack>
  );
};

const SigninButton = ({ onOpen }) => {
  return (
    <Button
      bg="transparent"
      colorScheme="teal"
      variant="ghost"
      fontSize="20px"
      fontWeight="bold"
      fontFamily={"Agustina Regular"}
      onClick={onOpen}
      px={0}
    >
      Sign in
    </Button>
  );
};

const SignInArea = ({ withAvatar, isAuthenticated }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Wrap>
        <WrapItem>
          <Avatar
            size="sm"
            onClick={() => console.log(!isAuthenticated ? onOpen : null)}
            cursor="pointer"
            display={withAvatar ? "block" : "none"}
          />
        </WrapItem>
      </Wrap>
      <SigninButton onOpen={!isAuthenticated ? onOpen : null} />
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
            <LoginArea onLogin={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const MenuDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <HStack>
        <IconButton
          icon={<HamburgerIcon />}
          size="xlg"
          onClick={onOpen}
          variant="ghost"
          ref={btnRef}
        ></IconButton>
        <ThemeSelector />
      </HStack>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <LogoName />
            </DrawerHeader>

            <DrawerBody>
              <Menu direction={"column"} />
              <SignInArea withAvatar={false} />
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default connect(null, null)( LandingHeader );
