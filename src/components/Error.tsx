import { ReactElement } from 'react';
import { Alert } from 'antd';

export default function Error({ message }: { message: string }): ReactElement {
  return <Alert message='Error' description={message} type='error' showIcon />;
}
