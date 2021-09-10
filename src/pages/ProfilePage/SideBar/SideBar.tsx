import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import {
  List,
  ListItemText,
  ListItem,
  ListItemIcon,
  Divider,
} from "@material-ui/core";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import ComputerIcon from "@material-ui/icons/Computer";
import LockIcon from "@material-ui/icons/Lock";

interface Props {
  active?: number;
  onChange: (value: number) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    menuText: {
      color: "#777E91",
      fontSize: "14px",
      lineHeight: "16px",
    },
    menuTextActive: {
      color: "#FCFCFD",
      fontSize: "14px",
      lineHeight: "16px",
    },
    icon: {
      fontSize: "16px",
      minWidth: "auto",
      marginRight: "8px",
      color: "#777E91",
    },
    iconActive: {
      fontSize: "16px",
      minWidth: "auto",
      marginRight: "8px",
      color: "#FCFCFD",
    },
    listItem: {
      padding: "12px 0",
      margin: 0,
    },
    itemSelected: {
      background: "none !important",
      color: "#FCFCFD !important",
    },
  })
);

const SideBar: React.FC<Props> = ({ active, onChange }) => {
  const classes = useStyles();

  return (
    <div>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <ListItem
          classes={{
            root: classes.listItem,
            selected: classes.itemSelected,
          }}
          button
          selected={active === 1}
          onClick={() => onChange(1)}
        >
          <ListItemIcon
            classes={{
              root: active === 1 ? classes.iconActive : classes.icon,
            }}
          >
            <PermIdentityIcon />
          </ListItemIcon>
          <ListItemText
            className={active === 1 ? classes.menuTextActive : classes.menuText}
            primary="Profile"
          />
        </ListItem>
        <ListItem
          classes={{
            root: classes.listItem,
            selected: classes.itemSelected,
          }}
          button
          selected={active === 2}
          onClick={() => onChange(2)}
        >
          <ListItemIcon
            classes={{
              root: active === 2 ? classes.iconActive : classes.icon,
            }}
          >
            <KeyboardIcon />
          </ListItemIcon>
          <ListItemText
            className={active === 2 ? classes.menuTextActive : classes.menuText}
            primary="API keys"
          />
        </ListItem>

        <Divider />

        <ListItem
          classes={{
            root: classes.listItem,
            selected: classes.itemSelected,
          }}
          button
          selected={active === 3}
          onClick={() => onChange(3)}
        >
          <ListItemIcon
            classes={{
              root: active === 3 ? classes.iconActive : classes.icon,
            }}
          >
            <ComputerIcon />
          </ListItemIcon>
          <ListItemText
            className={active === 3 ? classes.menuTextActive : classes.menuText}
            primary="Sessions & login history"
          />
        </ListItem>

        <ListItem
          classes={{
            root: classes.listItem,
            selected: classes.itemSelected,
          }}
          button
          selected={active === 4}
          onClick={() => onChange(4)}
        >
          <ListItemIcon
            classes={{
              root: active === 4 ? classes.iconActive : classes.icon,
            }}
          >
            <LockIcon />
          </ListItemIcon>
          <ListItemText
            className={active === 4 ? classes.menuTextActive : classes.menuText}
            primary="Change password"
          />
        </ListItem>
      </List>
    </div>
  );
};

export default SideBar;
