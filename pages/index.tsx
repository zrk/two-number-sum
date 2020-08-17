import React from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";

const TwoNumberSum = dynamic(() => import("components/TwoNumberSum"), {
  ssr: false,
});

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
