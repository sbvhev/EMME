import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

import { SET_ALERT, REMOVE_ALERT } from '../types';

interface Props {
  children: React.ReactNode;
}

const AlertState = ({ children }: Props) => {
  const initialState: any[] = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg: string, type: 'error' | 'info' | 'success', timeout = 5000) => {
    const id = uuidv4();

    if (typeof msg === 'object') {
      msg = JSON.stringify(msg);
    }

    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id, timeout },
    });

    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
          payload: id,
        }),
      timeout
    );
  };

  const removeAlert = (id: string) => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id,
    });
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
        removeAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertState;
