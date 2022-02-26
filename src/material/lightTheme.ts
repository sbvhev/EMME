import { createTheme, responsiveFontSizes, ThemeOptions } from '@material-ui/core/styles';
import { merge } from 'lodash';
import { themeBase } from './themeBase';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    neutralOne: Palette['primary'];
    neutralsTwo: Palette['primary'];
    neutralsThree: Palette['primary'];
    neutralsFour: Palette['primary'];
    neutralsFive: Palette['primary'];
    neutralsSix: Palette['primary'];
    neutralsSeven: Palette['primary'];
    neutralsEight: Palette['primary'];
  }
  interface PaletteOptions {
    neutralOne: PaletteOptions['primary'];
    neutralsTwo: PaletteOptions['primary'];
    neutralsThree: PaletteOptions['primary'];
    neutralsFour: PaletteOptions['primary'];
    neutralsFive: PaletteOptions['primary'];
    neutralsSix: PaletteOptions['primary'];
    neutralsSeven: PaletteOptions['primary'];
    neutralsEight: PaletteOptions['primary'];
  }
}

// colors
const primaryMain = '#3772FF';
const primaryDark = '#2955BF';

const SecondaryMain = '#58BD7D';
const SecondaryDark = '#181818';

const info = '#FFD166';
const error = '#FF6838';

const background = '#fff';

const neutralsOne = '#FCFCFD';
const neutralsTwo = '#F4F5F6';
const neutralsThree = '#E6E8EC';
const neutralsFour = '#B1B5C4';
const neutralsFive = '#777E90';
const neutralsSix = '#353945';
const neutralsSeven = '#23262F';
const neutralsEight = '#141416';

const createMuiTheme = (custom: any, options?: ThemeOptions | undefined, ...args: object[]) =>
  createTheme(merge(options, custom), ...args);

const lightTheme = () =>
  responsiveFontSizes(
    createMuiTheme(
      {
        palette: {
          type: 'light',
          primary: {
            main: primaryMain,
            dark: primaryDark,
          },
          secondary: {
            main: SecondaryMain,
            dark: SecondaryDark,
          },
          text: {
            primaryMain: neutralsEight,
            secondary: neutralsSix,
          },
          background: {
            default: background,
            paper: background,
          },
          info: {
            main: info,
          },
          success: {
            main: SecondaryMain,
          },
          error: {
            main: error,
          },
          warning: {
            main: error,
          },
          neutralOne: {
            main: neutralsOne,
          },
          neutralsTwo: {
            main: neutralsTwo,
          },
          neutralsThree: {
            main: neutralsThree,
          },
          neutralsFour: {
            main: neutralsFour,
          },
          neutralsFive: {
            main: neutralsFive,
          },
          neutralsSix: {
            main: neutralsSix,
          },
          neutralsSeven: {
            main: neutralsSeven,
          },
          neutralsEight: {
            main: neutralsEight,
          },
        },
      },
      {
        ...themeBase,
      },
      {
        typography: {
          subtitle1: {
            color: neutralsFour,
          },
        },
        overrides: {
          MuiAppBar: {
            root: {
              backgroundColor: neutralsOne,
            },
          },
          MuiAvatar: {
            colorDefault: {
              backgroundColor: neutralsTwo,
              color: neutralsFour,
            },
          },
          MuiPaper: {
            root: {
              backgroundColor: neutralsOne,
            },
          },
        },
      }
    )
  );

export default lightTheme;
