/* eslint-disable import/no-anonymous-default-export */
import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state: any[], action: { type: any; payload: any; }) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];

    case REMOVE_ALERT:
      return state.filter((alert: { id: any; }) => alert.id !== action.payload);

    default:
      return state;
  }
};
