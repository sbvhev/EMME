import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';

import { useAppDispatch, useAppSelector } from 'stores/hooks';
import AlertContext from 'context/alert/alertContext';
import LiquidityContext from 'context/liquidityMarket/liquidityContext';

import TableWithSortingPagination, {
  ColumnAlign,
  HeadCell,
} from 'material/shared/components/TableWithSortingPagination';
import { LiquidityOrderSide, LiquidityOrderState } from 'material/shared/model/liquidity.model';
import {
  fetchALLOrdersForLiquidityMarket,
  postCancelOrderForLiquidityMarket,
} from 'stores/reducers/liquidityMarket';

const headCells: HeadCell[] = [
  {
    id: 'placed',
    isDate: true,
    label: 'Placed',
  },
  {
    id: 'liquidityMarketId',
    label: 'Market',
  },
  {
    id: 'side',
    label: 'Type',
    hasColor: true,
  },
  {
    id: 'price',
    numericFloat: true,
    floatDecimals: 6,
    label: 'Price',
    endLabel: true,
  },
  {
    id: 'baseVolume',
    numericFloat: true,
    floatDecimals: 2,
    label: 'Quantity',
    endLabel: true,
  },
  {
    id: 'quoteVolume',
    numericFloat: true,
    floatDecimals: 4,
    label: 'Est. Total',
    endLabel: true,
  },
  {
    id: 'priceRate',
    numericFloat: true,
    floatDecimals: 2,
    label: 'Est. Value',
    endLabel: true,
  },
  {
    id: 'button',
    label: 'Action',
    align: ColumnAlign.CENTER,
    buttonLabel: 'Cancel',
  },
];

const OpenOrders = () => {
  const dispatch = useAppDispatch();
  const { allMarketsOrders, loadingCancelOrder } = useAppSelector((state) => state.liquidityMarket);

  const { setAlert } = useContext(AlertContext);
  const { selectedLiquidityMarket } = useContext(LiquidityContext);

  const handleAction = async (id: string) => {
    if (loadingCancelOrder) return;

    if (!selectedLiquidityMarket || !id) {
      setAlert('Market was not selected', 'error', 2500);
      return;
    }

    try {
      await dispatch(
        postCancelOrderForLiquidityMarket({
          liquidityMarketId: selectedLiquidityMarket?.id,
          liquidityOrderId: id,
        })
      ).unwrap();

      setAlert(`Order ${id} cancelled`, 'success', 2500);
      if (selectedLiquidityMarket?.id) {
        dispatch(fetchALLOrdersForLiquidityMarket(selectedLiquidityMarket?.id));
      }
    } catch (error: any) {
      setAlert(error?.message || error, 'error');
    }
  };

  return (
    <Container disableGutters maxWidth={false}>
      <TableWithSortingPagination
        inputRows={
          (allMarketsOrders &&
            selectedLiquidityMarket &&
            (allMarketsOrders[selectedLiquidityMarket?.id] || [])
              .map((data) => ({
                ...data,
                sideColor: data.side === LiquidityOrderSide.PROVISION ? 'warn' : 'success',
                side:
                  data.side === LiquidityOrderSide.PROVISION ? 'Liquidity Ask' : 'Liquidity Bid',
                priceLabel: selectedLiquidityMarket?.baseCoin,
                baseVolumeLabel: selectedLiquidityMarket?.baseCoin,
                quoteVolumeLabel: selectedLiquidityMarket?.quoteCoin,
                priceRateLabel: selectedLiquidityMarket?.baseCoin,
              }))
              .filter(
                (data) =>
                  data?.state === LiquidityOrderState.PARTIALLY_FILLED ||
                  data?.state === LiquidityOrderState.PLACED
              )) ||
          []
        }
        handleAction={handleAction}
        inputHeadCells={headCells}
        tableMinWidth={0}
        inputRowsPerPage={10}
      />
    </Container>
  );
};

export default OpenOrders;
