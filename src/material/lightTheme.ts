import { createTheme, responsiveFontSizes, ThemeOptions } from '@material-ui/core/styles';
import { merge } from 'lodash';
import { themeBase } from './themeBase';

// colors
const primaryMain = '#90caf9';

const SecondaryMain = '#f48fb1';

const success = '#4caf50';
const error = '#f44336';

const textPrimary = '#FCFCFD';
const textSecondary = '#777E90';

const background = '#fff';

const createMuiTheme = (custom: any, options?: ThemeOptions | undefined, ...args: object[]) =>
  createTheme(merge(options, custom), ...args);

const lightTheme = () => {
  return responsiveFontSizes(
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
      },
      {},
      ...[
        { breakpoints: themeBase.breakpoints },
        { typography: themeBase.typography },
      ]
    )
  );
};

export default lightTheme;
