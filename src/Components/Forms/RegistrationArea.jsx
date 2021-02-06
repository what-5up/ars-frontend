import { React, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Heading } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
}));

const RegistrationArea = () => {
  const classes = useStyles();
  const [data, setData] = useState({
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

  return (
    <Box boxShadow="xl" borderRadius="10px" border="1px" borderColor="gray.200">
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <RegistrationHeader />
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  autoComplete="off"
                  onChange={(event) => handleChange(event)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="off"
                  onChange={(event) => handleChange(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  onChange={(event) => handleChange(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(event) => handleChange(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="confirmPassword"
                  id="confirmPassword"
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
        </div>
      </Container>
    </Box>
  );
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

export default RegistrationArea;
