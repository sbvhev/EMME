import React, { ReactNode } from "react";
import { useHistory } from "react-router-dom";
import {
  alpha,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";

import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import AddIcon from "@material-ui/icons/Add";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  Divider,
  Button,
} from "@material-ui/core";

import { Logo, Switch } from "components";
import BellIcon from "assets/icons/bell.svg";
import UserImg from "assets/images/user.png";
import FbIcon from "assets/icons/facebook.svg";
import TwIcon from "assets/icons/twitter.svg";

interface Props {
  children: ReactNode | any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    layoutContent: {
      width: "100%",
    },
    appBar: {
      background: "#141416",
      padding: "20px 52px ",
      borderBottom: "1px solid #353945",
    },
    toolbar: {
      minHeight: 40,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    btnDropdown1: {
      background: "#141416",
      borderRadius: 0,
      border: "none",
      color: "#777E91",
      fontSize: 14,
      lineHeight: "16px",
      margin: 0,
      width: "auto",
      padding: "12px 40px",
      borderLeft: "1px solid #353945",
    },
    btnDropdown2: {
      background: "#141416",
      borderRadius: 0,
      border: "none",
      color: "#FCFCFD",
      fontSize: 14,
      lineHeight: "16px",
      margin: 0,
      width: "auto",
      padding: "12px 40px",
      borderLeft: "1px solid #353945",
    },
    menuOrder: {
      padding: 16,
    },
    paperMenu: {
      padding: "0 16px",
      background: "#23262F",
      borderRadius: "12px",
      border: "none",
      boxShadow: "0px 16px 64px -48px rgba(31, 47, 70, 0.4)",
    },
    menuItemCustom: {
      padding: "15px 5px",
    },
    menuItemOrder: {
      display: "inline-flex",
      alignItems: "center",
      width: "100%",
    },
    menuItemProfile: {
      display: "inline-flex",
      alignItems: "flex-start",
      width: "100%",
    },
    menuItemOrderText: {
      margin: "0 10px",
      fontSize: 10,
      lineHeight: "16px",
      color: "#777E91",
    },
    iconMenuColor: {
      color: "#777E91",
      fontSize: "14px",
    },
    iconMenuRight: {
      marginLeft: "auto",
      fontSize: "12px",
      color: "#777E91",
    },
    menuItemProfileText: {
      marginLeft: "10px",
      minWidth: "196px",
    },
    profileTitle: {
      margin: "0px",
      fontSize: "14px",
      lineHeight: "16px",
      color: "#E6E8EC",
      fontWeight: "bold",
      display: "inline-flex",
      alignItems: "center",
      width: "100%",
    },
    profileSubText: {
      color: "#777E91",
      fontSize: "10px",
      lineHeight: "16px",
      margin: "4px 0 0",
    },
    profileIcon: {
      fontSize: "16px",
      color: "#777E91",
    },
    switchMode: {
      marginLeft: "auto",
    },
    placeOrder: {
      margin: "0 24px",
    },
    dotCustom: {
      background: "#58BD7D",
    },
    footer: {
      width: "100%",
      borderTop: "1px solid #353945",
      padding: "24px 0",
    },
    footerContent: {
      maxWidth: "1120px",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
    },
    footerText: {
      fontSize: "12px",
      lineHeight: "20px",
      margin: "0",
      color: "#777E91",
    },
    social: {
      marginLeft: "auto",
    },
    socialLink: {
      display: "inline-flex",
      alignItems: "center",
      width: "20px",
      height: "20px",
      marginLeft: "25px",
    },
    socialIcon: {
      width: "100%",
    },
  })
);

const Layout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElProfile, setAnchorElProfile] =
    React.useState<null | HTMLElement>(null);
  const [anchorElOrder, setAnchorElOrder] = React.useState<null | HTMLElement>(
    null
  );
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [darkMode, setDarkMode] = React.useState(true);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };

  const handleCloseOrder = () => {
    setAnchorElOrder(null);
  };

  const handleOpenMenuProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleOpenMenuOrder = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElOrder(event.currentTarget);
  };

  const handleSelectMenuProfile = (name: string) => {
    if (name === "profile") {
      history.push("/profile");
    }
    if (name === "settings") {
      history.push("/settings");
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h6" noWrap>
            <Logo />
          </Typography>
          <div className={classes.search}>
            <Button
              className={classes.btnDropdown1}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Bittrex
            </Button>
            <Button
              className={classes.btnDropdown2}
              endIcon={<KeyboardArrowDownIcon />}
            >
              BTC/USD
            </Button>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge
                classes={{
                  dot: classes.dotCustom,
                }}
                badgeContent={17}
                color="secondary"
                variant="dot"
              >
                <img alt="" src={BellIcon} />
              </Badge>
            </IconButton>

            <Button
              className={classes.placeOrder}
              variant="contained"
              color="primary"
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleOpenMenuOrder}
            >
              Place Order
            </Button>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleOpenMenuProfile}
              color="inherit"
            >
              <img alt="" src={UserImg} />
            </IconButton>

            <Menu
              id="menuOrder"
              anchorEl={anchorElOrder}
              keepMounted
              open={Boolean(anchorElOrder)}
              onClose={handleCloseOrder}
              classes={{
                paper: classes.paperMenu,
              }}
            >
              <MenuItem
                classes={{
                  root: classes.menuItemCustom,
                }}
                onClick={handleCloseOrder}
              >
                <div className={classes.menuItemOrder}>
                  <AddIcon className={classes.iconMenuColor} />
                  <p className={classes.menuItemOrderText}>Liquidity Order</p>
                  <ChevronRightIcon className={classes.iconMenuRight} />
                </div>
              </MenuItem>
              <Divider />
              <MenuItem
                classes={{
                  root: classes.menuItemCustom,
                }}
                onClick={handleCloseOrder}
              >
                <div className={classes.menuItemOrder}>
                  <AddIcon className={classes.iconMenuColor} />
                  <p className={classes.menuItemOrderText}>Asks Order</p>
                  <ChevronRightIcon className={classes.iconMenuRight} />
                </div>
              </MenuItem>
            </Menu>

            <Menu
              id="menuProfile"
              anchorEl={anchorElProfile}
              // keepMounted
              open={Boolean(anchorElProfile)}
              onClose={handleCloseProfile}
              classes={{
                paper: classes.paperMenu,
              }}
            >
              <MenuItem
                classes={{
                  root: classes.menuItemCustom,
                }}
                onClick={() => handleSelectMenuProfile("profile")}
              >
                <div className={classes.menuItemOrder}>
                  <PermIdentityIcon className={classes.profileIcon} />

                  <div className={classes.menuItemProfileText}>
                    <h5 className={classes.profileTitle}>Profile</h5>
                    <p className={classes.profileSubText}>
                      Important account details
                    </p>
                  </div>
                </div>
              </MenuItem>
              <Divider />
              <MenuItem
                classes={{
                  root: classes.menuItemCustom,
                }}
                onClick={() => handleSelectMenuProfile("settings")}
              >
                <div className={classes.menuItemOrder}>
                  <SettingsIcon className={classes.profileIcon} />

                  <div className={classes.menuItemProfileText}>
                    <h5 className={classes.profileTitle}>Settings</h5>
                    <p className={classes.profileSubText}>
                      View additional settings
                    </p>
                  </div>
                </div>
              </MenuItem>
              <Divider />
              <MenuItem
                classes={{
                  root: classes.menuItemCustom,
                }}
                onClick={() => handleSelectMenuProfile("darkMode")}
              >
                <div className={classes.menuItemOrder}>
                  <WbSunnyIcon className={classes.profileIcon} />

                  <div className={classes.menuItemProfileText}>
                    <h5 className={classes.profileTitle}>
                      Dark mode
                      <div className={classes.switchMode}>
                        <Switch
                          checked={darkMode}
                          onChange={handleChangeMode}
                          color="primary"
                          name="darkMode"
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      </div>
                    </h5>
                    <p className={classes.profileSubText}>
                      Switch dark/light mode
                    </p>
                  </div>
                </div>
              </MenuItem>

              <Divider />
              <MenuItem
                classes={{
                  root: classes.menuItemCustom,
                }}
                onClick={() => handleSelectMenuProfile("logout")}
              >
                <div className={classes.menuItemOrder}>
                  <ExitToAppIcon className={classes.profileIcon} />

                  <div className={classes.menuItemProfileText}>
                    <h5 className={classes.profileTitle}>Log out</h5>
                  </div>
                </div>
              </MenuItem>
            </Menu>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <div className={classes.layoutContent}>{children}</div>

      <div className={classes.footer}>
        <div className={classes.footerContent}>
          <p className={classes.footerText}>
            Copyright © 2021 Veriblock. All rights reserved
          </p>
          <div className={classes.social}>
            <a href="/" className={classes.socialLink}>
              <img alt="" src={FbIcon} className={classes.socialIcon} />
            </a>
            <a href="/" className={classes.socialLink}>
              <img alt="" src={TwIcon} className={classes.socialIcon} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
