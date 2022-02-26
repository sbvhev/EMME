import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import AlertContext from 'context/alert/alertContext';

const useStyles = makeStyles(() =>
  createStyles({
    alert: {
      alignItems: 'center',
      borderRadius: 10,
    },
  })
);

const Alerts = () => {
  const classes = useStyles();
  const alertContext = useContext(AlertContext);

  const { removeAlert } = alertContext;

  return (
    <>
      {alertContext?.alerts?.length > 0 &&
        alertContext?.alerts.map((alert) => (
          <Snackbar
            key={alert.id}
            open
            autoHideDuration={alert.timeout || 5000}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <Alert
              onClose={() => removeAlert(alert.id)}
              severity={alert?.type}
              variant="filled"
              style={{ minHeight: 80 }}
              classes={{ root: classes.alert }}
            >
              <Typography component="span">{alert?.msg}</Typography>
            </Alert>
          </Snackbar>
        ))}
    </>
  );
};

export default Alerts;
