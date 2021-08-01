import { ReactElement } from 'react';
import { Tag } from 'antd';

import styles from './styles.module.css';

export default function CharacterCard({
  tags = [],
  children,
}: {
  tags?: Array<string | null | undefined>;
  children?: React.ReactNode;
}): ReactElement {
  return (
    <div className={styles.tags}>
      {children ? (
        { children }
      ) : (
        <>
          {tags.filter(Boolean).map((tag) => (
            <Tag color='blue' key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )}
    </div>
  );
}
