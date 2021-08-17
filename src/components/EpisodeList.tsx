import { ReactElement } from 'react';
import { Typography } from 'antd';
import Link from 'next/link';

import EpisodeLink from './EpisodeLink';

const { Text } = Typography;

export default function EpisideList({
  episodes,
  limit,
  moreHref,
}: {
  episodes: string[];
  limit: number;
  moreHref: string;
}): ReactElement {
  if (!episodes || !episodes.length) {
    return <></>;
  }
  let list = [...episodes];
  list.reverse();
  if (limit) {
    list = list.slice(0, limit);
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
        {!!balance && (
          <Link href={moreHref}>
            <a>+{balance} more</a>
          </Link>
        )}
      </div>
    </>
  );
}
