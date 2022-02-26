export const API_URL = process.env.REACT_APP_BASE_API_URL || '';
export const ERROR_API_INTERVAL =
  parseInt(process.env.REACT_APP_ERROR_API_INTERVAL_SEC || '', 10) || 120;
export const CURRENT_ROUNDS_INTERVAL =
  parseInt(process.env.REACT_APP_CURRENT_ROUNDS_INTERVAL_SEC || '', 10) || 60;
export const LIQUIDITY_MARKET_INTERVAL =
  parseInt(process.env.REACT_APP_LIQUIDITY_MARKET_INTERVAL_SEC || '', 10) || 10;
export const EXCHANGES_INTERVAL =
  parseInt(process.env.REACT_APP_EXCHANGES_INTERVAL_SEC || '', 10) || 10;
