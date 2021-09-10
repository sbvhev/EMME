import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';

import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { resetData } from 'stores/reducers/auth';

import Logo from 'components/Logo';
import UserImg from 'assets/images/user.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
    appBar: {
      padding: theme.spacing(0, 3),
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

interface HideOnScrollProps {
  children: React.ReactElement;
}

function HideOnScroll({ children }: HideOnScrollProps) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = (props: JSX.IntrinsicAttributes & HideOnScrollProps) => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  const [anchorElNotifications, setAnchorElNotifications] = useState<null | HTMLElement>(null);
  const [anchorElProfile, setAnchorElProfile] = React.useState<null | HTMLElement>(null);
  const [anchorElOrder, setAnchorElOrder] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    document.body.setAttribute('style', '');
  }, []);

  const handleClickProfile = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorElProfile(event.currentTarget);
  const handleClickOrder = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorElOrder(event.currentTarget);
  const handleClickNotifications = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorElNotifications(event.currentTarget);

  const handleLogout = () => {
    console.log('logout');
    dispatch(resetData());
  };

  const handleCloseProfile = () => setAnchorElProfile(null);
  const handleCloseOrder = () => setAnchorElOrder(null);
  const handleCloseNotifications = () => setAnchorElNotifications(null);

  const guestLinks = (
    <>
      <Button color="inherit" component={RouterLink} to="/signup">
        Signup
      </Button>
      <Button color="inherit" component={RouterLink} to="/login">
        Login
      </Button>
    </>
  );

  const loggedInLinks = (
    <>
      <IconButton
        aria-label="show 17 new notifications"
        color="inherit"
        aria-controls="notifications-menu"
        onClick={handleClickNotifications}
      >
        <Badge badgeContent={17} color="secondary" variant="dot">
          <NotificationsOutlinedIcon />
        </Badge>
      </IconButton>
      <Menu
        id="notifications-menu"
        anchorEl={anchorElNotifications}
        keepMounted
        open={Boolean(anchorElNotifications)}
        onClose={handleCloseNotifications}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Typography color="primary">
          <MenuItem onClick={handleCloseNotifications}>Some notifications?</MenuItem>
        </Typography>
      </Menu>

      <Button
        aria-controls="order-menu"
        variant="contained"
        color="primary"
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClickOrder}
      >
        Place Order
      </Button>
      <Menu
        id="order-menu"
        anchorEl={anchorElOrder}
        keepMounted
        open={Boolean(anchorElOrder)}
        onClose={handleCloseOrder}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Typography color="primary">
          <MenuItem onClick={handleCloseOrder}>Liquidity Order</MenuItem>
          <MenuItem onClick={handleCloseProfile}>Asks Order</MenuItem>
        </Typography>
      </Menu>

      <IconButton
        color="inherit"
        aria-label="menu"
        aria-controls="account-menu"
        aria-haspopup="true"
        onClick={handleClickProfile}
        // disabled={!user}
      >
        <img alt="user" src={UserImg} />
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorElProfile}
        keepMounted
        open={Boolean(anchorElProfile)}
        onClose={handleCloseProfile}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Typography color="primary">
          <MenuItem
            onClick={handleCloseProfile}
            component={RouterLink}
            to="/profile"
            style={{ color: 'inherit' }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={handleCloseProfile}
            component={RouterLink}
            to="/settings"
            style={{ color: 'inherit' }}
          >
            Settings
          </MenuItem>
          <MenuItem>Toggle Theme</MenuItem>
          {user && (
            <MenuItem
              onClick={handleLogout}
              component={RouterLink}
              to="/login"
              style={{ color: 'inherit' }}
            >
              Logout
            </MenuItem>
          )}
        </Typography>
      </Menu>
    </>
  );

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar color="primary" className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start">
              <Logo />
            </IconButton>
            <ButtonGroup variant="text" color="inherit">
              <Button type="button" variant="text" endIcon={<KeyboardArrowDownIcon />}>
                Bittrex
              </Button>
              <Button type="button" variant="text" endIcon={<KeyboardArrowDownIcon />}>
                BTC/USD
              </Button>
            </ButtonGroup>

            <div className={classes.grow} />

            <Typography color="inherit">
              {!user && guestLinks}
              {user && loggedInLinks}
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar className={classes.root} />
    </>
  );
};

export default Navbar;
