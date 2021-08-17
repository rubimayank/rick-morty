import { ReactElement } from 'react';
import { Tag } from 'antd';
import useSWR from 'swr';
import Link from 'next/link';

import { Episode } from '../types';

export default function EpisodeLink({ episode }: { episode: string }): ReactElement {
  const { data } = useSWR<Episode, Error>(episode, {
    dedupingInterval: 60000, // dont reftech for a minute
  });
  if (data && data.name) {
    return (
      <Tag color='green'>
        <Link href={`/episodes/${data.id}`}>
          <a>{data.name}</a>
        </Link>
      </Tag>
    );
  }
  return <></>;
}
