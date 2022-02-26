import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import {
  List,
  ListItemText,
  ListItem,
  ListItemIcon,
  // Divider,
} from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import KeyboardIcon from '@material-ui/icons/Keyboard';
// import ComputerIcon from "@material-ui/icons/Computer";
// import LockIcon from "@material-ui/icons/Lock";

interface Props {
  active?: number;
  onChange: (value: number) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    menuText: {
      fontSize: '14px',
      lineHeight: '16px',
    },
    menuTextActive: {
      fontSize: '14px',
      lineHeight: '16px',
    },
    icon: {
      fontSize: '16px',
      minWidth: 'auto',
      marginRight: '8px',
    },
    iconActive: {
      fontSize: '16px',
      minWidth: 'auto',
      marginRight: '8px',
    },
    listItem: {
      padding: '12px 0',
      margin: 0,
    },
  })
);

const SideBar = ({ active, onChange }: Props) => {
  const classes = useStyles();

  return (
    <div>
      <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
        <ListItem
          classes={{
            root: classes.listItem,
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
      </List>
    </div>
  );
};

SideBar.defaultProps = {
  active: undefined,
};

export default SideBar;
