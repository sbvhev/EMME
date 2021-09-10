import React, { useContext } from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import AlertContext from 'context/alert/alertContext';

const Alerts = () => {
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
            <Alert onClose={() => removeAlert(alert.id)} severity={alert?.type}>
              {alert?.msg}
            </Alert>
          </Snackbar>
        ))}
    </>
  );
};

export default Alerts;
