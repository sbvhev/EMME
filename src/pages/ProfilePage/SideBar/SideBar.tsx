/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { List, ListItemText, ListItem, ListItemIcon, Divider } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import ComputerIcon from '@material-ui/icons/Computer';
import LockIcon from '@material-ui/icons/Lock';

interface Props {
  active?: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    menuText: {
      color: '#777E91',
      fontSize: '14px',
      lineHeight: '16px',
    },
    icon: {
      fontSize: '16px',
      minWidth: 'auto',
      marginRight: '8px',
      color: '#777E91',
    },
    listItem: {
      padding: '12px 0',
      margin: 0,
    },
  })
);

const SideBar = ({ active }: Props) => {
  const classes = useStyles();

  return (
    <div>
      <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
        <ListItem
          classes={{
            root: classes.listItem,
          }}
          button
        >
          <ListItemIcon
            classes={{
              root: classes.icon,
            }}
          >
            <PermIdentityIcon />
          </ListItemIcon>
          <ListItemText className={classes.menuText} primary="Profile" />
        </ListItem>
        <ListItem
          classes={{
            root: classes.listItem,
          }}
          button
        >
          <ListItemIcon
            classes={{
              root: classes.icon,
            }}
          >
            <KeyboardIcon />
          </ListItemIcon>
          <ListItemText className={classes.menuText} primary="API keys" />
        </ListItem>

        <Divider />

        <ListItem
          classes={{
            root: classes.listItem,
          }}
          button
        >
          <ListItemIcon
            classes={{
              root: classes.icon,
            }}
          >
            <ComputerIcon />
          </ListItemIcon>
          <ListItemText className={classes.menuText} primary="Sessions & login history" />
        </ListItem>

        <ListItem
          classes={{
            root: classes.listItem,
          }}
          button
        >
          <ListItemIcon
            classes={{
              root: classes.icon,
            }}
          >
            <LockIcon />
          </ListItemIcon>
          <ListItemText className={classes.menuText} primary="Change password" />
        </ListItem>
      </List>
    </div>
  );
};

SideBar.defaultProps = {
  active: undefined,
};

export default SideBar;
