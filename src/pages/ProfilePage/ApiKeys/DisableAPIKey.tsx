import React, { useEffect, useContext } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Box, Typography } from '@material-ui/core';
import { removeCredentials, resetMessage } from 'stores/reducers/users';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import AlertContext from 'context/alert/alertContext';

interface Props {
  exchange: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    subTitle: {
      margin: '0 0 24px',
    },
  })
);

const DisableAPIKey: React.FC<Props> = ({ exchange }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { errors: alertErrors, success } = useAppSelector((state) => state.users);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (alertErrors) {
      setAlert(alertErrors || 'Unknown error', 'error');
    }

    if (success) {
      setAlert(success, 'success', 2500);
    }

    dispatch(resetMessage());

    // eslint-disable-next-line
  }, [alertErrors, success]);

  return (
    <Box>
      <Typography variant="h4" className={classes.subTitle}>
        Disable API keys
      </Typography>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        onClick={() => dispatch(removeCredentials({ exchangeId: exchange }))}
      >
        Disable API keys
      </Button>
    </Box>
  );
};

export default DisableAPIKey;
