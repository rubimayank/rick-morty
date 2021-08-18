import { Fragment, ReactElement } from 'react';
import { Tag } from 'antd';

import styles from './styles.module.css';
import { FilterAction } from '../../types';

/**
 * Attributes component props
 */
export interface AttributeProps {
  /**
   * an object of attributes with attribute's id as key and attributes's value as value
   */
  tags?: Record<string, string | null | undefined>;
  /**
   * onclick callback for applying filters when used in list cards
   */
  onFilter?: FilterAction;
}

export default function Attributes({ tags = {}, onFilter }: AttributeProps): ReactElement {
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
