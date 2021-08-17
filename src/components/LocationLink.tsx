import { ReactElement } from 'react';
import { TeamOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import Link from 'next/link';

import { ResourceRef, Location } from '../types';

export default function LocationLink({ name, url }: ResourceRef): ReactElement {
  const { data = {} } = useSWR<Location, Error>(url, {
    dedupingInterval: 60000, // dont reftech for a minute
  });
  const { id, residents } = data as Location;
  let residentCount = null;
  if (residents && Array.isArray(residents)) {
    residentCount = (
      <>
        {' '}
        <TeamOutlined /> {residents.length}
      </>
    );
  }
  return (
    <Link href={`/locations/${id}`}>
      <a>
        {name}
        {residentCount}
      </a>
    </Link>
  );
}
