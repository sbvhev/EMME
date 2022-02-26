import React, { useContext, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'stores/hooks';
import {
  fetchALLOrdersForLiquidityMarket,
  postOrderForLiquidityMarket,
} from 'stores/reducers/liquidityMarket';
import { LiquidityOrderRequest, LiquidityOrderSide } from 'material/shared/model/liquidity.model';

import AlertContext from 'context/alert/alertContext';
import LiquidityContext from 'context/liquidityMarket/liquidityContext';

import TabsContainer, { TabsProps } from 'material/shared/components/TabsContainer';
import PlaceOrderForm, { PlaceOrderFormData } from './PlaceOrderForm';

const placeOrder: TabsProps[] = [{ label: 'Buy Liquidity' }, { label: 'Sell Liquidity' }];

const PlaceOrder = () => {
  const dispatch = useAppDispatch();
  const { loadingPlaceOrder } = useAppSelector((state) => state.liquidityMarket);
  const { setAlert } = useContext(AlertContext);
  const { selectedLiquidityMarket } = useContext(LiquidityContext);

  const [toggleOrder, setToggleOrder] = useState<number>(0);

  const onSubmit = async (sendData: PlaceOrderFormData) => {
    if (!selectedLiquidityMarket) {
      setAlert('market was not selected', 'error', 2500);
      return;
    }
    const side: LiquidityOrderSide =
      toggleOrder === 0 ? LiquidityOrderSide.PROVISION : LiquidityOrderSide.SUBSCRIPTION;
    const options: LiquidityOrderRequest = {
      price: JSON.stringify(sendData.price),
      baseVolume: JSON.stringify(sendData.baseVolume),
      quoteVolume: JSON.stringify(sendData.quoteVolume),
      side,
    };

    try {
      await dispatch(
        postOrderForLiquidityMarket({
          liquidityMarketId: selectedLiquidityMarket?.id,
          options,
        })
      ).unwrap();

      setAlert(`Successfully placed ${toggleOrder === 0 ? 'buy' : 'sell'} order`, 'success', 2500);
      if (selectedLiquidityMarket?.id) {
        dispatch(fetchALLOrdersForLiquidityMarket(selectedLiquidityMarket?.id));
      }
    } catch (error: any) {
      setAlert(error?.message || error, 'error');
    }
  };

  return (
    <>
      <TabsContainer
        tabs={placeOrder}
        onChange={(data) => setToggleOrder(data)}
        variant="standard"
      />
      <div style={{ paddingTop: 15, paddingBottom: 15 }}>
        <PlaceOrderForm
          onSubmit={onSubmit}
          loading={loadingPlaceOrder}
          isDisabled={!selectedLiquidityMarket}
        />
      </div>
    </>
  );
};

export default PlaceOrder;
