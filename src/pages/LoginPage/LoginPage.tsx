import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  mainContainer: {},
}));

const LandingPage: React.FC = () => {
  const classes = useStyles();

  return <Grid container className={classes.mainContainer}></Grid>;
};

export default LandingPage;
