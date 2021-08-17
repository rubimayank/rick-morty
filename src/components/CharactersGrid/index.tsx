import { ReactElement } from 'react';
import { Alert } from 'antd';

import { Character, FilterAction } from '../../types';
import CharacterCard from '../CharacterCard';
import CharacterProfile from '../CharacterProfile';

import styles from './styles.module.css';

export default function CharactersGrid({
  characters,
  characterLinks,
  loading,
  onFilter,
}: {
  characters?: Character[];
  characterLinks?: string[];
  loading: boolean;
  onFilter?: FilterAction;
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
  if (characterLinks && Array.isArray(characterLinks)) {
    if (characterLinks.length) {
      return (
        <div className={styles.grid}>
          {characterLinks.map((link) => (
            <CharacterProfile url={link} key={link} />
          ))}
        </div>
      );
    }
    return <Alert message='Error' description='No Characters' type='warning' showIcon />;
  }
  return (
    <>
      {characters && characters.length ? (
        <div className={styles.grid}>
          {characters.map((character) => (
            <CharacterCard key={character.url} {...character} onFilter={onFilter} />
          ))}
        </div>
      ) : (
        <Alert message='Error' description='No Characters' type='warning' showIcon />
      )}
    </>
  );
}
