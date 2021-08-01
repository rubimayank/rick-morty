import { ReactElement } from 'react';
import { Tag, Typography } from 'antd';
import useSWR from 'swr';

import { Episode } from '../types';

const { Text } = Typography;

export function EpisodeLink({ episode }: { episode: string }): ReactElement {
  const { data } = useSWR<Episode, Error>(episode, {
    dedupingInterval: 60000, // dont reftech for a minute
  });
  if (data && data.name) {
    return <Tag color='green'>{data.name}</Tag>;
  }
  return <></>;
}

export default function EpisideList({
  episodes,
  length,
}: {
  episodes: string[];
  length: number;
}): ReactElement {
  if (!episodes || !episodes.length) {
    return <></>;
  }
  let list = [...episodes];
  list.reverse();
  if (length) {
    list = list.slice(0, length);
  }
  const balance = episodes.length - list.length;
  return (
    <>
      <Text type='secondary'>Episodes: </Text>
      <br />
      <div>
        {list.map((episode) => (
          <EpisodeLink episode={episode} key={episode} />
        ))}
        {!!balance && <span>+{balance} more</span>}
      </div>
    </>
  );
}
