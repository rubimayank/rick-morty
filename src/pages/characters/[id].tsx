import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import CharacterProfile from '../../components/CharacterProfile';

import { charactersApi } from '../../config';

export default function CharacterPage(): ReactElement {
  const router = useRouter();
  const { query = {} } = router;
  const { id } = query;

  return <CharacterProfile url={`${charactersApi}/${id as string}`} asProfile />;
}
