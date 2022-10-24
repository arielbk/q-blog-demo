import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Q Blog Demo</title>
        <meta
          name="description"
          content="Fetching data and displaying it on a NextJS site"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <h1 className="text-4xl my-16">Q Blog Demo</h1>
      </main>

      <footer className="container border-t py-8 text-center">
        ✨ Q Blog Demo
      </footer>
    </div>
  );
};

export default Home;
