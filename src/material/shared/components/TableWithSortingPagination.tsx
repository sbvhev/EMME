/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
      borderRadius: 0,
      border: 'none',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    rowAction: {
      cursor: 'pointer',
    },
    success: {
      color: theme.palette.success.main,
    },
    warn: {
      color: theme.palette.warning.main,
    },
    initialColor: {
      color: theme.palette.text.primary,
    },
    inheritTypography: {
      fontSize: 'inherit',
      fontFamily: 'inherit',
      lineHeight: 'inherit',
      fontWeight: 'inherit',
    },
  })
);

export enum ColumnSort {
  ASC = 'asc',
  DESC = 'desc',
}

export enum ColumnAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

const setComparatorValue = (value: any, isNumber: boolean): string | number => {
  if (!value) {
    return isNumber ? -1 : '';
  }

  return isNumber && typeof value !== 'number' ? parseFloat(value.toString()) : value || '';
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T, isNumber: boolean) {
  const first = setComparatorValue(a[orderBy], isNumber);
  const second = setComparatorValue(b[orderBy], isNumber);

  if (second < first) {
    return -1;
  }
  if (second > first) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc' | undefined;

function getComparator<Key extends string | number>(
  order: Order,
  orderBy: Key,
  isNumber: boolean
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === ColumnSort.DESC
    ? (a, b) => descendingComparator(a, b, orderBy, isNumber)
    : (a, b) => -descendingComparator(a, b, orderBy, isNumber);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export interface HeadCell {
  disablePadding?: boolean;
  id: string;
  label: string;
  numericFloat?: boolean;
  floatDecimals?: number;
  numericInt?: boolean;
  isDate?: boolean;
  align?: ColumnAlign;
  color?: 'success' | 'warn';
  hasColor?: boolean;
  endLabel?: boolean;
  buttonLabel?: string;
  buttonColor?: 'primary' | 'secondary';
}

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string | number) => void;
  order: Order;
  orderBy: string;
  headCells: HeadCell[];
}

function EnhancedTableHead({
  classes,
  order,
  orderBy,
  headCells,
  onRequestSort,
}: EnhancedTableProps) {
  const createSortHandler = (property: string | number) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={`${headCell.id}_${index}`}
            align={
              headCell.numericFloat || headCell.numericInt ? 'right' : headCell.align || 'left'
            }
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ paddingLeft: 8, paddingRight: 8 }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : ColumnSort.ASC}
              onClick={createSortHandler(headCell.id)}
              hideSortIcon={orderBy === ''}
            >
              <Typography>
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === ColumnSort.DESC ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </Typography>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    title: {
      flex: '1 1 100%',
    },
  })
);

interface EnhancedTableToolbarProps {
  tableTitle: string;
}

const EnhancedTableToolbar = ({ tableTitle }: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography variant="h5" className={classes.title} id="tableTitle" component="div">
        {tableTitle}
      </Typography>
    </Toolbar>
  );
};

export interface TableProps {
  inputRows: any[];
  inputOrderBy?: string;
  inputSortBy?: ColumnSort;
  inputTitle?: string;
  inputHeadCells: HeadCell[];
  inputRowsPerPage?: number;
  inputRowsPerPageOptions?: number[];
  disablePagination?: boolean;
  tableMinWidth?: number;
  handleAction?: (data: string) => void;
  handleRowAction?: (data: string) => void;
}

const TableWithSortingPagination = ({
  inputRows,
  inputOrderBy,
  inputSortBy,
  inputTitle,
  inputHeadCells,
  inputRowsPerPage,
  inputRowsPerPageOptions,
  disablePagination,
  tableMinWidth,
  handleAction,
  handleRowAction,
}: TableProps) => {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>(inputSortBy);
  const [orderBy, setOrderBy] = useState<string>(inputOrderBy || '');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(inputRowsPerPage || 0);
  const [rows, setRows] = useState(inputRows);

  useEffect(() => {
    if (inputRows) {
      setRows(inputRows);
    }
  }, [inputRows]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown | MouseEvent>,
    property: string | number
  ) => {
    if (!orderBy) return;
    const isAsc = orderBy === property && order === ColumnSort.ASC;
    setOrder(isAsc ? ColumnSort.DESC : ColumnSort.ASC);
    setOrderBy(property as string);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (id: string) => {
    handleRowAction && handleRowAction(id);
  };

  const handleButtonClick = (id: string) => {
    handleAction && handleAction(id);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const cellStyle = (cell: HeadCell) => {
    const newStyle: { minWidth?: number; paddingLeft?: number; paddingRight?: number } = {
      paddingLeft: 8,
      paddingRight: 8,
    };
    !(cell.numericInt || cell.numericFloat)
      ? (newStyle.minWidth = 110)
      : (newStyle.paddingLeft = 0);

    if (cell?.align === 'right') {
      newStyle.paddingLeft = 0;
    }

    return newStyle;
  };

  const cellClassName = (row: any, cell: HeadCell) => {
    let newClassName = '';

    if (cell?.hasColor) {
      const cellColor: 'success' | 'warn' = row[`${cell.id}Color`];
      newClassName += classes[cellColor];
    } else if (cell?.color) {
      const cellColor: 'success' | 'warn' = cell.color;
      newClassName += classes[cellColor];
    }

    return newClassName;
  };

  const cellData = (row: any, cell: HeadCell) => {
    let newString = '';
    let newEndLabel;

    if (cell?.buttonLabel) {
      return (
        <Button
          type="button"
          color={cell?.buttonColor || 'default'}
          onClick={() => handleButtonClick(row.id)}
          variant="outlined"
        >
          {cell.buttonLabel}
        </Button>
      );
    }

    if (row[cell.id]) {
      if (cell?.isDate) {
        newString += moment(row[cell.id]).format('LLL');
      } else if (cell?.numericFloat) {
        newString +=
          (cell.numericFloat &&
            parseFloat(row[cell.id] as string).toFixed(cell?.floatDecimals || 6)) ||
          (cell.numericInt && parseFloat(row[cell.id] as string).toFixed(0)) ||
          row[cell.id];
      } else if (cell?.numericInt) {
        newString += parseFloat(row[cell.id] as string).toFixed(0);
      } else {
        newString += row[cell.id];
      }

      if (cell?.endLabel) {
        newEndLabel = cell?.endLabel && (
          <span className={classes.initialColor}>
            {' '}
            {row[`${cell.id}Label`]?.toUpperCase() || row[`${cell.id}Label`]}
          </span>
        );
      }
    }

    return (
      <>
        {newString}
        {newEndLabel || ''}
      </>
    );
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      {inputTitle && <EnhancedTableToolbar tableTitle={inputTitle} />}
      <TableContainer>
        <Table
          style={{ minWidth: tableMinWidth }}
          aria-labelledby="tableTitle"
          size="small"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={inputHeadCells}
          />
          <TableBody>
            {stableSort(
              rows,
              getComparator(
                order,
                orderBy,
                Boolean(
                  inputHeadCells?.find((cell) => cell.id === orderBy)?.numericInt ||
                    Boolean(inputHeadCells?.find((cell) => cell.id === orderBy)?.numericFloat)
                )
              )
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={`${row?.id}_${index}`}
                  onClick={() =>
                    handleRowClick(typeof row.id === 'string' ? row.id : JSON.stringify(row.id))
                  }
                  classes={{ root: row?.id && handleRowAction ? classes.rowAction : '' }}
                >
                  {inputHeadCells.map((cell, i) => (
                    <TableCell
                      key={`${cell?.id}_${i}`}
                      align={cell.numericInt || cell.numericFloat ? 'right' : cell.align || 'left'}
                      style={cellStyle(cell)}
                      className={cellClassName(row, cell)}
                      variant="body"
                    >
                      <Typography>{cellData(row, cell)}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell
                  colSpan={inputHeadCells?.length || 10}
                  style={disablePagination ? { borderColor: 'transparent' } : {}}
                  variant="body"
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!disablePagination && (
        <Typography component="div">
          <TablePagination
            rowsPerPageOptions={inputRowsPerPageOptions}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            classes={{
              root: classes.inheritTypography,
              caption: classes.inheritTypography,
            }}
          />
        </Typography>
      )}
    </Paper>
  );
};

TableWithSortingPagination.defaultProps = {
  inputTitle: undefined,
  inputOrderBy: '',
  inputSortBy: ColumnSort.DESC,
  inputRowsPerPage: 25,
  inputRowsPerPageOptions: [10, 25, 50],
  disablePagination: false,
  tableMinWidth: 750,
  handleAction: undefined,
  handleRowAction: undefined,
};

export default TableWithSortingPagination;
