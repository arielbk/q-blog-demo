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

      <h1 className="text-4xl my-16 container">
        <Link href="/">
          <a>Q Blog Demo</a>
        </Link>
      </h1>

      {children}

      <footer className="container border-t py-8 text-center">
        ✨ Q Blog Demo ✨
      </footer>
    </>
  );
};

export default Layout;
