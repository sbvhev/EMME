/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { debounce } from 'lodash';

import { useAppDispatch, useAppSelector } from 'stores/hooks';
import AlertContext from 'context/alert/alertContext';
import LiquidityContext from 'context/liquidityMarket/liquidityContext';

import { LIQUIDITY_MARKET_INTERVAL } from 'config';
import {
  fetchLiquidityMarkets,
  fetchALLOrdersForLiquidityMarket,
  resetMessage,
} from 'stores/reducers/liquidityMarket';

import TableWithSortingPagination, {
  HeadCell,
} from '../shared/components/TableWithSortingPagination';

const headCells: HeadCell[] = [
  { id: 'pair', label: 'Pair' },
  { id: 'price', numericFloat: true, label: 'Price' },
  { id: 'volume', numericInt: true, label: 'Volume' },
];

const LiquidityMarkets = () => {
  const dispatch = useAppDispatch();
  const { errors, market, loadingMarkets, loadingOrders } = useAppSelector(
    (state) => state.liquidityMarket
  );
  const { setAlert } = useContext(AlertContext);
  const { changeLiquidityMarket, selectedLiquidityMarket, selectedExchange } =
    useContext(LiquidityContext);

  const [tempMarkets, setTempMarkets] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  let filteredRows = tempMarkets;

  if (search !== '') {
    filteredRows = tempMarkets.filter((data) =>
      data?.pair?.toLowerCase().includes(search.toLowerCase())
    );
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeHandler = useCallback(
    debounce((e) => {
      setSearch(e.target.value);
    }, 500),
    []
  );

  useEffect(() => {
    console.log(selectedExchange);

    if (!selectedExchange) return;

    const timer = setInterval(() => {
      if (!loadingMarkets) {
        dispatch(fetchLiquidityMarkets({ exchangeId: selectedExchange?.id }));
      }
    }, LIQUIDITY_MARKET_INTERVAL * 1000);

    return () => clearInterval(timer);
  }, [selectedExchange]);

  useEffect(() => {
    if (errors) {
      setAlert(errors, 'error');
      dispatch(resetMessage());
    }
  }, [errors]);

  useEffect(() => {
    if (JSON.stringify(tempMarkets) !== JSON.stringify(market?.liquidityMarkets?.elements || '')) {
      setTempMarkets(
        market?.liquidityMarkets?.elements.map((marketEl) => ({
          ...marketEl,
          pair: `${marketEl?.baseCoin}/${marketEl?.quoteCoin}`,
          price: '123456',
          volume: '654321',
        })) || []
      );
    }
  }, [market]);

  useEffect(() => {
    if (tempMarkets && tempMarkets?.length > 0 && !selectedLiquidityMarket) {
      changeLiquidityMarket(tempMarkets[0]);
    }
  }, [tempMarkets]);

  useEffect(() => {
    if (!selectedLiquidityMarket?.id) return;
    dispatch(fetchALLOrdersForLiquidityMarket(selectedLiquidityMarket?.id));

    const timer = setInterval(() => {
      if (!loadingOrders) {
        dispatch(fetchALLOrdersForLiquidityMarket(selectedLiquidityMarket?.id));
      }
    }, LIQUIDITY_MARKET_INTERVAL * 1000);

    return () => clearInterval(timer);
  }, [selectedLiquidityMarket]);

  const handleRowAction = (id: string) => {
    console.log('changed market', id);
    changeLiquidityMarket(tempMarkets?.find((a) => a.id === id) || undefined);
  };

  return (
    <>
      <TextField
        label="Search Markets"
        onChange={debouncedChangeHandler}
        name="search"
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: true }}
        placeholder="Search Markets"
        InputProps={{
          endAdornment: <SearchOutlinedIcon />,
        }}
        disabled={!filteredRows?.length}
        style={{ marginBottom: 10 }}
      />
      <TableWithSortingPagination
        inputRows={filteredRows || []}
        inputHeadCells={headCells}
        inputRowsPerPage={10}
        inputOrderBy="volumeId"
        disablePagination
        tableMinWidth={0}
        handleRowAction={handleRowAction}
      />
    </>
  );
};

export default LiquidityMarkets;
