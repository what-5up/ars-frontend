import { React, useRef, useEffect, useState, useCallback } from "react";
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
import { connect, useSelector, useDispatch } from "react-redux";
import ThemeSelector from "../../Components/ThemeSelector/ThemeSelector";
import LoginArea from "../../Components/Forms/LoginArea";
import RegistrationArea from "../../Components/Forms/RegistrationArea";
import MyProfilePopup from "../../Components/Popups/MyProfilePopup";
import { getUser } from "../../api";
import * as actions from '../../store/actions/index';

const LandingHeader = () => {
  const { colorMode, _ } = useColorMode();
  const isAuthenticated = useSelector((state) => state.auth.userAuthenticated);
  const userID = useSelector((state) => state.auth.userID);
  const [user, setUser] = useState({
    title: null,
    firstName : null,
    lastName: null,
    desc: null,
    email: null
  });

  useEffect(async () => {
    const result = await getUser(userID);
    if (result.data) {
      setUser({
        title: result.data.title_name,
        firstName: result.data.first_name,
        lastName: result.data.last_name,
        desc: result.data.account_type_name,
        email: result.data.email
      });
    }
  }, [userID]);

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

          <Media
            queries={{
              small: "(max-width: 599px)",
              medium: "(min-width: 600px) and (max-width: 1099px)",
              large: "(min-width: 1100px)",
            }}
          >
            {(matches) => (
              <>
                {matches.small && (
                  <MenuDrawer isAuthenticated={isAuthenticated} />
                )}
                {matches.medium && (
                  <MenuDrawer isAuthenticated={isAuthenticated} />
                )}
                {matches.large && (
                  <Stack
                    isInline
                    justifyContent="space-between"
                    mt={4}
                    align="center"
                  >
                    <Menu direction={"row"} isAuthenticated={isAuthenticated} />
                    <ThemeSelector />
                    {!isAuthenticated ? (
                      <SignInArea
                        withAvatar={false}
                        isAuthenticated={isAuthenticated}
                      />
                    ) : (
                      <MyProfilePopup user={user}/>
                    )}
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
const Menu = ({ direction, isAuthenticated }) => {
  const dispatch = useDispatch()
  const onLogout = useCallback(
    () => dispatch(actions.logout()),
    [dispatch]
  )

  return (
    <Stack
      direction={direction}
      divider={<StackDivider borderColor="gray.200" />}
    >
      <MenuItems to="/">Home</MenuItems>
      <MenuItems to="/discover">Discover </MenuItems>
      {isAuthenticated ? (
      <MenuItems to="/bookings">Bookings </MenuItems>
      ) : null}
      {!isAuthenticated ? <RegisterArea /> : null}
      {direction === "column" && isAuthenticated && <CustomButton title="Sign Out" onOpen={onLogout}/>}
    </Stack>
  );
};

const CustomButton = ({ title, onOpen }) => {
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
      _hover={{ bg: "trasparent" }}
      _selected={{ bg: "trasparent" }}
    >
      {title}
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
            onClick={!isAuthenticated ? onOpen : null}
            cursor="pointer"
            display={withAvatar ? "block" : "none"}
          />
        </WrapItem>
      </Wrap>
      <CustomButton title="Sign In" onOpen={!isAuthenticated ? onOpen : null} />
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

const RegisterArea = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <CustomButton title="Register" onOpen={onOpen} />
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="4xl"
        motionPreset="slideInBottom"
        isCentered
        closeOnEsc
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <RegistrationArea onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const MenuDrawer = ({ isAuthenticated }) => {
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
              <Menu direction={"column"} isAuthenticated={isAuthenticated} />
              {!isAuthenticated ? <SignInArea withAvatar={false} /> : null}
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default connect(null, null)(LandingHeader);
