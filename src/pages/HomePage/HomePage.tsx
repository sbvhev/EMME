/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Navbar from 'material/shared/layout/Navbar';

const HomePage = (props: any) => (
  <>
    <Navbar {...props.children} />
    TEST
  </>
);

export default HomePage;
