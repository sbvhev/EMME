/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import moment from 'moment';

import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { fetchCurrentRound, resetMessage } from 'stores/reducers/rounds';
import AlertContext from 'context/alert/alertContext';

import { CURRENT_ROUNDS_INTERVAL, ERROR_API_INTERVAL } from 'config';
import { timeAgo, timeDuration, timeRange, timeRemaining } from '../shared/utils/util';
import CircularProgressWithLabel from '../shared/components/CircularProgressWithLabel';

let refreshTimer = 0;

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      minWidth: 400,
      padding: '10px 52px',
      [theme.breakpoints.down('md')]: {
        padding: '10px',
      },
      marginBottom: 26,
    },
    mainGrid: { minHeight: '136px' },
    roundsGrid: {
      alignSelf: 'center',
      textAlign: 'center',
    },
    progressBar: {
      color: theme.palette.success.main,
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
  const theme = useTheme();

  const phoneWidth = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useAppDispatch();
  const { errors, current, loading } = useAppSelector((state) => state.rounds);
  const { setAlert } = useContext(AlertContext);

  const [progress, setProgress] = useState<number>(0);
  const [timeRemainingString, setTimeRemainingString] = useState<string | undefined>(undefined);
  const [timeAgoString, setTimeAgoString] = useState<string | undefined>(undefined);

  const updateValues = () => {
    if (!current) return;
    const secondsElapsed = moment().utc().diff(current.startTime, 'seconds');

    setProgress(Math.round((secondsElapsed / current.durationMs) * 100));

    setTimeRemainingString(timeRemaining(current?.startTime, current?.durationMs));
    setTimeAgoString(timeAgo(current?.startTime));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (refreshTimer >= 1 && current) {
        updateValues();
        refreshTimer -= 1;
        if (progress > 99) {
          refreshTimer = 0;
        }
      }

      if (!loading && refreshTimer < 1) {
        dispatch(fetchCurrentRound());
        refreshTimer = !errors ? CURRENT_ROUNDS_INTERVAL : ERROR_API_INTERVAL - 1;
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [current]);

  useEffect(() => {
    if (current?.durationMs && current?.startTime) {
      updateValues();
    } else {
      setProgress(0);
    }
  }, [current]);

  useEffect(() => {
    if (errors) {
      setAlert(errors, 'error');
      dispatch(resetMessage());
    }
  }, [errors]);

  return (
    <Card className={classes.card} color="inherit">
      <Grid
        container
        direction={phoneWidth ? 'column' : 'row'}
        justifyContent="space-around"
        alignItems="stretch"
        wrap="nowrap"
        spacing={phoneWidth ? 4 : undefined}
      >
        <Grid item xs={phoneWidth ? false : 4} style={{ alignSelf: 'center' }}>
          <Typography variant="h3">Orderbook</Typography>
        </Grid>

        <Grid item xs={phoneWidth ? false : 8} style={{ alignSelf: 'center', height: '100%' }}>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="stretch"
            wrap="nowrap"
          >
            <Grid item xs={phoneWidth ? 6 : 4}>
              <TwoRowsContainer
                topRow={
                  <>
                    <Typography variant="h5">Current Round</Typography>
                    <Box
                      color="success.main"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        wordBreak: 'break-all',
                      }}
                    >
                      <Typography>{current?.id || '-'}</Typography>
                    </Box>
                  </>
                }
                bottomRow={
                  <>
                    <Typography component="div">
                      <IconWithText text="Started" />
                    </Typography>
                    <Typography variant="subtitle1">{timeAgoString || '-'}</Typography>
                  </>
                }
              />
            </Grid>
            <Divider orientation="vertical" flexItem variant="middle" />
            <Grid item xs={phoneWidth ? 6 : 4}>
              <TwoRowsContainer
                topRow={
                  <CircularProgressWithLabel
                    value={progress}
                    size={48}
                    className={classes.progressBar}
                  />
                }
                bottomRow={
                  <>
                    <Typography component="div">
                      <IconWithText text="Remaining" />
                    </Typography>
                    <Typography variant="subtitle1">{timeRemainingString || '-'}</Typography>
                  </>
                }
              />
            </Grid>

            {!phoneWidth && (
              <>
                <Divider orientation="vertical" flexItem variant="middle" />
                <Grid item xs={4}>
                  <TwoRowsContainer
                    topRow={
                      <Typography variant="subtitle1">
                        {current?.startTime && current?.durationMs
                          ? timeRange(current.startTime, current.durationMs)
                          : '-'}
                      </Typography>
                    }
                    bottomRow={
                      <>
                        <Typography component="div">
                          <IconWithText text="Duration" />
                        </Typography>
                        <Typography variant="subtitle1">
                          {current?.durationMs ? timeDuration(current.durationMs) : '-'}
                        </Typography>
                      </>
                    }
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RoundTopSnippet;
