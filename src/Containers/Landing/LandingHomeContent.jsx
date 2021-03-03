import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import RegistrationArea from "../../Components/Forms/RegistrationArea";
import { connect, useSelector } from "react-redux";

const LandingHomeContent = ({
  title,
  subtitle1,
  subtitle2,
  images,
  ctaLink,
  ctaText,
  ...rest
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const isAuthenticated = useSelector((state) => state.auth.userAuthenticated);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((imageIndex) => (imageIndex + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="no-wrap"
      minH="70vh"
      px={8}
      mb={16}
      {...rest}
    >
      <Stack
        spacing={4}
        w={{ base: "50%", md: "40%" }}
        align={["center", "center", "flex-start", "flex-start"]}
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
        >
          {title}
        </Heading>
        <Heading
          as="h2"
          fontSize="36px"
          color="primary.900"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          {subtitle1[imageIndex]}
        </Heading>
        <Heading
          as="h2"
          fontSize="26px"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          {subtitle2[imageIndex]}
        </Heading>
        <Text
          fontSize="s"
          mt={2}
          textAlign="center"
          color="primary.800"
          opacity="0.6"
        >
          Terms and conditions apply.
        </Text>
        {!isAuthenticated && <CreateNewAccountButton ctaText={ctaText} />}
      </Stack>
      <Box w={{ base: "90%", sm: "70%", md: "65%" }} mb={{ base: 12, md: 0 }}>
        <Image
          src={images[imageIndex]}
          rounded="1rem"
          shadow="2xl"
          size="50%"
        />
      </Box>
    </Flex>
  );
}

LandingHomeContent.propTypes = {
  title: PropTypes.string,
  subtitle1: PropTypes.string,
  subtitle2: PropTypes.string,
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string,
};

LandingHomeContent.defaultProps = {
  title: "Welcome",
  subtitle1: [
    "Instant Booking",
    "24x7 Availability",
    "Account Benefits",
    "Preferred Seats",
    "Notification on Delays"
  ],
  subtitle2: [
    "Book your flight instantly with our online system",
    "Book your flight in anytime, anywhere",
    "Earn upto 20% discounts and more",
    "Reserve a seat of your choosing",
    "Get instant emails on any update of your bookings"
  ],
  images: [
    "/images/instant.jpg",
    "/images/247.jpg",
    "/images/account.jpg",
    "/images/seats.jpg",
    "/images/delay.jpg"
  ],
  ctaText: "Create your account now",
};

const CreateNewAccountButton = ({ ctaText }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        borderRadius="8px"
        py="4"
        px="4"
        lineHeight="1"
        size="md"
        onClick={onOpen}
        colorScheme="purple"
        variant="outline"
      >
        {ctaText}
      </Button>
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
            <RegistrationArea />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default connect(null, null)(LandingHomeContent);