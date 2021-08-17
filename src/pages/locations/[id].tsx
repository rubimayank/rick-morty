import { ReactElement } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import NextError from 'next/error';
import { Tag } from 'antd';

import { Location } from '../../types';
import CharactersGrid from '../../components/CharactersGrid';

import { locationApi } from '../../config';

export default function CharacterPage(): ReactElement {
  const router = useRouter();
  const { query = {} } = router;
  const { id } = query;
  const { data, error } = useSWR<Location, Error>(`${locationApi}/${id as string}`);
  if (error) {
    // *Note -> In real app these error should be tracked
    // eslint-disable-next-line no-console
    console.error(error);
    return <NextError error={error} statusCode={500} />;
  }

  return (
    <>
      <Head>
        <title>Location: {data?.name}</title>
      </Head>
      <h1>{data?.name}</h1>
      <Tag color='blue'>Type: {data?.type}</Tag>
      <Tag color='purple'>Dimension: {data?.dimension}</Tag>
      <h2>Residents</h2>
      <CharactersGrid characterLinks={data?.residents || []} loading={!data} />
    </>
  );
}
