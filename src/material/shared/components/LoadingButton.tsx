import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const loadingButtonStyle = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      position: 'relative',
    },
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

interface Props {
  isLoading: boolean;
  isDisabled?: boolean;
  text: string;
  size?: 'large' | 'medium' | 'small';
}

const LoadingButton = ({ isLoading, text, isDisabled, size }: Props) => {
  const classes = loadingButtonStyle();

  return (
    <div className={classes.wrapper} style={{ width: '100%' }}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading || isDisabled}
        fullWidth
        size={size}
      >
        {text}
      </Button>
      {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  );
};

LoadingButton.defaultProps = {
  isDisabled: false,
  size: 'large',
};

export default LoadingButton;
