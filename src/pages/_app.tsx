import { ReactElement } from 'react';
import 'normalize.css';
import 'antd/dist/antd.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { Layout, Breadcrumb } from 'antd';
import styles from '../styles/App.module.css';

const { Header, Content } = Layout;

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Layout>
      <Header className={styles.header}>
        <Link href='/'>
          <a className={styles.title}>Rick And Morty</a>
        </Link>
      </Header>
      <nav className={styles.nav}>
        <Link href='/'>
          <a>Characters</a>
        </Link>
        <Link href='/locations'>
          <a>Locations</a>
        </Link>
        <Link href='/episodes'>
          <a>Episodes</a>
        </Link>
      </nav>
      <Content className={styles.main}>
        <div className={styles.content}>
          <Component {...pageProps} />
        </div>
      </Content>
    </Layout>
  );
}
export default MyApp;
