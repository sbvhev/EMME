import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  // Switch,
  ListSubheader,
  Button,
} from "@material-ui/core";
// icons

// components
import { SelectCurrency, Switch } from "components";

interface Props {
  title?: string;
}

const useStyles = makeStyles({
  root: {
    width: "100%",
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

const ProfileInfo: React.FC<Props> = () => {
  const classes = useStyles();

  const [checkedValues, setCheckedValues] = React.useState({
    deposit: false,
    purchases: false,
    spotWallet: false,
    bankDeposit: false,
  });

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    console.log("name, checked: ", name, checked);
    setCheckedValues({ ...checkedValues, [name]: checked });
  };

  return (
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

        <SelectCurrency value={1} />
      </div>

      <div>
        <h2 className={`${classes.mainTitle} ${classes.mb24}`}>Features</h2>

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
                name="deposit"
                checked={checkedValues.deposit}
                onChange={handleChangeSwitch}
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
              <p className={classes.moreTextDark}>Enabled $1,000,000/day</p>
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
                name="purchases"
                checked={checkedValues.purchases}
                onChange={handleChangeSwitch}
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
                name="bankDeposit"
                checked={checkedValues.bankDeposit}
                onChange={handleChangeSwitch}
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
                name="spotWallet"
                checked={checkedValues.spotWallet}
                onChange={handleChangeSwitch}
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
              <p className={classes.moreTextDark}>Enabled 100x Leverage</p>
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
  );
};

export default ProfileInfo;
