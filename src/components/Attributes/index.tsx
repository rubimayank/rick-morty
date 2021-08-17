import { Fragment, ReactElement } from 'react';
import { Tag } from 'antd';

import styles from './styles.module.css';
import { FilterAction } from '../../types';

export default function Attributes({
  tags = {},
  onFilter,
}: {
  tags?: Record<string, string | null | undefined>;
  onFilter?: FilterAction;
}): ReactElement {
  return (
    <div className={styles.tags} data-clickable={!!onFilter || undefined}>
      {Object.entries(tags).map(([key, val]) => (
        <Fragment key={key}>
          {val && (
            <Tag color='blue' onClick={() => onFilter && onFilter(key, val)}>
              {val}
            </Tag>
          )}
        </Fragment>
      ))}
    </div>
  );
}
