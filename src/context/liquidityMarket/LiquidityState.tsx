import React, { ReactNode, useReducer } from 'react';

import { LiquidityMarketResponse } from 'material/shared/model/liquidity.model';
import { SupportedExchangeResponse } from 'material/shared/model/exchange.model';

import LiquidityContext from './liquidityContext';
import LiquidityReducer from './liquidityReducer';

import { SET_EXCHANGE, SET_LIQUIDITY_MARKET } from '../types';

interface Props {
  children: ReactNode;
}

const LiquidityState = ({ children }: Props) => {
  const initialState: {
    selectedLiquidityMarket?: LiquidityMarketResponse;
    selectedExchange?: SupportedExchangeResponse;
  } = {
    selectedLiquidityMarket: undefined,
    selectedExchange: undefined,
  };

  const [state, dispatch] = useReducer(LiquidityReducer, initialState);

  const changeLiquidityMarket = (data?: LiquidityMarketResponse) => {
    if (data) {
      dispatch({
        type: SET_LIQUIDITY_MARKET,
        payload: data,
      });
    }
  };

  const changeExchange = (data?: SupportedExchangeResponse) => {
    if (data) {
      dispatch({
        type: SET_EXCHANGE,
        payload: data,
      });
    }
  };

  return (
    <LiquidityContext.Provider
      value={{
        selectedLiquidityMarket: state.selectedLiquidityMarket,
        selectedExchange: state.selectedExchange,
        changeLiquidityMarket,
        changeExchange,
      }}
    >
      {children}
    </LiquidityContext.Provider>
  );
};

export default LiquidityState;
