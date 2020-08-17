import React from 'react';
import Head from 'next/head';
import { App } from 'components/App';

export const Home = (): JSX.Element => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <App />
    </main>
  </div>
);

export default Home;
