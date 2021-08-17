import { ReactElement, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import appendQuery, { Query } from 'append-query';
import NextError from 'next/error';

import { charactersApi } from '../config';
import { Page, Character, PageQuery, PaginationInfo, FilterAction, CharacterQuery } from '../types';
import Error from '../components/Error';
import CharactersGrid from '../components/CharactersGrid';
import Pagination from '../components/Pagination';
import Filters from '../components/Filters';
import Search from '../components/Search';

import styles from '../styles/page.module.css';

export default function Index(): ReactElement {
  const router = useRouter();
  const { query = {} } = router;
  const { page = '1', name: searchTerm = '' } = query as PageQuery<CharacterQuery>;
  const { data, error } = useSWR<Page<Character>, Error>(
    appendQuery(charactersApi, query as Query),
  );
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
      const url = appendQuery('/', { ...query, page: newPage.toString() });
      router.push(url, url, {
        shallow: true,
      });
    },
    [query, router],
  );

  const onFilter = useCallback(
    (key: string, value?: string) => {
      // ignore the existing value of filter key
      // if value is undefined this acts as removal
      const { [key]: ignore, ...newQuery } = query;
      if (value) {
        newQuery[key] = value;
      }
      // reset the page to first on every filter
      newQuery.page = '1';
      const url = appendQuery('/', newQuery as Query);
      router.push(url, url, {
        shallow: true,
      });
    },
    [query, router],
  );
  return (
    <>
      <Head>
        <title>Rick and Morty Characters</title>
      </Head>
      <h1>Characters</h1>
      {pageError ? (
        <Error message={pageError} />
      ) : (
        <>
          <div className={styles.toolbar}>
            <div />
            <Search defaultValue={searchTerm} onFilter={onFilter as FilterAction} />
          </div>
          <div className={styles.toolbar}>
            <Filters query={query as Query} onFilter={onFilter} />
            <Pagination count={count} page={Number(page)} onChange={onPageChange} />
          </div>
          <CharactersGrid characters={results} loading={!data} onFilter={onFilter} />
          <div className={styles.toolbar}>
            <div />
            <Pagination count={count} page={Number(page)} onChange={onPageChange} />
          </div>
        </>
      )}
    </>
  );
}
