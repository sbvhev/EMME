/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) =>
  createStyles({
    tabClass: {
      minHeight: 24,
      backgroundColor: 'transparent',
      fontWeight: 700,
      '&:hover:not(.Mui-selected)': {
        backgroundColor: theme.palette.neutralsSix.main,
        color: theme.palette.neutralsTwo.main,
      },
      '&.Mui-selected': {
        backgroundColor: theme.palette.neutralsThree.main,
      },
    },
  })
);

export interface TabsProps {
  label: string;
  isDisabled?: boolean;
}

interface TabsContainerProps {
  tabs: TabsProps[];
  onChange: (value: number) => void;
  variant?: 'fullWidth' | 'scrollable' | 'standard';
  selected?: number;
}

const TabsContainer = ({ tabs, onChange, variant, selected }: TabsContainerProps) => {
  const classes = useStyles();

  const [value, setValue] = useState<number>(selected || 0);

  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Paper square style={{ paddingBottom: 16, paddingTop: 16 }} elevation={0}>
      <Tabs value={value} indicatorColor="primary" onChange={handleChange} variant={variant}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            disabled={tab.isDisabled || false}
            className={classes.tabClass}
          />
        ))}
      </Tabs>
    </Paper>
  );
};

TabsContainer.defaultProps = {
  variant: 'fullWidth',
  selected: 0,
};

export default TabsContainer;
