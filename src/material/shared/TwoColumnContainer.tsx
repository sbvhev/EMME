import { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { ReactComponent as LeftBackground } from 'assets/svg/LeftBackground.svg';

const useStyles = makeStyles(() => ({
  paper: {
    position: 'relative',

    '& svg': {
      height: '100vh',
      width: 'auto',
    },
  },
}));

interface Props {
  columnComponent: ReactNode;
  columnTitle: string;
}

const TwoColumnContainer = ({ columnComponent, columnTitle }: Props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ width: '100%' }}
      wrap="nowrap"
      spacing={2}
    >
      <Grid item xs={false} sm={6}>
        <Box component="span" className={classes.paper} display={{ xs: 'none', sm: 'flex' }}>
          <LeftBackground />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={2}
          style={{ width: '100%' }}
        >
          <Card style={{ maxWidth: '600px', minWidth: '400px' }} elevation={0}>
            <CardHeader title={columnTitle} />
            <CardContent>{columnComponent}</CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TwoColumnContainer;
