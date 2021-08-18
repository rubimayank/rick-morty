import { ReactElement, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import appendQuery, { Query } from 'append-query';
import Link from 'next/link';
import NextError from 'next/error';
import { Table } from 'antd';

import { episodeApi } from '../../config';
import { Page, Episode, PageQuery, PaginationInfo, CharacterQuery } from '../../types';
import Error from '../../components/Error';
import Pagination from '../../components/Pagination';

import styles from '../../styles/page.module.css';

const columns = [
  {
    dataIndex: 'name',
    title: 'Name',
    render: (name: string, { id }: Episode) => (
      <Link href={`/episodes/${id}`}>
        <a>{name}</a>
      </Link>
    ),
  },
  {
    dataIndex: 'air_date',
    title: 'Air Date',
  },
  {
    dataIndex: 'episode',
    title: 'Episode',
  },
];

export default function Index(): ReactElement {
  const router = useRouter();
  const { query = {} } = router;
  const { page = '1' } = query as PageQuery<CharacterQuery>;
  const { data, error } = useSWR<Page<Episode>, Error>(appendQuery(episodeApi, query as Query));
  if (error) {
    // *Note -> In real app these error should be tracked
    // eslint-disable-next-line no-console
    console.error(error);
    return <NextError error={error} statusCode={500} />;
  }
  const { error: pageError, results = [], info = {} } = data || {};
  const { count = results.length } = info as PaginationInfo;
  const onPageChange = useCallback(
    (newPage: number) => {
      const url = appendQuery('/episodes', { ...query, page: newPage.toString() });
      router.push(url, url, {
        shallow: true,
      });
    },
    [query, router],
  );

  return (
    <>
      <Head>
        <title>Rick and Morty Episodes</title>
      </Head>
      <h1>Episodes</h1>
      {pageError ? (
        <Error message={pageError} />
      ) : (
        <>
          <div className={styles.toolbar}>
            <div />
            <Pagination count={count} page={Number(page)} onChange={onPageChange} name='Episodes' />
          </div>
          <Table dataSource={results} columns={columns} pagination={false} loading={!data} />
          <div className={styles.toolbar}>
            <div />
            <Pagination count={count} page={Number(page)} onChange={onPageChange} name='Episodes' />
          </div>
        </>
      )}
    </>
  );
}
