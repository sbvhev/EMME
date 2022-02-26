import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Chip, Typography } from '@material-ui/core';
// icons

// components
import { SelectCurrency } from 'components';

// store
import { useAppSelector } from 'stores/hooks';

interface Props {
  title?: string;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    boxContent: {
      boxShadow: '0px 18px 24px 10px rgb(15 15 15 / 25%)',
      borderRadius: '16px',
      padding: '49px 40px',
      backgroundColor: theme.palette.background.default,
    },
    mainHeader: {
      display: 'inline-flex',
      alignItems: 'flex-start',
      marginBottom: '48px',
      width: '100%',
    },
    mainTitle: {
      fontSize: '24px',
      lineHeight: '32px',
      margin: '0 0',
    },
    mainSub: {
      fontSize: '14px',
      lineHeight: '24px',
      margin: '0 0 21px',
    },
    chipRoot: {
      borderRadius: '90px',
      padding: '8px 0px',
      fontSize: '14px',
      lineHeight: '16px',
    },
    listItem: {
      padding: '12px 0px',
    },
    listItemText: {
      fontSize: '14px',
      lineHeight: '24px',
      fontWeight: 500,
      margin: 0,
    },
    listItemSubheader: {
      padding: '16px 0 24px',
      textTransform: 'uppercase',
      fontSize: '12px',
      lineHeight: '12px',
      marginBottom: '12px',
    },
    mb24: {
      marginBottom: '24px',
    },
    moreTextDark: {
      fontSize: '14px',
      lineHeight: '24px',
      fontWeight: 500,
      margin: '0',
    },
    action: {
      width: '100%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: '24px',
    },
    btnSave: {
      width: 'auto',
      padding: '16px 24px',
      borderRadius: '90px',
      fontSize: '16px',
      lineHeight: '16px',
      textTransform: 'none',
    },
    headerLeft: {
      marginRight: 'auto',
    },
  })
);

const ProfileInfo: React.FC<Props> = () => {
  const classes = useStyles();
  const { user, balance } = useAppSelector((state) => state.users);

  return (
    <div className={classes.boxContent}>
      <div className={classes.mainHeader}>
        <div className={classes.headerLeft}>
          <Typography variant="h3" className={classes.mainTitle}>
            {(user && user.firstName) || ''} {(user && user.lastName) || ''}
          </Typography>
          <Typography variant="body1" className={classes.mainSub}>
            {(user && user.email) || ''}
          </Typography>
          <Chip
            classes={{
              root: classes.chipRoot,
            }}
            label={`EM.ME Balance: ${balance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            color="secondary"
            variant="outlined"
          />
        </div>

        <SelectCurrency value={1} />
      </div>
    </div>
  );
};

export default ProfileInfo;
