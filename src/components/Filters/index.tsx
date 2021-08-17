import { Fragment, ReactElement } from 'react';
import { Tag } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Query } from 'append-query';

import { FilterAction } from '../../types';
import capitalize from '../../helpers/capitalize';

import styles from './styles.module.css';

export default function Filters({
  query = {},
  onFilter,
}: {
  query: Query;
  onFilter: FilterAction;
}): ReactElement {
  // ignore page
  const { page, ...filters } = query;
  return (
    <div className={styles.filters}>
      {Object.entries(filters).map(([key, val]) => (
        <Fragment key={key}>
          {val && (
            <Tag closable color='default' onClose={() => onFilter(key)}>
              {capitalize(key)}
              <RightOutlined />
              {capitalize(val)}
            </Tag>
          )}
        </Fragment>
      ))}
    </div>
  );
}
