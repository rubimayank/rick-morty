import { ReactElement } from 'react';
import { Pagination as AntPagination } from 'antd';

import { pageLength } from '../../config';

import styles from './styles.module.css';

export default function Pagination({
  count = 0,
  page = 1,
  name = 'Characters',
  onChange,
}: {
  count?: number;
  page?: number;
  name?: string;
  onChange: (next: number) => void;
}): ReactElement {
  return (
    <div className={styles.wrapper}>
      {!!count && (
        <AntPagination
          className={styles.pagination}
          current={page}
          pageSize={pageLength}
          showLessItems
          showSizeChanger={false}
          total={count}
          defaultPageSize={pageLength}
          onChange={onChange}
          showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total} ${name}`}
        />
      )}
    </div>
  );
}
