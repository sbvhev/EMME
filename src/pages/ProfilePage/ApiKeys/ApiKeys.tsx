import React, { useContext, useState } from 'react';
// import { CopyToClipboard } from "react-copy-to-clipboard";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography } from '@material-ui/core';
import { ThemeContext, ThemeType } from 'material/ThemeProvider';

import { MailOutlineIcon, MailOutlineLightIcon } from 'icons';
// store
import { useAppSelector } from 'stores/hooks';
import Exchange from './Exchange';
import DisableAPIKey from './DisableAPIKey';

interface Props {
  title?: string;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      boxShadow: '0px 18px 24px 10px rgb(15 15 15 / 25%)',
      borderRadius: '16px',
      padding: '40px',
      backgroundColor: theme.palette.background.default,
    },
    smallDarkText: {
      fontSize: '12px',
      lineHeight: '20px',
      margin: '0',
    },
    title: {
      fontWeight: 'bold',
      fontSize: '40px',
      lineHeight: '48px',
      margin: '0 0 15px',
    },
    address: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '48px',
    },
    mailText: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 500,
      margin: '0 0 0 13px',
    },
    divider: {
      marginBottom: '48px',
    },
  })
);

const ApiKeys: React.FC<Props> = () => {
  const classes = useStyles();
  const { user } = useAppSelector((state) => state.users);
  const [exchange, setExchange] = useState('bittrex-global');

  const { theme } = useContext(ThemeContext);

  const handleChangeExchange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setExchange(event.target.value as string);
  };

  return (
    <Box className={classes.main}>
      <Typography className={classes.smallDarkText}>
        Enable API access on your account to generate rounds.
      </Typography>
      <Typography variant="h3" className={classes.title}>
        Bittrex API Keys
      </Typography>

      <Box className={classes.address}>
        {theme === ThemeType.darkThemePref ? (
          <MailOutlineIcon className="" width={24} />
        ) : (
          <MailOutlineLightIcon className="" width={24} />
        )}
        <Typography className={classes.mailText}>{(user && user.email) || ''}</Typography>
      </Box>

      <Divider
        classes={{
          root: classes.divider,
        }}
      />

      <Exchange handleChangeExchange={handleChangeExchange} exchange={exchange} />

      <Divider
        classes={{
          root: classes.divider,
        }}
      />

      <DisableAPIKey exchange={exchange} />
    </Box>
  );
};

export default ApiKeys;
