import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      position: 'relative',
    },
    activeWrapper: {
      pointerEvents: 'none',
    },
    loaderWrapper: {
      position: 'absolute',
      top: '50vh',
      right: 0,
      bottom: '50vh',
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);
interface Props {
  isLoading: boolean;
  children: React.ReactNode;
  size?: number | string;
  color?: 'primary' | 'secondary' | 'inherit';
  backgroundColor?: string;
  zIndex?: number | 'auto';
}

export function LoadingOverlay({
  children,
  isLoading,
  size,
  color,
  backgroundColor,
  zIndex,
}: Props) {
  const classes = useStyles();

  return (
    <div className={`${classes.wrapper} ${isLoading ? classes.activeWrapper : ''}`}>
      {children}
      {isLoading && (
        <div className={classes.loaderWrapper} style={{ backgroundColor, zIndex }}>
          <CircularProgress color={color} size={size} />
        </div>
      )}
    </div>
  );
}

LoadingOverlay.defaultProps = {
  size: 24,
  color: 'primary',
  backgroundColor: 'transparent',
  zIndex: 'auto',
};
