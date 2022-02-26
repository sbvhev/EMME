import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';

import LiquidityContext from 'context/liquidityMarket/liquidityContext';
import { useAppSelector } from 'stores/hooks';

import TableWithSortingPagination, {
  HeadCell,
} from 'material/shared/components/TableWithSortingPagination';
import { LiquidityOrderSide, LiquidityOrderState } from 'material/shared/model/liquidity.model';

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
    label: 'Market Value',
    endLabel: true,
  },
];

const ClosedOrders = () => {
  const { allMarketsOrders } = useAppSelector((state) => state.liquidityMarket);
  const { selectedLiquidityMarket } = useContext(LiquidityContext);

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
                  data?.state === LiquidityOrderState.CANCELLED ||
                  data?.state === LiquidityOrderState.FILLED ||
                  // for testing only
                  data?.state === LiquidityOrderState.PARTIALLY_FILLED
              )) ||
          []
        }
        inputHeadCells={headCells}
        tableMinWidth={0}
        inputRowsPerPage={10}
      />
    </Container>
  );
};

export default ClosedOrders;
