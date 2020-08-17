import React from 'react';
import Head from 'next/head';
import { TwoNumberSum } from 'components/TwoNumberSum';

export const Home: React.FC = () => (
  <div className="container">
    <Head>
      <title>Two Number Sum</title>
    </Head>

    <main>
      <TwoNumberSum />
    </main>
  </div>
);

export default Home;
