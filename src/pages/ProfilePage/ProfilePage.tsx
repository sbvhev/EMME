import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Breadcrumbs,
  Typography,
  Link,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  ListSubheader,
  Button,
} from "@material-ui/core";
// icons
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

// components
import { Layout } from "layouts";
import { SelectCountry } from "components";
import SideBar from "./SideBar";

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
  const [checked, setChecked] = React.useState(["wifi"]);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  };

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <Layout>
      <div className={classes.main}>
        <div className={classes.header}>
          <h3 className={classes.title}>Profile info</h3>

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
              Profile info
            </Typography>
          </Breadcrumbs>
        </div>

        <div>
          <Grid container spacing={6}>
            <Grid item md={3}>
              <SideBar active={1} />
            </Grid>

            <Grid item md={9}>
              <div className={classes.boxContent}>
                <div className={classes.mainHeader}>
                  <div className={classes.headerLeft}>
                    <h3 className={classes.mainTitle}>Breanne Schinner</h3>
                    <p className={classes.mainSub}>schinner@icloud.com</p>
                    <Chip
                      classes={{
                        root: classes.chipRoot,
                      }}
                      label="EM.ME Balance: 50,000"
                      variant="outlined"
                    />
                  </div>

                  <SelectCountry value={1} />
                </div>

                <div>
                  <h2 className={`${classes.mainTitle} ${classes.mb24}`}>
                    Features
                  </h2>

                  <List
                    subheader={
                      <ListSubheader
                        classes={{
                          root: classes.listItemSubheader,
                        }}
                      >
                        level 1
                      </ListSubheader>
                    }
                    className={classes.root}
                  >
                    <ListItem
                      classes={{
                        root: classes.listItem,
                      }}
                    >
                      <ListItemText
                        id="switch-list-label-wifi"
                        primary="Deposit assets"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          color="primary"
                          edge="end"
                          onChange={handleToggle("deposit")}
                          checked={checked.indexOf("deposit") !== -1}
                          inputProps={{
                            "aria-labelledby": "switch-list-label-wifi",
                          }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem
                      classes={{
                        root: classes.listItem,
                      }}
                    >
                      <ListItemText
                        id="switch-list-label-bluetooth"
                        primary="Withdraw assets"
                      />
                      <ListItemSecondaryAction>
                        <p className={classes.moreTextDark}>
                          Enabled $1,000,000/day
                        </p>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem
                      classes={{
                        root: classes.listItem,
                      }}
                    >
                      <ListItemText
                        id="switch-list-label-bluetooth"
                        primary="Card purchases"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          color="primary"
                          edge="end"
                          onChange={handleToggle("purchases")}
                          checked={checked.indexOf("purchases") !== -1}
                          inputProps={{
                            "aria-labelledby": "switch-list-label-bluetooth",
                          }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem
                      classes={{
                        root: classes.listItem,
                      }}
                    >
                      <ListItemText
                        id="switch-list-label-bluetooth"
                        primary="Bank deposit"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          color="primary"
                          edge="end"
                          onChange={handleToggle("bankDeposit")}
                          checked={checked.indexOf("bankDeposit") !== -1}
                          inputProps={{
                            "aria-labelledby": "switch-list-label-bluetooth",
                          }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>

                  <List
                    subheader={
                      <ListSubheader
                        classes={{
                          root: classes.listItemSubheader,
                        }}
                      >
                        level 2
                      </ListSubheader>
                    }
                    className={classes.root}
                  >
                    <ListItem
                      classes={{
                        root: classes.listItem,
                      }}
                    >
                      <ListItemText
                        id="switch-list-label-wifi"
                        primary="Fiat and Spot wallet"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          color="primary"
                          edge="end"
                          onChange={handleToggle("spotWallet")}
                          checked={checked.indexOf("spotWallet") !== -1}
                          inputProps={{
                            "aria-labelledby": "switch-list-label-wifi",
                          }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem
                      classes={{
                        root: classes.listItem,
                      }}
                    >
                      <ListItemText
                        id="switch-list-label-bluetooth"
                        primary="Margin wallet"
                      />
                      <ListItemSecondaryAction>
                        <p className={classes.moreTextDark}>
                          Enabled 100x Leverage
                        </p>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </div>

                <div className={classes.action}>
                  <Button className={classes.btnSave} color="primary">
                    Save settings
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
