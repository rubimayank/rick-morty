import { ReactElement } from 'react';
import { Alert } from 'antd';

import { Character } from '../../types';
import CharacterCard from '../CharacterCard';

import styles from './styles.module.css';

export default function CharactersGrid({
  characters,
  loading,
}: {
  characters?: Character[];
  loading: boolean;
}): ReactElement {
  if (loading) {
    return (
      <div className={styles.grid}>
        <CharacterCard loading />
        <CharacterCard loading />
        <CharacterCard loading />
        <CharacterCard loading />
        <CharacterCard loading />
        <CharacterCard loading />
      </div>
    );
  }
  return (
    <>
      {characters && characters.length ? (
        <div className={styles.grid}>
          {characters.map((character) => (
            <CharacterCard key={character.url} {...character} />
          ))}
        </div>
      ) : (
        <Alert message='Error' description='No Characters' type='warning' showIcon />
      )}
    </>
  );
}
