import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  IconButton,
  Grid,
  Divider,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import Hamburger from "hamburger-react";
import cx from "classnames";
import { Sidebar, ThemeSwitch } from "components";

import { useDarkModeManager } from "state/user/hooks";

const useStyles = makeStyles(({ palette }) => ({
  page: {
    backgroundColor: palette.background.default,
    width: "calc(100vw - 210px)",
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    overflowX: "hidden",
    flexDirection: "column",
    marginLeft: 210,
  },
  pageMobile: {
    width: "100vw",
    marginLeft: 0,
    height: "100vh",
  },
  border: {
    borderBottom: (props: any) =>
      (props.darkMode || !props.mobileSidebarHidden) &&
      `1px solid ${palette.divider}`,
    boxShadow: (props: any) =>
      props.darkMode
        ? "none"
        : !props.mobileSidebarHidden
        ? "0px 1.73333px 25.1333px rgba(0, 0, 0, 0.0103512)"
        : "0px 2px 5px rgba(0, 0, 0, 0.0746353)",
  },
  transitionItem: {
    opacity: 0,
    transform: "scale(0)",
    transformOrigin: "center 0",
    position: "absolute",
    transition:
      "opacity 354ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 236ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  transitionOpen: {
    opacity: 1,
    transform: "scale(1)",
  },
}));

export interface PageWithSidebarProps {
  children: any;
}

const PageWithSidebar: React.FC<PageWithSidebarProps> = ({ children }) => {
  const [mobileSidebarHidden, setMobileSidebarHidden] = useState(true);
  const theme = useTheme();
  const { palette } = theme;
  const [darkMode] = useDarkModeManager();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ darkMode, mobileSidebarHidden });
  const location = useLocation();

  const hideMobileMenu = () => {
    setMobileSidebarHidden(true);
  };

  useEffect(() => {
    if (!mobile && !mobileSidebarHidden) {
      setMobileSidebarHidden(true);
    }
  }, [mobile, mobileSidebarHidden]);

  return (
    <Box bgcolor="background.default">
      <Grid container>
        {!mobile && (
          <Box position="fixed" left={0} width={210}>
            <Sidebar />
          </Box>
        )}

        <Box className={cx(classes.page, mobile && classes.pageMobile)}>
          <Box
            position="fixed"
            width={mobile ? 1 : "calc(100vw - 210px)"}
            zIndex={10}
            bgcolor={!mobile ? "transparent" : palette.background.paper}
            pt={mobile ? 1 : 3}
            px={mobile ? 0 : 3}
            className={cx(mobile && classes.border)}
            height={mobile ? "60px" : "72px"}
          >
            <Box width="100%" display="flex" justifyContent="center">
              <Box
                display="flex"
                width="100%"
                maxWidth="1280px"
                justifyContent={!mobile ? "flex-end" : "space-between"}
                alignItems="center"
                pr={!mobile ? 3 : 0}
              >
                {mobile && (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Grid style={{ height: "48px", marginRight: "6px" }}>
                      <IconButton
                        style={{ height: "48px", padding: 0 }}
                        onClick={() =>
                          setMobileSidebarHidden(!mobileSidebarHidden)
                        }
                      >
                        <Hamburger
                          size={20}
                          color={theme.palette.text.secondary}
                          toggled={!mobileSidebarHidden}
                          toggle={setMobileSidebarHidden}
                        />
                      </IconButton>
                    </Grid>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          {mobile && (
            <Box
              className={cx(
                classes.transitionItem,
                !mobileSidebarHidden && classes.transitionOpen
              )}
              width={mobile ? 1 : "calc(100vw - 210px)"}
              position="relative"
              mt="60px"
              mb={mobile ? 0 : 7}
              height={1}
              maxHeight="calc(100vh - 160px)"
              overflow="auto"
              style={{ backgroundColor: palette.background.paper }}
            >
              <Box p={1} pl={1.25}>
                <Sidebar mobile onHide={hideMobileMenu} />
              </Box>
              <Divider />
              <Box p={1.5}>
                <ThemeSwitch />
              </Box>
              <Box
                borderBottom={`1px solid ${palette.divider}`}
                boxShadow={
                  darkMode ? "" : "0px 2px 5px rgba(0, 0, 0, 0.0746353)"
                }
              />
            </Box>
          )}

          {mobileSidebarHidden && (
            <>
              <Box
                px={mobile ? 0 : 3}
                width={mobile ? "100vw" : "calc(100vw - 210px)"}
                mt={!mobile ? 11 : 10}
                mb={mobile ? 0 : 16}
              >
                <Container style={!mobile ? {} : { padding: "0 20px" }}>
                  {children}
                </Container>
              </Box>
            </>
          )}
        </Box>
      </Grid>
    </Box>
  );
};

export default PageWithSidebar;
