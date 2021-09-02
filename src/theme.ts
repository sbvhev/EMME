import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
} from "@material-ui/core";
import { merge } from "lodash";

// colors
const primary = "#3772FF";
const emmeBlueNight = "rgba(82, 148, 255, 0.2)";

const greySecondaryNight = "#FCFCFD";
const searchBarGrey = "#181818";

const black = "#1D1D20";
const white = "#ffffff";

const success = "#58BD7D";
const warning = "#FF6838";

const whiteColor = "#F7FAFF";

const textPrimaryNight = "#FCFCFD";
const textSecondaryNight = "#777E90";

const backgroundNight = "#1D1D20";

const dividerGreyNight = "#353945";

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 700;
const xs = 0;

// spacing
const spacing = 8;

function createMuiTheme(
  custom: any,
  options?: ThemeOptions | undefined,
  ...args: object[]
) {
  return createTheme(merge(custom, options), ...args);
}

export const darkTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: primary,
        dark: emmeBlueNight,
      },
      secondary: {
        main: greySecondaryNight,
        dark: searchBarGrey,
      },
      common: {
        black,
        white,
      },
      warning: {
        main: warning,
        dark: warning,
      },
      text: {
        primary: textPrimaryNight,
        secondary: textSecondaryNight,
        hint: black,
      },
      background: {
        default: backgroundNight,
        paper: backgroundNight,
      },
      success: {
        main: success,
        dark: success,
      },
      error: {
        main: warning,
        dark: warning,
      },
      divider: dividerGreyNight,
      // Used to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
    typography: {
      htmlFontSize: 16,
      fontFamily: "DM Sans",
      fontSize: 14,
      h1: {},
      h2: {},
      h3: {},
      h4: {},
      h5: {},
      h6: {},
      subtitle1: {},
      subtitle2: {},
      body1: {},
      body2: {},
    },
    spacing,
    breakpoints: {
      values: {
        xl,
        lg,
        md,
        sm,
        xs,
      },
    },
    overrides: {
      MuiContainer: {
        fixed: {
          border: `1px solid ${dividerGreyNight}`,
          borderRadius: 12,
          padding: 0,
        },
      },
      MuiInputBase: {
        root: {
          background: "transparent",
          borderRadius: 12,
          padding: "0 16px",
          border: `2px solid ${dividerGreyNight}`,
          fontWeight: 500,
          fontSize: 14,
          color: textSecondaryNight,

          "& > input": {
            background: "transparent",
            padding: "0 16px 0 0",
            outline: "none",
            border: "none",

            "&:focus": {
              boxShadow: "none",
            },
          },

          "&.Mui-focused > input::placeholder": {
            color: "transparent",
          },
        },
      },
      MuiInput: {
        underline: {
          "&::before": {
            display: "none",
          },
          "&.Mui-error::after": {
            borderColor: warning,
            height: 52,
            borderRadius: 12,
            border: `2px solid ${warning}`,
            width: "calc(100% + 4px)",
            left: -2,
            bottom: -2,
          },
        },
      },
      MuiFormLabel: {},
      MuiIconButton: {
        root: {
          padding: 4,
        },
      },
      MuiInputLabel: {
        root: {},
        shrink: {
          "&.MuiInputLabel-outlined.MuiInputLabel-shrink": {
            transform: "translate(12px, 10px) scale(0.75)",
          },
        },
        outlined: {
          "&.MuiInputLabel-outlined": {
            transform: "translate(8px, 20px) scale(1)",
          },
        },
      },
      MuiOutlinedInput: {
        root: {
          border: `1px solid ${dividerGreyNight}`,
          background: "black",
          borderRadius: 12,
          height: 45,

          "& .MuiSelect-root": {
            alignItems: "center",
            display: "flex",
            paddingLeft: 12,
            zIndex: 100,

            "& svg": {
              width: 20,
              marginRight: 2,
              position: "relative",
              height: 20,
              top: -2,

              "& path": {
                fill: primary,
              },
            },

            "& span": {
              fontSize: 14,
            },

            "&:focus": {
              background: "transparent",
            },
          },
        },
        notchedOutline: {
          border: "none",
        },
        input: {
          padding: 4,
        },
      },
      MuiFilledInput: {
        root: {
          borderRadius: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        underline: {
          "&::after": {
            borderBottom: "none",
          },
          "&::before": {
            borderBottom: "none",
          },
          "&:hover::before": {
            borderBottom: "none",
          },
        },
        input: {
          padding: 12,
        },
      },
      MuiSelect: {
        filled: {
          "&:focus": {},
        },
        iconFilled: {},
        select: {
          "&:focus": {},
        },
        icon: {},
        selectMenu: {},
      },
      MuiButtonGroup: {
        root: {},
        contained: {},
        groupedContainedHorizontal: {
          "&:not(:last-child)": {},
        },
        groupedHorizontal: {
          "&:not(:last-child) > div > div": {},
          "&:not(:first-child) > div > div": {},
        },
      },
      MuiTableCell: {
        root: {
          padding: "16px 23px",
        },
      },
      MuiTableSortLabel: {
        root: {
          "& img": {
            width: 16,
            marginLeft: 4,
          },
        },
      },
      MuiTabs: {
        scroller: {
          padding: "0 10px",
        },
        indicator: {
          background: whiteColor,
          borderRadius: 1.25,
          boxShadow:
            "0px 0px 2px rgba(82, 148, 255, 0.514578), 0px 0px 6px rgba(255, 255, 255, 0.538381), 0px 0px 11px #5294FF",
        },
      },
      MuiTab: {
        labelIcon: {
          minWidth: 98,
          minHeight: 55,
          paddingTop: 0,
          padding: 0,

          "&.Mui-selected": {
            color: primary,

            "& svg:first-child": {
              "& path": {
                fill: primary,
              },
            },
          },
        },
        wrapper: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "relative",

          "& svg": {
            marginRight: 6,
            marginBottom: "0px !important;",
          },
        },
      },
      MuiFab: {
        extended: {
          "&.MuiFab-sizeSmall": {},
        },
        sizeSmall: {},
      },
      MuiButton: {
        root: {
          boxSizing: "border-box",
          fontWeight: 700,
          textTransform: "none",
          padding: "6px 2.25rem",
          backgroundColor: primary,
          color: white,
          borderRadius: 90,
          margin: "2px",

          "&[disabled='true']": {
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), #3772FF",
          },
        },
        label: {
          "& svg:not(:first-child)": {
            marginLeft: 6,
          },
        },
        startIcon: {
          marginLeft: 0,
        },
        sizeSmall: {
          borderRadius: "10px",
          height: "35px",
          fontSize: "14px",
          fontWeight: 700,
          lineHeight: "18px",
        },
        sizeLarge: {
          height: "48px",
          fontSize: 16,
          lineHeight: "16px",
        },
        text: {
          width: 90,
        },
        textPrimary: {
          backgroundColor: primary,
          color: white,
          border: `1px solid transparent`,

          "&:hover": {
            borderColor: primary,
            color: primary,
            "& svg path": {
              fill: primary,
            },
          },

          "&:active": {
            borderColor: primary,
            color: primary,
            "& svg path": {
              fill: primary,
            },
          },
        },
        textSecondary: {
          background: emmeBlueNight,
          color: primary,
          "&:hover": {
            "& svg path": {
              fill: textSecondaryNight,
            },
            color: textSecondaryNight,
          },
        },
        contained: {
          backgroundColor: "transparent",
          color: greySecondaryNight,
          "& svg path": {},
        },
        outlined: {
          backgroundColor: "transparent",
        },
        containedPrimary: {
          background: primary,
          color: textPrimaryNight,
          "&:hover": {
            background: "",
          },
          "&$disabled": {
            opacity: "0.3",
            color: black,
          },
          "&:active": {
            backgroundColor: primary,
            color: black,
            background: "none",
            opacity: "1",
          },
        },
        containedSecondary: {
          background: ``,
          color: black,
          fontWeight: 500,
          boxShadow: "0px 0px 5px rgba(246, 67, 207, 0.4)",
          "&:hover": {
            background: ``,
          },
          "&:active": {
            color: black,
            background: "none",
            opacity: "1",
          },
        },
        outlinedPrimary: {
          backgroundColor: emmeBlueNight,
          color: primary,
          border: "none",

          "&:hover": {
            color: black,
            border: "none",
            backgroundColor: primary,
          },

          "&:active": {
            color: white,
            backgroundColor: primary,
            opacity: 1,

            "& .MuiButton-label > svg path": {
              fill: white,
            },
          },
        },
        outlinedSecondary: {
          backgroundColor: black,
          color: greySecondaryNight,
          border: `1px solid ${dividerGreyNight}`,
          "&:hover": {
            color: white,
            border: `1px solid ${greySecondaryNight}`,
          },
          "&:active": {
            color: greySecondaryNight,
          },
        },
      },
      MuiPaper: {
        root: {
          "&:focus": {
            outline: "none",
          },
        },
        rounded: {
          borderRadius: 12,
          border: `1px solid ${dividerGreyNight}`,
        },
      },
      MuiPopover: {
        paper: {
          overflowX: "unset",
          overflowY: "unset",
          transform: "translateY(-11px) !important",
          boxShadow: "none",
          "&::before": {
            // content: '""',
            position: "absolute",
            marginRight: "-0.71em",
            bottom: 0,
            right: 40,
            width: 16,
            height: 16,
            background: black,
            border: `1px solid ${dividerGreyNight}`,
            // transform: "translate(-50%, 50%) rotate(135deg)",
            clipPath:
              "polygon(-8px -8px, calc(100% + 8px) -8px, calc(100% + 8px) calc(100% + 8px))",
          },
        },
      },
      MuiBottomNavigation: {
        root: {
          background: black,
          border: `1px solid ${dividerGreyNight}`,
          borderRadius: 12,
          width: "fit-content",
          minWidth: 210,
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.07)",
        },
      },
      MuiBottomNavigationAction: {
        root: {
          fontSize: 14,
          lineHeight: "18px",
          fontWeight: "normal",
          minWidth: "auto",
          borderRadius: 12,
          padding: "6px 12px 8px 9px",
          margin: 6,

          "& path": {
            fill: greySecondaryNight,
          },

          "& svg": {
            width: "20px",
            height: "18px",
            marginRight: 4,
          },

          "&$selected": {
            background: "rgba(82, 148, 255, 0.12)",
            borderRadius: 10,

            "& path": {
              fill: primary,
            },
          },
        },
        wrapper: {
          display: "flex",
          flexDirection: "row",
        },
        label: {
          fontSize: 14,
          lineHeight: "18px",

          "&$selected": {
            fontWeight: "bold",
          },
        },
      },
      MuiStepper: {
        root: {
          padding: 0,
          position: "relative",
          background: "transparent",
        },
        vertical: {},
        alternativeLabel: {
          display: "flex",
        },
      },
      MuiStepButton: {},
      MuiStepConnector: {
        vertical: {
          padding: 0,
          marginLeft: 15,

          "&.Mui-disabled": {
            "& span": {
              borderColor: "#212121",
            },
          },
        },
        lineVertical: {
          minHeight: 20,
          borderLeftWidth: 2,
        },
        active: {
          borderColor: "white",

          "&:before": {
            height: "50%",
            content: "''",
          },
        },
        line: {
          borderColor: "#5294FF",
        },
      },
      MuiStepContent: {
        root: {
          position: "absolute",
          width: "calc(100% - 205px)",
          right: 0,
          top: 0,
          marginTop: 0,
          marginLeft: 0,
          paddingLeft: 0,
          paddingRight: 0,
          borderLeft: "none",

          "& > div": {
            borderRadius: 12,
            border: "1px solid #212121",
            width: "100%",
          },
        },
      },
      MuiStepIcon: {
        root: {},
      },
      MuiStepLabel: {
        label: {
          fontWeight: 500,
          fontSize: 14,
          lineHeight: "24px",

          "&$completed": {
            color: "#646464",
          },
          "&$root": {
            color: "#646464",
          },
        },
        active: {
          width: "fit-content",
        },
      },
    },
  })
);

const theme = { darkTheme };

export default theme;
