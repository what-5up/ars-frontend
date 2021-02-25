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

export default function LandingHomeContent({
  title,
  subtitle1,
  subtitle2,
  images,
  ctaLink,
  ctaText,
  ...rest
}) {
  const [imageIndex, setImageIndex] = useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((imageIndex) => (imageIndex + 1) % images.length);
    }, 3000);
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
        w={{ base: "80%", md: "40%" }}
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
          size="lg"
          color="primary.900"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          {subtitle1}
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          {subtitle2}
        </Heading>
        <Text
          fontSize="xs"
          mt={2}
          textAlign="center"
          color="primary.800"
          opacity="0.6"
        >
          Terms and conditions apply.
        </Text>
        <CreateNewAccountButton ctaText={ctaText} />
      </Stack>
      <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
        <Image
          src={images[imageIndex]}
          size="100%"
          rounded="1rem"
          shadow="2xl"
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
  subtitle1: "Plan ahead with guaranteed flexibility",
  subtitle2:
    "Benefit from guaranteed flexibility on bookings made until 30 April 2021* including unlimited date or destination changes and fee-free refunds.",
  images: [
    "/images/artur-tumasjan-KZSNMN4VxR8-unsplash.jpg",
    "/images/tobias-zils-FZRvB6KoRxE-unsplash.jpg",
    "/images/chuttersnap-mytSmcgVHRE-unsplash.jpg",
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
