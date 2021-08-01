import { ReactElement } from 'react';

import { ResourceRef } from '../types';

export default function LocationLink({ name }: ResourceRef): ReactElement {
  return <>{name}</>;
}
