/**
 * @fileoverview フォームテスト
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../src/redux/reducers';

import { IUser } from '../src/models/User';
import withRoot from '../src/hoc/withRoot';
import TestForm from '../src/components/TestForm';
import * as usersSelector from '../src/redux/selectors/users';

import { InjectedProps as AuthInjectedProps } from '../src/hoc/withAuth';
import { InjectedProps as PermissionInjectedProps } from '../src/hoc/withPermission';

// Props
interface Props extends AuthInjectedProps, PermissionInjectedProps {
  users: IUser[];
}

const Page: React.FC<Props> = (props: Props) => {
  const { users } = props;
  console.log(users);
  return (
    <TestForm
      initialUserId={1}
      initialBeginDate={new Date()}
      submit={(value: any) => {
        console.log(JSON.stringify(value));
      }}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  users: usersSelector.getUsers(state)
});

export default connect(mapStateToProps)(
  withRoot({ permissions: ['VIEW'] })(Page)
);
