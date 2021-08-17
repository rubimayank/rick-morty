import { ReactElement } from 'react';
import { Badge, Button } from 'antd';

import { Character, CharacterStatus, FilterAction } from '../../types';
import styles from './styles.module.css';
import capitalize from '../../helpers/capitalize';

const badges = {
  [CharacterStatus.Alive]: 'success',
  [CharacterStatus.Dead]: 'error',
  [CharacterStatus.Unknown]: 'default',
} as const;

export default function CharacterCard({
  status,
  onFilter,
}: {
  status: Character['status'];
  onFilter?: FilterAction;
}): ReactElement {
  const { [status]: badgeStatus = 'default' } = badges;

  return (
    <span className={styles.badge}>
      <Badge status={badgeStatus} />
      {onFilter ? (
        <Button type='link' size='small' onClick={() => onFilter('status', status)}>
          {capitalize(status)}
        </Button>
      ) : (
        <span>{capitalize(status)}</span>
      )}
    </span>
  );
}
