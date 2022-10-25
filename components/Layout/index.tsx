import Head from 'next/head';
import Link from 'next/link';
import useComponentLogger from '../../hooks/useComponentLogger';

interface Props {
  children: React.ReactElement;
}

const Layout: React.FC<Props> = ({ children }) => {
  useComponentLogger('Layout');
  return (
    <>
      <Head>
        <title>Q Blog Demo</title>
        <meta
          name="description"
          content="Fetching data and displaying it on a NextJS site"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="container flex justify-between items-end my-16">
        <Link href="/">
          <a className="">
            <h1 className="text-5xl font-extralight">Q Blog Demo</h1>
          </a>
        </Link>
        <nav className="underline flex gap-4">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/posts">
            <a>Posts</a>
          </Link>
        </nav>
      </header>

      {children}

      <footer className="container border-t py-8 text-center font-light italic">
        Q Blog Demo
      </footer>
    </>
  );
};

export default Layout;
