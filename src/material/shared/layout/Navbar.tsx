/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, ReactElement, useContext, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
import MenuList from '@material-ui/core/MenuList';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined';
import SyncAltOutlinedIcon from '@material-ui/icons/SyncAltOutlined';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import { EXCHANGES_INTERVAL } from 'config';

import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { resetAuthData } from 'stores/reducers/auth';
import { resetUsersData } from 'stores/reducers/users';
import { fetchExchanges } from 'stores/reducers/exchange';
import { ThemeContext, ThemeType } from 'material/ThemeProvider';

import LiquidityContext from 'context/liquidityMarket/liquidityContext';
import { fetchLiquidityMarkets } from 'stores/reducers/liquidityMarket';

import UserImg from 'assets/images/user.png';
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg';

import Switch from 'components/Switch';
import CryptoIcon from '../components/CryptoIcon';
import ExchangeLogo from '../components/ExchangeLogo';

import { LiquidityMarketResponse } from '../model/liquidity.model';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(6),
    },
    appBar: {
      padding: theme.spacing(0, 3),
    },
    toolbar: {
      minHeight: 80,
    },
    grow: {
      flexGrow: 1,
    },
    menuList: {
      backgroundColor: theme.palette.neutralsTwo.main,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    logoImage: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 145,
      marginRight: 24,
      marginLeft: 24,
    },
    noHover: {
      '&:hover': {
        background: 'none',
      },
    },
    buttonGroup: {
      '& .MuiButtonGroup-groupedTextHorizontal': {
        border: 'none',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
    exchangeClass: {
      minWidth: 150,
      marginRight: 15,
    },
    // drawer
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  })
);

interface HideOnScrollProps {
  children: ReactElement;
}

function HideOnScroll({ children }: HideOnScrollProps) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

interface SwipeableTemporaryDrawerProps {
  selectedLiquidityMarket: LiquidityMarketResponse | undefined;
}

const SwipeableTemporaryDrawer = ({ selectedLiquidityMarket }: SwipeableTemporaryDrawerProps) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsOpen(open);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <ExchangeLogo srcLogo={selectedLiquidityMarket?.exchangeId} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => console.log('wallet')}>
          <ListItemIcon>
            <AccountBalanceWalletOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Wallet" primaryTypographyProps={{ variant: 'h6' }} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        edge="end"
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </>
  );
};

let firstLoad = true;

const Navbar = (props: JSX.IntrinsicAttributes & HideOnScrollProps) => {
  const classes = useStyles();
  const baseTheme = useTheme();

  const phoneWidth = useMediaQuery(baseTheme.breakpoints.down('sm'));

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.users);
  const { exchanges, loadingExchanges } = useAppSelector((state) => state.exchange);

  const { selectedLiquidityMarket, selectedExchange, changeExchange } =
    useContext(LiquidityContext);

  const [anchorElNotifications, setAnchorElNotifications] = useState<null | HTMLElement>(null);
  const [anchorElProfile, setAnchorElProfile] = React.useState<null | HTMLElement>(null);
  const { theme, setTheme } = useContext(ThemeContext);

  const handleClickProfile = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorElProfile(event.currentTarget);
  const handleClickNotifications = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorElNotifications(event.currentTarget);

  const handleLogout = () => {
    dispatch(resetAuthData());
    dispatch(resetUsersData());
  };

  const handleCloseProfile = () => setAnchorElProfile(null);
  const handleCloseNotifications = () => setAnchorElNotifications(null);

  useEffect(() => {
    if (firstLoad) {
      firstLoad = false;
      dispatch(fetchExchanges());
    }

    if (exchanges) {
      changeExchange(exchanges[0]);
      dispatch(fetchLiquidityMarkets({ exchangeId: exchanges[0]?.id }));
    }

    const timer = setInterval(() => {
      if (!loadingExchanges) {
        dispatch(fetchExchanges());
      }
    }, EXCHANGES_INTERVAL * 1000);

    return () => clearInterval(timer);
  }, [exchanges]);

  const handleChangeExchange = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    console.log('handleExchange', event.target);
    if (exchanges && event.target.value) {
      const exchange = exchanges.find((ex) => ex.id === event.target.value);
      if (exchange) {
        changeExchange(exchange);
        dispatch(fetchLiquidityMarkets({ exchangeId: exchange?.id }));
      }
    }
  };

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
        style={{ marginRight: 10 }}
      >
        <Badge badgeContent={17} color="primary" variant="dot">
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
        <MenuItem onClick={handleCloseNotifications}>Some notifications?</MenuItem>
      </Menu>

      {!phoneWidth && (
        <>
          <Button
            variant="outlined"
            onClick={() => console.log('wallet')}
            style={{ marginRight: 10 }}
          >
            Wallet
          </Button>

          <IconButton
            color="inherit"
            style={{ marginRight: 10 }}
            onClick={() => setTheme(theme === ThemeType.darkThemePref)}
          >
            {theme === ThemeType.darkThemePref ? (
              <Brightness2OutlinedIcon />
            ) : (
              <Brightness4OutlinedIcon />
            )}
          </IconButton>
        </>
      )}

      <IconButton
        color="inherit"
        aria-label="menu"
        aria-controls="account-menu"
        aria-haspopup="true"
        onClick={handleClickProfile}
        disabled={!user}
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
        <MenuList className={classes.menuList}>
          <MenuItem onClick={handleCloseProfile} component={RouterLink} to="/profile">
            <ListItemAvatar>
              <Avatar>
                <PersonOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Profile"
              primaryTypographyProps={{ variant: 'h6' }}
              secondary="Important account details"
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </MenuItem>

          <Divider component="li" variant="middle" />

          <MenuItem onClick={handleCloseProfile} component={RouterLink} to="/settings">
            <ListItemAvatar>
              <Avatar>
                <SettingsOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{ variant: 'h6' }}
              secondary="View additional settings"
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </MenuItem>

          <Divider component="li" variant="middle" />

          <MenuItem>
            <ListItemAvatar>
              <Avatar>
                {theme === ThemeType.darkThemePref ? (
                  <Brightness2OutlinedIcon />
                ) : (
                  <Brightness4OutlinedIcon />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Dark mode"
              primaryTypographyProps={{ variant: 'h6' }}
              secondary="Switch dark/light mode"
              secondaryTypographyProps={{ variant: 'caption' }}
            />
            <Switch
              checked={theme === ThemeType.darkThemePref}
              onChange={() => setTheme(theme === ThemeType.darkThemePref)}
              name="darkMode"
            />
          </MenuItem>

          <Divider component="li" variant="middle" />

          {user && (
            <MenuItem onClick={handleLogout} component={RouterLink} to="/login">
              <ListItemAvatar>
                <Avatar>
                  <LogoutIcon stroke="currentColor" style={{ marginRight: 5 }} width="20" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Log out" primaryTypographyProps={{ variant: 'h6' }} />
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </>
  );

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar color="inherit" classes={{ root: classes.appBar }}>
          <Toolbar classes={{ root: classes.toolbar }}>
            {phoneWidth && (
              <>
                <SwipeableTemporaryDrawer selectedLiquidityMarket={selectedLiquidityMarket} />
                <Button
                  type="button"
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  component={RouterLink}
                  to="/orderbook"
                  className={classes.noHover}
                >
                  <ExchangeLogo srcLogo="emme" />
                </Button>
              </>
            )}
            {!phoneWidth && (
              <>
                {/* <ButtonGroup variant="text" color="inherit"> */}
                <Button
                  type="button"
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  component={RouterLink}
                  to="/orderbook"
                  className={classes.noHover}
                >
                  <ExchangeLogo srcLogo="emme" />
                </Button>

                {/* <Button
                    type="button"
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                    disabled
                  >
                    <ExchangeLogo srcLogo={selectedLiquidityMarket?.exchangeId} />
                  </Button>
                </ButtonGroup> */}

                <FormControl variant="outlined" className={classes.exchangeClass}>
                  <InputLabel>Exchange</InputLabel>
                  <Select
                    value={selectedExchange?.id || ''}
                    name="exchange"
                    label="Exchange"
                    onChange={handleChangeExchange}
                    disabled={!exchanges?.length}
                  >
                    {exchanges?.length &&
                      exchanges.map((ex) => (
                        <MenuItem key={ex.id} value={ex?.id}>
                          {ex?.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                <ButtonGroup
                  variant="text"
                  color="inherit"
                  size="small"
                  className={classes.buttonGroup}
                >
                  <Button type="button" disableFocusRipple disableRipple disableTouchRipple>
                    <CryptoIcon icon={selectedLiquidityMarket?.baseCoin} />
                  </Button>
                  <Button
                    type="button"
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                    disabled
                  >
                    <SyncAltOutlinedIcon />
                  </Button>
                  <Button type="button" disableFocusRipple disableRipple disableTouchRipple>
                    <CryptoIcon icon={selectedLiquidityMarket?.quoteCoin} />
                  </Button>
                </ButtonGroup>
              </>
            )}
            <div className={classes.grow} />
            {!phoneWidth && (
              <Button type="button" variant="text" endIcon={<KeyboardArrowDownIcon />}>
                BTC/USD
              </Button>
            )}
            <Typography color="inherit" align="center" noWrap>
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
