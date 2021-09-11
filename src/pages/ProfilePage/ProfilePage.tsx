import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Breadcrumbs, Typography, Link, Grid } from "@material-ui/core";
// icons
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

// components
import { Layout } from "layouts";
import SideBar from "./SideBar";
import ProfileInfo from "./ProfileInfo";
import ApiKeys from "./ApiKeys";
import Sessions from "./Sessions";
import ChangePassword from "./ChangePassword";

interface Props {
  title?: string;
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  main: {
    maxWidth: "1024px",
    margin: "0 auto 80px",
  },
  header: {
    display: "inline-flex",
    alignItems: "center",
    padding: "40px",
    width: "100%",
    marginBottom: "81px",
  },
  title: {
    color: "#FCFCFD",
    fontSize: "48px",
    lineHeight: "56px",
    margin: "0 auto 0 0",
  },
  breadLi: {},
  linkText: {
    color: "#777E91 !important",
    fontSize: "12px",
    lineHeight: "20px",
  },
  linkTextActive: {
    color: "#F4F5F6 !important",
    fontSize: "12px",

    lineHeight: "20px",
  },
  boxContent: {
    background: "#18191D",
    boxShadow: "0px 64px 64px -48px rgba(15, 15, 15, 0.1)",
    borderRadius: "16px",
    padding: "49px 40px",
  },
  mainHeader: {
    display: "inline-flex",
    alignItems: "flex-start",
    marginBottom: "48px",
    width: "100%",
  },
  mainTitle: {
    fontSize: "24px",
    lineHeight: "32px",
    margin: "0 0",
    color: "#FCFCFD",
  },
  mainSub: {
    fontSize: "14px",
    lineHeight: "24px",
    color: "#777E91",
    margin: "0 0 21px",
  },
  chipRoot: {
    border: "2px solid #353945",
    borderRadius: "90px",
    padding: "8px 0px",
    color: "#58BD7D",
    fontSize: "14px",
    lineHeight: "16px",
  },
  listItem: {
    padding: "12px 0px",
  },
  listItemSubheader: {
    padding: "16px 0 24px",
    textTransform: "uppercase",
    color: "#B1B5C4",
    fontSize: "12px",
    lineHeight: "12px",
    borderBottom: "1px solid #353945",
  },
  mb24: {
    marginBottom: "24px",
  },
  moreTextDark: {
    color: "#777E91",
    fontSize: "14px",
    lineHeight: "24px",
    fontWeight: 500,
    margin: "0",
  },
  action: {
    width: "100%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "24px",
  },
  btnSave: {
    width: "auto",
    padding: "16px 24px",
    background: "#3772FF",
    borderRadius: "90px",
    color: "#FCFCFD",
    fontSize: "16px",
    lineHeight: "16px",
  },
  headerLeft: {
    marginRight: "auto",
  },
});

const ProfilePage: React.FC<Props> = ({ title }) => {
  const classes = useStyles();
  const history = useHistory();
  const [menuIndex, setMenuIndex] = useState(2);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
    history.push("/");
  };

  const handleChangeMenu = (index: number) => {
    setMenuIndex(index);
  };

  return (
    <Layout>
      <div className={classes.main}>
        <div className={classes.header}>
          <h3 className={classes.title}>{menuIndex === 1 ? "Profile info" : "API keys"}</h3>

          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link
              color="inherit"
              href="/"
              onClick={handleClick}
              classes={{
                root: classes.linkText,
              }}
            >
              Home
            </Link>
            <Typography
              color="textPrimary"
              classes={{
                root: classes.linkTextActive,
              }}
            >
              {menuIndex === 1 ? "Profile info" : "API keys"}
            </Typography>
          </Breadcrumbs>
        </div>

        <div>
          <Grid container spacing={6}>
            <Grid item md={3}>
              <SideBar active={menuIndex} onChange={handleChangeMenu} />
            </Grid>

            <Grid item md={9}>
              {menuIndex === 1 && <ProfileInfo />}
              {menuIndex === 2 && <ApiKeys />}
              {menuIndex === 3 && <Sessions />}
              {menuIndex === 4 && <ChangePassword />}
            </Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
