import React from "react";
import { Layout } from "layouts";

interface Props {
  title?: string;
}

const HomePage: React.FC<Props> = ({ title }) => {
  return (
    <Layout>
      <h1 style={{ color: "#fff" }}>HomePage</h1>
    </Layout>
  );
};

export default HomePage;
