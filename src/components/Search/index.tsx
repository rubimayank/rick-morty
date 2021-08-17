import { ChangeEventHandler, ReactElement, useCallback, useEffect, useState } from 'react';
import { Input } from 'antd';
import styles from './styles.module.css';

import { FilterAction } from '../../types';

const { Search } = Input;

export default function SearchBox({
  defaultValue = '',
  searchKey = 'name',
  onFilter,
}: {
  onFilter: FilterAction;
  searchKey?: string;
  defaultValue: string;
}): ReactElement {
  const [term, setTerm] = useState<string>(defaultValue);
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setTerm(e?.target?.value),
    [],
  );
  useEffect(() => setTerm(defaultValue), [defaultValue]);
  return (
    <Search
      value={term}
      onChange={onChange}
      className={styles.box}
      defaultValue={defaultValue}
      placeholder='Search Characters'
      onSearch={(value) => onFilter(searchKey, value)}
      enterButton
    />
  );
}
