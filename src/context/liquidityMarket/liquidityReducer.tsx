import { SupportedExchangeResponse } from 'material/shared/model/exchange.model';
import { LiquidityMarketResponse } from 'material/shared/model/liquidity.model';
import { SET_EXCHANGE, SET_LIQUIDITY_MARKET } from '../types';

export default (
  state: {
    selectedLiquidityMarket?: LiquidityMarketResponse;
    selectedExchange?: SupportedExchangeResponse;
  },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case SET_LIQUIDITY_MARKET:
      if (JSON.stringify(state.selectedLiquidityMarket) !== JSON.stringify(action.payload)) {
        return { ...state, selectedLiquidityMarket: { ...action.payload } };
      }
      return state;

    case SET_EXCHANGE:
      if (JSON.stringify(state.selectedExchange) !== JSON.stringify(action.payload)) {
        return { ...state, selectedExchange: { ...action.payload } };
      }
      return state;

    default:
      return state;
  }
};
