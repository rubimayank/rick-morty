import { ReactElement } from 'react';
import 'normalize.css';
import 'antd/dist/antd.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from 'antd';
import styles from '../styles/App.module.css';

const { Header, Content } = Layout;

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Layout>
      <Header className={styles.header}>
        <span className={styles.title}>Rick And Morty</span>
      </Header>
      <Content className={styles.main}>
        <div className={styles.content}>
          <Component {...pageProps} />
        </div>
      </Content>
    </Layout>
  );
}
export default MyApp;
