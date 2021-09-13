export const API_URL = process.env.REACT_APP_BASE_API_URL || '';
export const CURRENT_ROUNDS_INTERVAL =
  (parseInt(process.env.REACT_APP_CURRENT_ROUNDS_INTERVAL_SEC || '', 10) || 10) * 1000;
