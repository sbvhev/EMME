import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as LeftBackground } from "assets/svg/LeftBackground.svg";
import { FormInput, Notifications } from "components";

import { useAppDispatch, useAppSelector } from "stores/hooks";
import { fetchLoginUser, resetData } from "stores/reducers/auth";

const validateSchema = Yup.object().shape({
  email: Yup.string()
    .email("It should be valid email address!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Length must be at least 8 letters!")
    .max(50, "Length must be less than 50 letters!")
    .required("Required"),
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
  textMessage: {
    fontSize: "14px",
    lineHeight: "23px",
  },
  formTitle: {
    fontSize: "40px",
    lineHeight: "48px",
    textAlign: "center",
    letterSpacing: "-0.01em",
    marginBottom: "32px",
    paddingBottom: "32px",
    borderBottom: "1px solid #353945",
  },
  otherText: {
    fontSize: "14px",
    lineHeight: "16px",
    color: "#FCFCFD",
    textAlign: "center",
    fontWeight: "bold",
    textDecoration: "none",
    marginTop: "32px",

    "& a": {
      color: "#3772FF",
      marginLeft: "8px",
      textDecoration: "none",
    },
  },
}));

type Status = "success" | "warning" | "error";

function Login() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { isLogin, user, errors, loading } = useAppSelector(
    (state) => state.auth
  );

  const [openNotification, setOpenNotification] = useState(false);
  const [notifyType, setNotifyType] = useState<Status>("success");
  const [notifyMessage, setNotifyMessage] = useState("");

  useEffect(() => {
    if (errors && isLogin === false) {
      setNotifyMessage(
        errors.message || "The username or password you entered is incorrect."
      );
      setNotifyType("warning");

      setOpenNotification(true);
    }
  }, [errors, isLogin]);

  useEffect(() => {
    if (isLogin && user) {
      setNotifyMessage("You’ve successfully logged into the system.");
      setNotifyType("success");

      setOpenNotification(true);

      dispatch(resetData());
    }
  }, [isLogin, user, dispatch]);

  const handleSubmit = (values: any, actions: any) => {
    console.log("----here----", values);
    dispatch(fetchLoginUser(values));
  };

  const handleToggleNotification = () => {
    setOpenNotification(!openNotification);
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
        initialValues={{ email: "", password: "" }}
        validationSchema={validateSchema}
      >
        {({
          handleChange,
          values: { email, password },
          touched: { email: emailTouched, password: passwordTouched },
          errors: { email: emailError, password: passwordError },
          handleBlur,
        }) => {
          return (
            <Form className={classes.form}>
              <Box component="div" m={1}>
                <Notifications
                  message={
                    <span className={classes.textMessage}>{notifyMessage}</span>
                  }
                  open={openNotification}
                  onClose={handleToggleNotification}
                  type={notifyType}
                />

                <h2 className={classes.formTitle}>Sign in to EM.ME</h2>

                <FormInput
                  label="EMAIL"
                  id="email"
                  name="email"
                  placeholder="Email address"
                  value={email}
                  touched={emailTouched}
                  error={emailError}
                  type="email"
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
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  className={classes.submit}
                  type="submit"
                  size="large"
                >
                  Login
                </Button>
                <p className={classes.otherText}>
                  Don’t have an account?
                  <Link to="/signup">Sign up for free</Link>
                </p>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Grid>
  );
}

export default Login;
