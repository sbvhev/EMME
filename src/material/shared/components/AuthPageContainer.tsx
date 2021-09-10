import { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { ReactComponent as LeftBackground } from 'assets/svg/LeftBackground.svg';

const useStyles = makeStyles((theme) => ({
  leftColumn: {
    position: 'relative',

    '& svg': {
      height: '100vh',
      width: 'auto',
      maxWidth: '650px',
    },
  },
  rightColumn: {
    [theme.breakpoints.down('md')]: {
      direction: 'row',
      justifyContent: 'center',
    },
    [theme.breakpoints.up('md')]: {
      direction: 'column',
      justifyContent: 'flex-start',
    },
  },
}));

interface Props {
  columnComponent: ReactNode;
  columnTitle: string;
}

const AuthPageContainer = ({ columnComponent, columnTitle }: Props) => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justifyContent="center"
        style={{ width: '100%' }}
        wrap="nowrap"
        alignItems="center"
      >
        <Grid item lg>
          <Box component="span" display={{ xs: 'none', md: 'flex' }} className={classes.leftColumn}>
            <LeftBackground />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7}>
          <Grid
            container
            alignItems="stretch"
            className={classes.rightColumn}
            spacing={2}
            style={{ width: '100%' }}
          >
            <Card style={{ maxWidth: '600px', width: '100%' }} elevation={0}>
              <CardHeader title={columnTitle} />
              <CardContent>{columnComponent}</CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthPageContainer;
