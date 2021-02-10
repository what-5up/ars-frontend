import { React, useState } from "react";
import PropTypes from "prop-types";
import { Input, Select, Box, Button, Heading } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const RegistrationArea = () => {
  return (
    <Box m={8} pb={2}>
      <Container component="main" maxWidth="md">
        <div>
          <RegistrationHeader />
          <RegistrationForm />
        </div>
      </Container>
    </Box>
  );
};

const RegistrationHeader = ({ title, subtitle }) => {
  return (
    <Box textAlign="center" mb={8}>
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

const RegistrationForm = () => {
  const titleList = ["Mr.", "Mrs.", "Miss", "Rev"];
  const [data, setData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    var value = event.target.value;

    setData({ ...data, [event.target.name]: value });
  };
  const handleTitleChange = (event) => {
    setData({ ...data, title: event.target.value });
  };
  return (
    <Box mt={8} textAlign="center">
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <Select
              placeholder="Title"
              isRequired
              onChange={handleTitleChange}
              value={data.title}
            >
              {titleList.map((title) => (
                <option value={title}>{title}</option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Input
              name="firstName"
              placeholder="First Name"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              autoComplete="off"
              onChange={(event) => handleChange(event)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Input
              required
              fullWidth
              id="lastName"
              label="Last Name"
              placeholder="Last Name"
              name="lastName"
              autoComplete="off"
              onChange={(event) => handleChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              required
              fullWidth
              id="email"
              label="Email Address"
              placeholder="Email Address"
              name="email"
              autoComplete="off"
              onChange={(event) => handleChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              required
              fullWidth
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              id="password"
              onChange={(event) => handleChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="off"
              onChange={(event) => handleChange(event)}
            />
          </Grid>
        </Grid>
        <Button
          colorScheme="teal"
          size="lg"
          type="submit"
          rightIcon={<ArrowForwardIcon />}
          width="full"
          mt={4}
          loadingText="Registering"
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegistrationArea;
