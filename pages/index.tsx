import type { NextPage } from 'next';
import Link from 'next/link';
import useComponentLogger from '../hooks/useComponentLogger';

const Home: NextPage = () => {
  useComponentLogger('home page');
  return (
    <>
      <header className="container">
        <h2 className="text-3xl">Home</h2>
      </header>
      <main className="container my-16">
        <Link href="/posts">
          <a className="underline">All posts</a>
        </Link>
      </main>
    </>
  );
};

export default Home;
