import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import {
  LiquidityMarketRequest,
  LiquidityMarketsResponse,
  LiquidityOrderResponse,
  LiquidityOrderSide,
  LiquidityOrdersResponse,
  OrdersForLiquidityMarketRequest,
  POSTLiquidityOrderRequest,
} from 'material/shared/model/liquidity.model';

import { getAxios, handleResponseError } from 'material/shared/utils/axios';

import type { RootState } from '../store';

export const fetchLiquidityMarkets = createAsyncThunk(
  'liquidity-markets',
  async (options: LiquidityMarketRequest, { rejectWithValue }) => {
    let axiosInst: AxiosInstance;

    try {
      axiosInst = await getAxios(true);
    } catch (err: any) {
      return rejectWithValue(err?.message || err);
    }

    try {
      const response = await axiosInst.request({
        method: 'GET',
        url: '/liquidity-markets',
        params: { ...options },
      });

      return response.data as LiquidityMarketsResponse;
    } catch (error: any) {
      const msg: Object | string = handleResponseError(error?.response?.data || error);
      return rejectWithValue(msg);
    }
  }
);

export const fetchOrdersForLiquidityMarket = createAsyncThunk(
  'liquidity-markets/id/orders',
  async ({ liquidityMarketId, options }: OrdersForLiquidityMarketRequest, { rejectWithValue }) => {
    let axiosInst: AxiosInstance;

    try {
      axiosInst = await getAxios(true);
    } catch (err: any) {
      return rejectWithValue(err?.message || err);
    }

    try {
      const response = await axiosInst.request({
        method: 'GET',
        url: `/liquidity-markets/${liquidityMarketId}/orders`,
        params: { ...options },
      });

      return { id: liquidityMarketId, data: response.data as LiquidityOrdersResponse } as {
        id: string;
        data: LiquidityOrdersResponse;
      };
    } catch (error: any) {
      const msg: Object | string = handleResponseError(error?.response?.data || error);
      return rejectWithValue(msg);
    }
  }
);

export const fetchALLOrdersForLiquidityMarket = createAsyncThunk(
  'all-liquidity-markets/id/orders/mine',
  async (liquidityMarketId: string, { rejectWithValue }) => {
    let axiosInst: AxiosInstance;

    try {
      axiosInst = await getAxios(true);
    } catch (err: any) {
      return rejectWithValue(err?.message || err);
    }

    try {
      const response = await Promise.all([
        axiosInst.request({
          method: 'GET',
          url: `/liquidity-markets/${liquidityMarketId}/orders`,
          params: { side: LiquidityOrderSide.PROVISION },
        }),
        axiosInst.request({
          method: 'GET',
          url: `/liquidity-markets/${liquidityMarketId}/orders`,
          params: { side: LiquidityOrderSide.SUBSCRIPTION },
        }),
      ]);

      const provisions: LiquidityOrdersResponse = response[0].data;
      const subscriptions: LiquidityOrdersResponse = response[1].data;
      return {
        id: liquidityMarketId,
        data: [
          ...(provisions?.liquidityOrders?.elements || []),
          ...(subscriptions?.liquidityOrders?.elements || []),
        ],
      } as {
        id: string;
        data: LiquidityOrderResponse[];
      };
    } catch (error: any) {
      const msg: Object | string = handleResponseError(error?.response?.data || error);
      return rejectWithValue(msg);
    }
  }
);

export const postOrderForLiquidityMarket = createAsyncThunk(
  'post-liquidity-markets/id/orders',
  async ({ liquidityMarketId, options }: POSTLiquidityOrderRequest, { rejectWithValue }) => {
    let axiosInst: AxiosInstance;

    try {
      axiosInst = await getAxios(true);
    } catch (err: any) {
      return rejectWithValue(err?.message || err);
    }

    try {
      const response = await axiosInst.request({
        method: 'POST',
        url: `/liquidity-markets/${liquidityMarketId}/orders`,
        data: { ...options },
      });

      return response.data as LiquidityOrdersResponse;
    } catch (error: any) {
      const msg: Object | string = handleResponseError(error?.response?.data || error);
      return rejectWithValue(msg);
    }
  }
);

export const postCancelOrderForLiquidityMarket = createAsyncThunk(
  'post-liquidity-markets/id/order/id/cancel',
  async (
    {
      liquidityMarketId,
      liquidityOrderId,
    }: { liquidityMarketId: string; liquidityOrderId: string },
    { rejectWithValue }
  ) => {
    let axiosInst: AxiosInstance;

    try {
      axiosInst = await getAxios(true);
    } catch (err: any) {
      return rejectWithValue(err?.message || err);
    }

    try {
      const response = await axiosInst.request({
        method: 'POST',
        url: `/liquidity-markets/${liquidityMarketId}/order/${liquidityOrderId}/cancel`,
      });

      return response.data;
    } catch (error: any) {
      const msg: Object | string = handleResponseError(error?.response?.data || error);
      return rejectWithValue(msg);
    }
  }
);

interface Props {
  loadingMarkets: boolean;
  loadingOrders: boolean;
  loadingPlaceOrder: boolean;
  loadingCancelOrder: boolean;
  market: LiquidityMarketsResponse | null;
  orders: { [id: string]: LiquidityOrdersResponse } | null;
  allMarketsOrders: { [id: string]: LiquidityOrderResponse[] } | null;
  errors: any;
  success: any;
}

const initialState: Props = {
  loadingMarkets: false,
  loadingOrders: false,
  loadingPlaceOrder: false,
  loadingCancelOrder: false,
  market: null,
  errors: null,
  success: null,
  orders: null,
  allMarketsOrders: null,
};

const liquidityMarketSlice = createSlice({
  name: 'liquidityMarket',
  initialState,
  reducers: {
    resetData: (state) => {
      state.success = null;
      state.errors = null;
      state.market = null;
      state.orders = null;
      state.allMarketsOrders = null;
    },
    resetMessage: (state) => {
      state.success = null;
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    // GET liquidity-market
    builder.addCase(fetchLiquidityMarkets.pending, (state) => {
      state.loadingMarkets = true;
    });
    builder.addCase(fetchLiquidityMarkets.fulfilled, (state, action) => {
      state.loadingMarkets = false;

      if (
        JSON.stringify(state.market?.liquidityMarkets) !==
        JSON.stringify(action.payload?.liquidityMarkets)
      ) {
        state.market = { ...action.payload };
      }
    });
    builder.addCase(fetchLiquidityMarkets.rejected, (state, action) => {
      state.errors = action.payload;
      state.loadingMarkets = false;
      state.market = null;
    });
    // GET liquidity-market/id/orders
    builder.addCase(fetchOrdersForLiquidityMarket.pending, (state) => {
      state.loadingOrders = true;
    });
    builder.addCase(fetchOrdersForLiquidityMarket.fulfilled, (state, action) => {
      state.loadingOrders = false;
      if (
        JSON.stringify(state.orders) !==
        JSON.stringify({ [action.payload.id]: action.payload.data })
      ) {
        state.orders = { ...state.orders, ...{ [action.payload.id]: action.payload.data } };
      }
    });
    builder.addCase(fetchOrdersForLiquidityMarket.rejected, (state, action) => {
      state.errors = action.payload;
      state.loadingOrders = false;
      state.orders = null;
    });
    // GET all-liquidity-market/id/orders
    builder.addCase(fetchALLOrdersForLiquidityMarket.pending, (state) => {
      state.loadingOrders = true;
    });
    builder.addCase(fetchALLOrdersForLiquidityMarket.fulfilled, (state, action) => {
      state.loadingOrders = false;
      if (
        !state.allMarketsOrders ||
        !state.allMarketsOrders[action.payload.id] ||
        JSON.stringify(state.allMarketsOrders[action.payload.id]) !==
          JSON.stringify(action.payload.data)
      ) {
        state.allMarketsOrders = {
          ...state.allMarketsOrders,
          ...{ [action.payload.id]: action.payload.data },
        };
      }
    });
    builder.addCase(fetchALLOrdersForLiquidityMarket.rejected, (state, action) => {
      state.errors = action.payload;
      state.loadingOrders = false;
      state.allMarketsOrders = null;
    });
    // POST liquidity-market/id/orders
    builder.addCase(postOrderForLiquidityMarket.pending, (state) => {
      state.loadingPlaceOrder = true;
    });
    builder.addCase(postOrderForLiquidityMarket.fulfilled, (state) => {
      state.loadingPlaceOrder = false;
    });
    builder.addCase(postOrderForLiquidityMarket.rejected, (state) => {
      state.loadingPlaceOrder = false;
    });
    // POST liquidity-market/id/order/id/cancel
    builder.addCase(postCancelOrderForLiquidityMarket.pending, (state) => {
      state.loadingCancelOrder = true;
    });
    builder.addCase(postCancelOrderForLiquidityMarket.fulfilled, (state) => {
      state.loadingCancelOrder = false;
    });
    builder.addCase(postCancelOrderForLiquidityMarket.rejected, (state) => {
      state.loadingCancelOrder = false;
    });
  },
});

export const { resetData, resetMessage } = liquidityMarketSlice.actions;
export const liquidityMarketSelector = (state: RootState) => state.liquidityMarket;
export default liquidityMarketSlice.reducer;
