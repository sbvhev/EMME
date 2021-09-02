import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FormInput } from "components";
import { ReactComponent as LeftBackground } from "assets/svg/LeftBackground.svg";

const validateSchema = Yup.object().shape({
  email: Yup.string()
    .email("It should be valid email address!")
    .required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  password: Yup.string()
    .min(8, "Length must be at least 8 letters!")
    .max(50, "Length must be less than 50 letters!")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    display: "flex",
  },
  paper: {
    position: "relative",
    flexDirection: "column-reverse",

    "& svg": {
      height: "100vh",
      width: "auto",
    },
  },
  content: {
    position: "absolute",
    width: `calc(100% - ${theme.spacing(10)}px)`,
    height: `calc(100% - ${theme.spacing(10)}px)`,
    padding: theme.spacing(5),
    "& > div": {
      display: "flex",
      marginBottom: theme.spacing(2),
      "& > p": {
        marginTop: 0,
        marginLeft: theme.spacing(1),
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
      },
    },
    "& > span": {
      color: "white",
      fontWeight: "bold",
      fontSize: 28,
    },
  },
  submit: {
    marginTop: theme.spacing(2),
    textTransform: "initial",
  },
  form: {
    flex: 1,
    display: "flex",
    background: theme.palette.background.paper,

    "& > div": {
      width: "100%",
      padding: theme.spacing(2),
      maxWidth: 400,
      margin: "auto",
    },
    "& label": {
      fontWeight: "bold",
    },
    "& input": {},
  },
  helperText: {
    minHeight: 16,
  },
}));

function SignUp() {
  const classes = useStyles();

  const handleSubmit = (values: any, actions: any) => {
    console.log("----here----", values);
  };

  return (
    <Grid container spacing={0} className={classes.container}>
      <Box
        component="span"
        className={classes.paper}
        display={{ xs: "none", md: "flex" }}
      >
        <LeftBackground />
      </Box>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
        }}
        validationSchema={validateSchema}
      >
        {({
          handleChange,
          values: { email, password, confirmPassword, firstName, lastName },
          touched: {
            email: emailTouched,
            password: passwordTouched,
            confirmPassword: confirmPasswordTouched,
            firstName: firstNameTouched,
            lastName: lastNameTouched,
          },
          errors: {
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError,
            firstName: firstNameError,
            lastName: lastNameError,
          },
          handleBlur,
        }) => {
          return (
            <Form className={classes.form}>
              <Box component="div" m={1}>
                <FormInput
                  label="EMAIL"
                  id="email"
                  name="email"
                  placeholder="Email address"
                  value={email}
                  touched={emailTouched}
                  error={emailError}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
                <FormInput
                  label="FIRST NAME"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={firstName}
                  touched={firstNameTouched}
                  error={firstNameError}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
                <FormInput
                  label="Last NAME"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  touched={lastNameTouched}
                  error={lastNameError}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
                <FormInput
                  label="PASSWORD"
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  touched={passwordTouched}
                  error={passwordError}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
                <FormInput
                  label="CONFIRM PASSWORD"
                  id="password"
                  name="confirmPassword"
                  placeholder="Password"
                  type="password"
                  value={confirmPassword}
                  touched={confirmPasswordTouched}
                  error={confirmPasswordError}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  className={classes.submit}
                  type="submit"
                  size="large"
                >
                  Sign up
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Grid>
  );
}

export default SignUp;