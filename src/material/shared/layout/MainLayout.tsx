import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Navbar from './Navbar';
import Footer from './Footer';

interface MainLayoutProps {
  children: any;
  hideFooter?: boolean;
  disableMaxWidth?: boolean;
}

const MainLayout = ({ children, hideFooter, disableMaxWidth }: MainLayoutProps) => (
  <Container maxWidth={disableMaxWidth ? false : 'xl'}>
    <Grid
      container
      direction="row"
      justifyContent="center"
      style={{ minWidth: '100%', minHeight: '100vh' }}
      wrap="nowrap"
      alignItems="stretch"
      spacing={4}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        style={{ minHeight: '100%' }}
      >
        <Navbar {...children} />
        {children}
        <div style={{ flexGrow: 1 }} />
        {!hideFooter && <Footer />}
      </Grid>
    </Grid>
  </Container>
);

MainLayout.defaultProps = {
  hideFooter: false,
  disableMaxWidth: false,
};

export default MainLayout;
