import React from 'react';

import Navbar from 'material/shared/layout/Navbar';
import RoundTopSnippet from 'material/shared/components/RoundTopSnippet';

const HomePage = (props: any) => {
  const { children } = props;

  return (
    <>
      <Navbar {...children} />
      <RoundTopSnippet />
      TEST
    </>
  );
};

export default HomePage;
