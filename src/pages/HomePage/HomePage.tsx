import React, { lazy, ReactNode, Suspense, useState } from 'react';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import RoundTopSnippet from 'material/components/RoundTopSnippet';
import TabsContainer, { TabsProps } from 'material/shared/components/TabsContainer';
import PlaceOrder from 'material/components/PlaceOrder';
import MainLayout from 'material/shared/layout/MainLayout';

import { ReactComponent as ComingSoon } from 'assets/svg/ComingSoon.svg';

const useStyles = makeStyles((theme) =>
  createStyles({
    gridItem: {
      maxWidth: 450,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        maxWidth: '100%',
      },
      minHeight: 560,
    },
    gridContainer: {
      height: '100%',
    },
    gridPaper: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      height: '100%',
    },
    hiddenRightDiv: {
      position: 'absolute',
      backgroundColor: theme.palette.primary.main,
      height: 500,
      minWidth: '14px',
      right: '-10px',
      borderRadius: 15,
      paddingRight: 5,
    },
    hiddenLeftDiv: {
      position: 'absolute',
      backgroundColor: theme.palette.primary.main,
      height: 500,
      minWidth: '14px',
      left: '-10px',
      borderRadius: 15,
      paddingLeft: 5,
    },
  })
);

const LiquidityMarkets = lazy(() => import('material/components/LiquidityMarkets'));
const OrderBook = lazy(() => import('material/components/OrderBook'));
const OpenOrders = lazy(() => import('material/components/OpenOrders'));
const ClosedOrders = lazy(() => import('material/components/ClosedOrders'));

interface MiddleGridItemProps {
  children: ReactNode;
  slideSide?: 'right' | 'left';
  onChange?: (isHidden: boolean) => void;
  isHidden?: boolean;
  phoneWidth: boolean;
}

const MiddleGridItem = ({
  children,
  isHidden,
  slideSide,
  onChange,
  phoneWidth,
}: MiddleGridItemProps) => {
  const classes = useStyles();

  const handleSlideEntered = (node: HTMLElement) => {
    if (!node) return;
    node.style.display = 'none';
    setTimeout(() => {
      node.style.display = 'inherit';
    }, 500);
  };

  return (
    <>
      {slideSide && (
        <Slide
          direction={slideSide}
          in={isHidden}
          mountOnEnter
          unmountOnExit
          onEntering={handleSlideEntered}
          timeout={{ enter: 500, exit: 0 }}
          appear
        >
          <Button
            onClick={() => {
              onChange && onChange(true);
            }}
            className={slideSide === 'right' ? classes.hiddenLeftDiv : classes.hiddenRightDiv}
            type="button"
          >
            {slideSide === 'left' ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
          </Button>
        </Slide>
      )}
      <Slide
        direction={slideSide}
        in={!isHidden}
        mountOnEnter
        unmountOnExit
        timeout={!slideSide ? 0 : 500}
      >
        <Container disableGutters className={classes.gridContainer}>
          <Paper square className={classes.gridPaper}>
            <Grid
              container
              direction="row"
              justifyContent={phoneWidth ? 'center' : 'space-between'}
              alignItems="stretch"
              wrap="nowrap"
              style={{ height: '100%' }}
            >
              {slideSide === 'left' && (
                <Grid item xs style={{ alignSelf: 'center' }}>
                  <Button
                    type="button"
                    onClick={() => {
                      onChange && onChange(false);
                    }}
                    disableRipple
                    size="small"
                  >
                    {isHidden ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
                  </Button>
                </Grid>
              )}
              <Grid item xs>
                {children}
              </Grid>
              {slideSide === 'right' && (
                <Grid item xs style={{ alignSelf: 'center' }}>
                  <Button
                    type="button"
                    onClick={() => {
                      onChange && onChange(false);
                    }}
                    disableRipple
                    size="small"
                  >
                    {isHidden ? <NavigateNextIcon /> : <NavigateBeforeIcon />}
                  </Button>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Container>
      </Slide>
    </>
  );
};

MiddleGridItem.defaultProps = {
  slideSide: undefined,
  onChange: undefined,
  isHidden: false,
};

const liquidityMarketTabs: TabsProps[] = [
  { label: 'All markets' },
  { label: 'Others', isDisabled: true },
];

const orderTabs: TabsProps[] = [
  { label: 'Order Book' },
  { label: 'Open Orders' },
  { label: 'Closed Orders' },
];
const HomePage = () => {
  const classes = useStyles();
  const theme = useTheme();

  const tabletWidth = useMediaQuery(theme.breakpoints.only('md'));
  const phoneWidth = useMediaQuery(theme.breakpoints.down('sm'));

  const [valueMarket, setValueMarket] = useState<number>(0);
  const [valueOrders, setValueOrders] = useState<number>(1);
  const [hiddenSlide, setHiddenSlide] = useState<'left' | 'right'>('left');

  return (
    <MainLayout hideFooter>
      <RoundTopSnippet />
      <Grid
        container
        direction={phoneWidth ? 'column' : 'row'}
        justifyContent="space-between"
        alignItems={phoneWidth ? 'center' : 'stretch'}
        wrap="nowrap"
        style={{ paddingBottom: 33 }}
        spacing={2}
      >
        <Grid item xs className={classes.gridItem}>
          <MiddleGridItem
            slideSide={tabletWidth ? 'right' : undefined}
            isHidden={tabletWidth ? hiddenSlide === 'right' : false}
            onChange={(isHidden: boolean) => {
              setHiddenSlide(isHidden ? 'left' : 'right');
            }}
            phoneWidth
          >
            <TabsContainer
              tabs={liquidityMarketTabs}
              onChange={(data) => setValueMarket(data)}
              variant="standard"
              selected={valueMarket}
            />
            {valueMarket === 0 && (
              <Suspense fallback={<div>Loading...</div>}>
                <LiquidityMarkets />
              </Suspense>
            )}
            {valueMarket === 1 && (
              <Container>
                <div style={{ width: '100%', height: 270 }}>test</div>
              </Container>
            )}
          </MiddleGridItem>
        </Grid>
        <Grid item xs={!phoneWidth ? 6 : false} style={{ minWidth: 450 }}>
          <MiddleGridItem phoneWidth>
            <ComingSoon width="100%" height="100%" fill="currentColor" />
          </MiddleGridItem>
        </Grid>
        <Grid item xs className={classes.gridItem}>
          <MiddleGridItem
            slideSide={tabletWidth ? 'left' : undefined}
            isHidden={tabletWidth ? hiddenSlide === 'left' : false}
            onChange={(isHidden) => {
              setHiddenSlide(isHidden ? 'right' : 'left');
            }}
            phoneWidth
          >
            <PlaceOrder />
          </MiddleGridItem>
        </Grid>
      </Grid>
      <TabsContainer
        tabs={orderTabs}
        onChange={(data) => setValueOrders(data)}
        variant="scrollable"
        selected={valueOrders}
      />
      {valueOrders === 0 && (
        <Suspense fallback={<div>Loading...</div>}>
          <OrderBook />
        </Suspense>
      )}
      {valueOrders === 1 && (
        <Suspense fallback={<div>Loading...</div>}>
          <OpenOrders />
        </Suspense>
      )}
      {valueOrders === 2 && (
        <Suspense fallback={<div>Loading...</div>}>
          <ClosedOrders />
        </Suspense>
      )}
    </MainLayout>
  );
};

export default HomePage;
