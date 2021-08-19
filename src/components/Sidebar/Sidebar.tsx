import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import cx from "classnames";

import { useDarkModeManager } from "state/user/hooks";

import { SwitchWithGlider, ThemeSwitch } from "components";
import SidebarItem from "./SidebarItem";

const useStyles = makeStyles(({ palette }) => ({
  rightBorder: {
    borderRight: `1px solid ${palette.divider}`,
  },

  subtitle: {
    marginBottom: 8,
    marginLeft: "1rem",
    fontSize: 10,
    color: palette.text.secondary,
  },

  light: {
    background: palette.background.paper,
  },

  switchContainer: {
    marginTop: "18px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: palette.background.paper,
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "180px",
    height: "251px",
  },
  switchContainerMobile: {
    display: "flex",
    marginBottom: "4px",
    flexDirection: "column",
    backgroundColor: palette.background.paper,
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    height: "251px",
  },
}));

export interface SidebarProps {
  mobile?: boolean;
  onHide?: () => void;
}

interface PageIndexing {
  [key: string]: number;
}

const Sidebar: React.FC<SidebarProps> = ({ mobile, onHide }) => {
  const [darkMode] = useDarkModeManager();
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation<{ previous: string }>();
  const { pathname } = location;
  const pageIndexes: PageIndexing = {
    "/test": 0,
    "/test1": 1,
  };
  const state = location.state ? location.state.previous : false;
  const startIndex = state ? pageIndexes[state] : pageIndexes[pathname] || 0;
  const [pageNavigationIndex, setPageNavigationIndex] =
    React.useState(startIndex);

  React.useEffect(() => {
    const currentPage = pageIndexes[pathname];
    setPageNavigationIndex(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  React.useEffect(() => {
    if (location.search) {
      const path = location.pathname;
      history.push(path);
    }
  }, [history, location.pathname, location.search]);

  const navigation = [
    {
      title: "Test",
      link: "/test",
      Icon: <></>,
    },
    {
      title: "Test1",
      link: "/test1",
      Icon: <></>,
    },
  ];

  const navigationItems = navigation.map(({ title, link, Icon }, i) => (
    <SidebarItem
      key={i}
      title={title}
      link={link}
      Icon={Icon}
      activeCondition={link === pathname}
      onHide={onHide}
    />
  ));

  return (
    <Box
      clone
      width={1}
      px={{ sm: 0, md: "15px" }}
      pt={{ sm: 3, md: "30px" }}
      pb={{ sm: 1, md: "15px" }}
      position="relative"
      height={mobile ? "auto" : "100vh"}
      className={cx({
        [classes.rightBorder]: !mobile,
        [classes.light]: !darkMode,
      })}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        style={{ overflowY: "auto" }}
      >
        <Box>
          {!mobile && (
            <Grid container component={Link} to="/">
              <Box pb={3}></Box>
            </Grid>
          )}
          <Box
            className={
              !mobile ? classes.switchContainer : classes.switchContainerMobile
            }
          >
            {!mobile ? (
              <SwitchWithGlider
                elements={[...navigationItems]}
                defaultIndex={
                  pageNavigationIndex === undefined ? -1 : pageNavigationIndex
                }
                marginBetweenSwitches={4}
                gliderWidth={180}
                gliderHeight={47}
                verticalGlider
              />
            ) : (
              <SwitchWithGlider
                elements={navigationItems}
                defaultIndex={
                  pageNavigationIndex === undefined ? -1 : pageNavigationIndex
                }
                marginBetweenSwitches={4}
                gliderWidth={"100%"}
                gliderHeight={47}
                verticalGlider
              />
            )}
          </Box>
        </Box>

        <Box>{!mobile && <ThemeSwitch />}</Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
