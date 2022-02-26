import { PagedResponse } from './model';

export enum LiquidityOrderSide {
  PROVISION = 'PROVISION',
  SUBSCRIPTION = 'SUBSCRIPTION',
  BOTH = 'BOTH',
}

export enum LiquidityOrderState {
  PLACED = 'PLACED',
  PARTIALLY_FILLED = 'PARTIALLY_FILLED',
  FILLED = 'FILLED',
  CANCELLED = 'CANCELLED',
}

export enum Direction {
  Asc = 'Asc',
  Desc = 'Desc',
}

export interface LiquidityMarketRequest {
  exchangeId: string;
  pageNumber?: number;
  size?: number;
  sortingProperty?: string;
  direction?: Direction;
}

export interface LiquidityMarketResponse {
  id: string;
  baseCoin: string;
  quoteCoin: string;
  exchangeId: string;
  enabled: boolean;
  exchangeEnabled: boolean;
}

export interface LiquidityMarketsResponse {
  liquidityMarkets: PagedResponse<LiquidityMarketResponse>;
}

export interface OrdersForLiquidityMarketRequest {
  liquidityMarketId: string;
  options: OptionsOrdersForLiquidityMarketRequest;
}

interface OptionsOrdersForLiquidityMarketRequest {
  side: LiquidityOrderSide;
  pageNumber?: number;
  size?: number;
  sortingProperty?: string;
  direction?: Direction;
}

export interface POSTLiquidityOrderRequest {
  liquidityMarketId: string;
  options: LiquidityOrderRequest;
}

export interface LiquidityOrderRequest {
  baseVolume: string;
  price: string;
  quoteVolume: string;
  side: LiquidityOrderSide;
}

export interface LiquidityOrderResponse {
  id: string;
  liquidityMarketId: string;
  baseVolume: string;
  quoteVolume: string;
  price: string;
  priceRate: string;
  filledVolume: string;
  side: string;
  state: LiquidityOrderState;
}

export interface LiquidityOrdersResponse {
  liquidityOrders: PagedResponse<LiquidityOrderResponse>;
}
