import { ReactElement } from 'react';
import { Badge } from 'antd';

import { Character, CharacterStatus } from '../../types';
import styles from './styles.module.css';

export default function CharacterCard({ status }: { status: Character['status'] }): ReactElement {
  if (status === CharacterStatus.Alive) {
    return <Badge className={styles.badge} status='success' text={<b>Alive</b>} />;
  }
  if (status === CharacterStatus.Dead) {
    return <Badge className={styles.badge} status='error' text={<b>Dead</b>} />;
  }

  return <Badge className={styles.badge} status='default' text={<b>Unknown</b>} />;
}
