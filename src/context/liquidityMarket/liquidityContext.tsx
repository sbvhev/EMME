import { createContext } from 'react';
import { LiquidityMarketResponse } from 'material/shared/model/liquidity.model';
import { SupportedExchangeResponse } from 'material/shared/model/exchange.model';

type LiquidityContextType = {
  selectedLiquidityMarket?: LiquidityMarketResponse;
  selectedExchange?: SupportedExchangeResponse;
  changeLiquidityMarket: (data?: LiquidityMarketResponse) => void;
  changeExchange: (data?: SupportedExchangeResponse) => void;
};

const liquidityContext = createContext<LiquidityContextType>({
  selectedLiquidityMarket: undefined,
  selectedExchange: undefined,
  changeLiquidityMarket: () => null,
  changeExchange: () => null,
});

export default liquidityContext;
