import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import LogoIcon from "assets/images/emme-green.png";
// import LogoIcon from "assets/icons/logo.svg";

interface Props {
  width?: number;
}

const useStyles = makeStyles({
  logo: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    "&:hover": {
      cursor: "pointer",
    },
  },
  img: {
    width: "100%",
  },
});

const Logo: React.FC<Props> = ({ width }) => {
  const classes = useStyles();

  return (
    <Link
      to="/"
      className={classes.logo}
      style={{ width: `${width || 145}px` }}
    >
      <img className={classes.img} alt="" src={LogoIcon} />
    </Link>
  );
};

export default Logo;
