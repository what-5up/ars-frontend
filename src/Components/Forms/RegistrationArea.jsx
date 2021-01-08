import { React, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Link,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const VARIANT_COLOR = "teal";

const RegistrationArea = ({ onRegistration }) => {
  return (
    <Flex
      mt="10px"
    >
      <Box
        px={8}
        py={4}
        borderRadius={10}
      >
        <RegistrationHeader />
        <RegistrationForm onRegistration={onRegistration} />
      </Box>
    </Flex>
  );
};

RegistrationArea.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};

const RegistrationHeader = ({ title, subtitle }) => {
  return (
    <Box textAlign="center">
      <Heading as="h2" size="lg" fontWeight="bold" color="primary.800">
        {title}
      </Heading>
      <Heading
        as="h3"
        size="md"
        color="primary.900"
        opacity="0.8"
        lineHeight={1.5}
      >
        {subtitle}
      </Heading>
    </Box>
  );
};

RegistrationHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
RegistrationHeader.defaultProps = {
  title: "Create Your Account",
  subtitle: "Join with us to make your dream journey....",
};

const RegistrationForm = ({ onRegistration }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onRegistration();
    }, 3000);
  };
  return (
    <Box my={8} textAlign="center">
      <form onSubmit={handleSubmit}>
        <Accordion defaultIndex={[0]} allowMultiple allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Section 1 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <FormControl>
                <FormLabel>Email Address:</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your Email Address"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password:</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your Password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormControl>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Section 2 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <FormControl>
                <FormLabel>Email Address:</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your Email Address"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password:</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your Password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormControl>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Button
          type="submit"
          colorScheme={VARIANT_COLOR}
          rightIcon={<ArrowForwardIcon />}
          width="full"
          mt={4}
          isLoading={isSubmitting}
          loadingText="Creating Account"
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

RegistrationForm.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};

export default RegistrationArea;
