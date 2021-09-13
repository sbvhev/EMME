import { createTheme, responsiveFontSizes, ThemeOptions } from '@material-ui/core/styles';
import { SpacingOptions } from '@material-ui/core/styles/createSpacing';
import { merge } from 'lodash';
// import { themeBase } from './themeBase';

// colors
const primaryMain = '#90caf9';

const SecondaryMain = '#f48fb1';

const success = '#4caf50';
const error = '#f44336';

const textPrimary = '#FCFCFD';
const textSecondary = '#777E90';

const background = '#fff';

/*                                      0  1  2   3   4   5   6   7,  8,  9, 10 */
export const spacing: SpacingOptions = [0, 2, 5, 10, 15, 20, 25, 30, 40, 50, 60];

export const lightThemeBase: ThemeOptions = {
  typography: {
    htmlFontSize: 16,
    fontFamily: 'DM Sans',
    fontSize: 14,
  },
};

const createMuiTheme = (custom: any, options?: ThemeOptions | undefined, ...args: object[]) =>
  createTheme(merge(options, custom), ...args);

const lightTheme = () =>
  responsiveFontSizes(
    createMuiTheme(
      {
        palette: {
          type: 'light',
          primaryMain: {
            main: primaryMain,
          },
          secondary: {
            main: SecondaryMain,
          },
          warning: {
            main: error,
          },
          text: {
            primaryMain: textPrimary,
            secondary: textSecondary,
          },
          background: {
            default: background,
            paper: background,
          },
          success: {
            main: success,
          },
          error: {
            main: error,
          },
        },
        spacing,
      },
      { ...{ typography: lightThemeBase.typography } }
    )
  );

export default lightTheme;
