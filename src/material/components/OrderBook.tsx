import React from 'react';
import Container from '@material-ui/core/Container';

import TableWithSortingPagination, {
  HeadCell,
} from 'material/shared/components/TableWithSortingPagination';
import { mockOrderData } from './mockData';

const headCells: HeadCell[] = [
  {
    id: 'btcLiquidityOneId',
    numericFloat: true,
    floatDecimals: 2,
    label: 'BTC Liquidity',
    color: 'success',
    endLabel: true,
  },
  {
    id: 'rateOneId',
    numericFloat: true,
    floatDecimals: 2,
    label: 'Rate/BTC',
    color: 'success',
    endLabel: true,
  },
  {
    id: 'totalOneId',
    numericFloat: true,
    floatDecimals: 2,
    label: 'Total',
    color: 'success',
    endLabel: true,
  },
  {
    id: 'emptyCell',
    label: '',
  },
  {
    id: 'btcLiquidityOneId',
    numericFloat: true,
    floatDecimals: 2,
    label: 'BTC Liquidity',
    color: 'warn',
    endLabel: true,
  },
  {
    id: 'rateOneId',
    numericFloat: true,
    floatDecimals: 2,
    label: 'Rate/BTC',
    color: 'warn',
    endLabel: true,
  },
  {
    id: 'totalOneId',
    numericFloat: true,
    floatDecimals: 2,
    label: 'Total',
    color: 'warn',
    endLabel: true,
  },
];

const OrderBook = () => {
  console.log('order book');

  return (
    <Container disableGutters maxWidth={false}>
      <TableWithSortingPagination
        inputRows={
          mockOrderData.map((data, index) => {
            data.id = index;
            return data;
          }) || []
        }
        inputHeadCells={headCells}
        tableMinWidth={0}
        inputRowsPerPage={10}
      />
    </Container>
  );
};

export default OrderBook;
