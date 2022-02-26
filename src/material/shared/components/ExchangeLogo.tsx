import React from 'react';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';

import BittrexLogo from 'assets/images/bittrex.png';
import EmmeLogo from 'assets/images/emme-green.png';

import { ReactComponent as BittrexLight } from 'assets/svg/bittrex.svg';

const useStyles = makeStyles((theme) =>
  createStyles({
    logoImage: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 145,
      marginRight: theme.spacing(6),
      marginLeft: theme.spacing(6),
      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
      },
    },
  })
);

interface ExchangeLogoProps {
  srcLogo?: string;
}

const ExchangeLogo = ({ srcLogo }: ExchangeLogoProps) => {
  const classes = useStyles();
  const theme = useTheme();

  switch (srcLogo?.toLowerCase()) {
    case 'emme':
      return <img alt="default logo" src={EmmeLogo} className={classes.logoImage} />;

    default:
      return theme?.palette.type === 'light' ? (
        <BittrexLight stroke="none" className={classes.logoImage} />
      ) : (
        <img alt="default logo" src={BittrexLogo} className={classes.logoImage} />
      );
  }
};

ExchangeLogo.defaultProps = {
  srcLogo: undefined,
};

export default ExchangeLogo;
