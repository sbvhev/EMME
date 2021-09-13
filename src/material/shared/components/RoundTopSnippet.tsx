import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import moment from 'moment';

import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { fetchCurrentRound } from 'stores/reducers/rounds';
import AlertContext from 'context/alert/alertContext';
import { CURRENT_ROUNDS_INTERVAL } from 'config';
import { timeAgo, timeDuration, timeRange, timeRemaining } from '../utils/util';
import CircularProgressWithLabel from './CircularProgressWithLabel';

const hasErrorTimeOut = 60 * 1000;
let firstLoad = true;

const useStyles = makeStyles(() =>
  createStyles({
    card: { padding: '0 52px' },
    mainGrid: { minHeight: '136px' },
    roundsGrid: {
      alignSelf: 'center',
      textAlign: 'center',
    },
  })
);

interface IconWithTextProps {
  text: string;
}

const IconWithText = ({ text }: IconWithTextProps) => (
  <Grid container direction="row" justifyContent="center" alignItems="center" wrap="nowrap">
    <AccessTimeOutlinedIcon fontSize="small" style={{ marginRight: '5px' }} />
    {text}
  </Grid>
);

interface TwoRowsContainerProps {
  topRow: ReactNode;
  bottomRow: ReactNode;
}

const TwoRowsContainer = ({ topRow, bottomRow }: TwoRowsContainerProps) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      alignItems="stretch"
      wrap="nowrap"
      className={classes.mainGrid}
    >
      <span style={{ flexGrow: 1 }} />
      <Grid item className={classes.roundsGrid}>
        {topRow}
      </Grid>
      <span style={{ flexGrow: 1 }} />
      <Grid item className={classes.roundsGrid}>
        {bottomRow}
      </Grid>
    </Grid>
  );
};

const RoundTopSnippet = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { errors, loading, current } = useAppSelector((state) => state.rounds);
  const { setAlert } = useContext(AlertContext);

  const [progress, setProgress] = useState<number>(0);

  if (firstLoad) {
    dispatch(fetchCurrentRound());
    console.log('here');

    firstLoad = false;
  }

  useEffect(() => {
    if (!loading) {
      window.setTimeout(
        () => {
          dispatch(fetchCurrentRound());
        },
        !errors ? CURRENT_ROUNDS_INTERVAL : hasErrorTimeOut
      );

      if (errors) {
        setAlert(errors, 'error');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (current?.durationMs && current.startTime) {
      const secondsElapsed = moment().diff(current.startTime, 'seconds');

      setProgress(Math.round((secondsElapsed / current.durationMs) * 1000 * 100));
    } else {
      setProgress(0);
    }
  }, [current]);

  return (
    <Card variant="outlined" className={classes.card}>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="stretch"
        wrap="nowrap"
      >
        <Grid item xs={4} style={{ alignSelf: 'center' }}>
          <Typography variant="h3">Orderbook</Typography>
        </Grid>
        <Grid item xs={8} style={{ alignSelf: 'center', height: '100%' }}>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="stretch"
            wrap="nowrap"
          >
            <Grid item xs={4}>
              <TwoRowsContainer
                topRow={
                  <>
                    <Typography variant="h4">Current Round</Typography>
                    <Box color="success.main">
                      <Typography variant="body1">{current?.id || '-'}</Typography>
                    </Box>
                  </>
                }
                bottomRow={
                  <>
                    <Typography variant="body1" component="div">
                      <IconWithText text="Started" />
                    </Typography>
                    <Typography variant="body1">
                      {current?.startTime ? timeAgo(current?.startTime) : '-'}
                    </Typography>
                  </>
                }
              />
            </Grid>
            <Divider orientation="vertical" flexItem variant="middle" />
            <Grid item xs={4}>
              <TwoRowsContainer
                topRow={<CircularProgressWithLabel value={progress} size={48} color="primary" />}
                bottomRow={
                  <>
                    <Typography variant="body1" component="div">
                      <IconWithText text="Remaining" />
                    </Typography>
                    <Typography variant="body1">
                      {current?.startTime && current?.durationMs
                        ? timeRemaining(current.startTime, current.durationMs / 1000)
                        : '-'}
                    </Typography>
                  </>
                }
              />
            </Grid>
            <Divider orientation="vertical" flexItem variant="middle" />
            <Grid item xs={4}>
              <TwoRowsContainer
                topRow={
                  <Typography variant="body1">
                    {current?.startTime && current?.durationMs
                      ? timeRange(current.startTime, current.durationMs / 1000)
                      : '-'}
                  </Typography>
                }
                bottomRow={
                  <>
                    <Typography variant="body1" component="div">
                      <IconWithText text="Duration" />
                    </Typography>
                    <Typography variant="body1">
                      {current?.durationMs ? timeDuration(current.durationMs / 1000) : '-'}
                    </Typography>
                  </>
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RoundTopSnippet;
