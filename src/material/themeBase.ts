import { ThemeOptions } from '@material-ui/core';
import { SpacingOptions } from '@material-ui/core/styles/createSpacing';

/*                               0  1  2   3   4   5   6   7,  8,  9, 10 */
const spacing: SpacingOptions = [0, 2, 5, 10, 15, 20, 25, 30, 40, 50, 60];

export const themeBase: ThemeOptions = {
  typography: {
    htmlFontSize: 16,
    fontFamily: 'Poppins',
    fontSize: 14,
    h1: {
      fontFamily: 'DM Sans',
      fontWeight: 700,
      fontSize: 64,
      lineHeight: 1,
    },
    h2: {
      fontFamily: 'DM Sans',
      fontWeight: 700,
      fontSize: 48,
      lineHeight: 1.16,
    },
    h3: {
      fontFamily: 'DM Sans',
      fontWeight: 700,
      fontSize: 40,
      lineHeight: 1.2,
    },
    h4: {
      fontFamily: 'DM Sans',
      fontWeight: 700,
      fontSize: 32,
      lineHeight: 1.25,
    },
    h5: {
      fontFamily: 'DM Sans',
      fontWeight: 700,
      fontSize: 22,
      lineHeight: 1.8,
    },
    h6: {
      fontFamily: 'DM Sans',
      fontWeight: 700,
      fontSize: 14,
      lineHeight: 1.14,
    },
    body1: {
      fontSize: 16,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: 24,
      lineHeight: 1.33,
    },
    caption: {
      fontSize: 14,
      lineHeight: 1.7,
    },
  },
  spacing,
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 90,
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 12,

        '& input[type=number]': {
          '-moz-appearance': 'textfield',
          textAlign: 'right',
          marginRight: 15,
        },
        '& input[type=number]::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0,
          textAlign: 'right',
          marginRight: 15,
        },
        '& input[type=number]::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0,
          textAlign: 'right',
          marginRight: 15,
        },
      },
      input: {
        '&:-webkit-autofill': {
          transitionDelay: '99999s',
          transitionProperty: 'background-color, color',
          '-webkit-box-shadow': '0 0 0 30px transparent inset !important',
        },
      },
    },
    MuiTab: {
      root: {
        borderStyle: 'solid',
        margin: 5,
        borderRadius: 90,
      },
    },
  },
};
