import { ReactElement } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import NextError from 'next/error';
import { Tag } from 'antd';

import { Episode } from '../../types';
import CharactersGrid from '../../components/CharactersGrid';

import { episodeApi } from '../../config';

export default function CharacterPage(): ReactElement {
  const router = useRouter();
  const { query = {} } = router;
  const { id } = query;
  const { data, error } = useSWR<Episode, Error>(`${episodeApi}/${id as string}`);
  if (error) {
    // *Note -> In real app these error should be tracked
    // eslint-disable-next-line no-console
    console.error(error);
    return <NextError error={error} statusCode={500} />;
  }

  return (
    <>
      <Head>
        <title>Episode: {data?.name}</title>
      </Head>
      <h1>{data?.name}</h1>
      <Tag color='blue'>Episode: {data?.episode}</Tag>
      <Tag color='purple'>Air Date: {data?.air_date}</Tag>
      <h2>Characters</h2>
      <CharactersGrid characterLinks={data?.characters || []} loading={!data} />
    </>
  );
}
