import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';

import { ReactComponent as FbIcon } from 'assets/icons/facebook.svg';
import { ReactComponent as TwIcon } from 'assets/icons/twitter.svg';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) =>
  createStyles({
    text: {
      fontSize: '12px',
      color: theme.palette.neutralsFour.main,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
      borderTop: '1px solid',
      borderTopColor: theme.palette.neutralsTwo.main,
      marginTop: theme.spacing(1),
      padding: theme.spacing(0, 3),
    },
    gridItems: {
      textAlign: 'center',
    },
    avatar: {
      backgroundColor: 'transparent',
      width: '100%',
    },
  })
);

const Footer = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar} color="inherit">
      <Toolbar variant="dense" style={{ height: 67 }} className={classes.text}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item xs className={classes.gridItems}>
            Copyright {`© ${new Date().getFullYear() || '2021'} `} Veriblock. All rights reserved
          </Grid>
          <Grid item xs>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              wrap="nowrap"
              spacing={4}
            >
              <Grid item>
                <Avatar className={classes.avatar}>
                  <FbIcon stroke="currentColor" width="20" />
                </Avatar>
              </Grid>
              <Grid item>
                <Avatar className={classes.avatar}>
                  <TwIcon stroke="currentColor" width="20" />
                </Avatar>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
