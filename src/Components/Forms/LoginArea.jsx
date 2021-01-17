import { React, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  IconButton,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Link,
  Flex,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const VARIANT_COLOR = "teal";

const LoginArea = ({ onLogin }) => {
  return (
    <Flex
      //   minHeight="100vh"
      width="full"
      align="center"
      justifyContent="center"
      mt="10px"
    >
      <Box
        px={8}
        py={4}
        maxWidth="600px"
        borderRadius={10}
        width="full"
        bg="transparent"
      >
        <LoginHeader />
        <LoginForm onLogin={onLogin} />
      </Box>
    </Flex>
  );
};

LoginArea.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

const LoginHeader = () => {
  return (
    <Box textAlign="center">
      <Heading>Sign in to Your Account</Heading>
    </Box>
  );
};

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const handlePasswordShow = () => setPasswordShow(!passwordShow);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLogin();
    }, 3000);
  };
  return (
    <Box my={8} textAlign="center">
      <form onSubmit={handleSubmit}>
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
          <InputGroup>
            <Input
              type={passwordShow ? "text" : "password"}
              placeholder="Enter your Password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                variant="unstyled"
                colorScheme="teal"
                size="md"
                aria-label={passwordShow ? "Hide Password" : "Show Password"}
                onClick={handlePasswordShow}
                icon={passwordShow ? <ViewOffIcon /> : <ViewIcon />}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack isInline justifyContent="space-between" mt={4}>
          <Box>
            <Checkbox>Remember Me</Checkbox>
          </Box>
          <Box>
            <Link color={`${VARIANT_COLOR}.500`} href="#">
              Forget Your Password?
            </Link>
          </Box>
        </Stack>
        <Button
          type="submit"
          colorScheme={VARIANT_COLOR}
          rightIcon={<ArrowForwardIcon />}
          width="full"
          mt={4}
          isLoading={isSubmitting}
          loadingText="Signinig in"
        >
          Sign In
        </Button>
      </form>
    </Box>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginArea;
