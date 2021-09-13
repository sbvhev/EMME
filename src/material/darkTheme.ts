import { createTheme, responsiveFontSizes, ThemeOptions } from '@material-ui/core/styles';
import { merge } from 'lodash';
import { themeBase } from './themeBase';

// colors
const primary = '#3772FF';
const emmeBlueNight = 'rgba(82, 148, 255, 0.2)';

const greySecondaryNight = '#FCFCFD';
const searchBarGrey = '#181818';

const black = '#1D1D20';
const white = '#ffffff';

const success = '#58BD7D';
const warning = '#FF6838';

const whiteColor = '#F7FAFF';

const textPrimaryNight = '#FCFCFD';
const textSecondaryNight = '#777E90';

const backgroundNight = '#1D1D20';

const dividerGreyNight = '#353945';

const createMuiTheme = (custom: any, options?: ThemeOptions | undefined, ...args: object[]) =>
  createTheme(merge(options, custom), ...args);

const darkTheme = () =>
  responsiveFontSizes(
    createMuiTheme(
      {
        palette: {
          type: 'dark',
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
        overrides: {
          MuiContainer: {
            fixed: {
              border: `1px solid ${dividerGreyNight}`,
            },
          },
          MuiInputBase: {
            root: {
              border: `2px solid ${dividerGreyNight}`,
              color: textSecondaryNight,
            },
          },
          MuiInput: {
            underline: {
              '&.Mui-error::after': {
                border: `2px solid ${warning}`,
              },
            },
          },
          MuiOutlinedInput: {
            root: {
              border: `1px solid ${dividerGreyNight}`,
              background: 'black',

              '& svg': {
                '& path': {
                  fill: primary,
                },
              },
            },
          },
          MuiTabs: {
            indicator: {
              background: whiteColor,
            },
          },
          MuiTab: {
            labelIcon: {
              '&.Mui-selected': {
                color: primary,

                '& svg:first-child': {
                  '& path': {
                    fill: primary,
                  },
                },
              },
            },
          },
          MuiButton: {
            root: {
              backgroundColor: primary,
              color: white,
              '&[disabled="true"]': {
                background:
                  'linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), #3772FF',
              },
            },
            textPrimary: {
              backgroundColor: primary,
              color: white,
              '&:hover': {
                borderColor: primary,
                color: primary,
                '& svg path': {
                  fill: primary,
                },
              },
              '&:active': {
                borderColor: primary,
                color: primary,
                '& svg path': {
                  fill: primary,
                },
              },
            },
            textSecondary: {
              background: emmeBlueNight,
              color: primary,
              '&:hover': {
                '& svg path': {
                  fill: textSecondaryNight,
                },
                color: textSecondaryNight,
              },
            },
            contained: {
              color: greySecondaryNight,
            },
            containedPrimary: {
              background: primary,
              color: textPrimaryNight,
              '&:hover': {
                background: '',
              },
              '&$disabled': {
                opacity: '0.3',
                color: black,
              },
              '&:active': {
                backgroundColor: primary,
                color: black,
                background: 'none',
                opacity: '1',
              },
            },
            containedSecondary: {
              background: '',
              color: black,
              fontWeight: 500,
              boxShadow: '0px 0px 5px rgba(246, 67, 207, 0.4)',
              '&:hover': {
                background: '',
              },
              '&:active': {
                color: black,
                background: 'none',
                opacity: '1',
              },
            },
            outlinedPrimary: {
              backgroundColor: emmeBlueNight,
              color: primary,
              '&:hover': {
                color: black,
                border: 'none',
                backgroundColor: primary,
              },

              '&:active': {
                color: white,
                backgroundColor: primary,
                opacity: 1,

                '& .MuiButton-label > svg path': {
                  fill: white,
                },
              },
            },
            outlinedSecondary: {
              backgroundColor: black,
              color: greySecondaryNight,
              border: `1px solid ${dividerGreyNight}`,
              '&:hover': {
                color: white,
                border: `1px solid ${greySecondaryNight}`,
              },
              '&:active': {
                color: greySecondaryNight,
              },
            },
          },
          MuiPaper: {
            rounded: {
              borderRadius: 12,
              border: `1px solid ${dividerGreyNight}`,
            },
          },
          MuiPopover: {
            paper: {
              boxShadow: 'none',
              '&::before': {
                background: black,
                border: `1px solid ${dividerGreyNight}`,
              },
            },
          },
          MuiBottomNavigation: {
            root: {
              background: black,
              border: `1px solid ${dividerGreyNight}`,
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.07)',
            },
          },
          MuiBottomNavigationAction: {
            root: {
              '& path': {
                fill: greySecondaryNight,
              },

              '&$selected': {
                background: 'rgba(82, 148, 255, 0.12)',

                '& path': {
                  fill: primary,
                },
              },
            },

            label: {
              '&$selected': {
                fontWeight: 'bold',
              },
            },
          },
          MuiStepConnector: {
            vertical: {
              '&.Mui-disabled': {
                '& span': {
                  borderColor: '#212121',
                },
              },
            },
            active: {
              borderColor: 'white',
            },
            line: {
              borderColor: '#5294FF',
            },
          },
          MuiStepContent: {
            root: {
              '& > div': {
                borderRadius: 12,
                border: '1px solid #212121',
                width: '100%',
              },
            },
          },
          MuiStepLabel: {
            label: {
              fontWeight: 500,

              '&$completed': {
                color: '#646464',
              },
              '&$root': {
                color: '#646464',
              },
            },
          },
        },
      },
      themeBase
    )
  );

export default darkTheme;
