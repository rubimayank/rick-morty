import { ReactElement } from 'react';
import useSWR from 'swr';
import NextError from 'next/error';
import { Character } from '../types';
import CharacterCard from './CharacterCard';

export default function CharacterProfile({
  url,
  asProfile = false,
}: {
  url: string;
  asProfile?: boolean;
}): ReactElement {
  const { data, error } = useSWR<Character, Error>(url);
  if (error) {
    // *Note -> In real app these error should be tracked
    // eslint-disable-next-line no-console
    console.error(error);
    return <NextError error={error} statusCode={500} />;
  }

  return <CharacterCard {...data} loading={!data} asProfile={asProfile} />;
}
