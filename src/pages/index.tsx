import { ReactElement, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import appendQuery, { Query } from 'append-query';
import NextError from 'next/error';

import { charactersApi } from '../config';
import { Page, Character, PageQuery, PaginationInfo } from '../types';
import Error from '../components/Error';
import CharactersGrid from '../components/CharactersGrid';
import Pagination from '../components/Pagination';

export default function Index(): ReactElement {
  const router = useRouter();
  const { query = {} } = router;
  const { page } = query as PageQuery<Character>;
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
          <Pagination count={count} page={Number(page)} onChange={onPageChange} />
          <CharactersGrid characters={results} loading={!data} />
          <Pagination count={count} page={Number(page)} onChange={onPageChange} />
        </>
      )}
    </>
  );
}
