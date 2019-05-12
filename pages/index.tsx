/**
 * @fileoverview フォームテスト
 */
import React from 'react';

import { Action, Dispatch } from 'redux';
import { NextFC } from 'next';
import { connect } from 'react-redux';
import { RootState } from '../src/redux/reducers';

import { IUser } from '../src/models/User';
import withRoot from '../src/hoc/withRoot';
import TestForm from '../src/components/TestForm';
import * as usersSelector from '../src/redux/selectors/users';
import * as actions from '../src/redux/actions/users';

import { InjectedProps as AuthInjectedProps } from '../src/hoc/withAuth';
import { InjectedProps as PermissionInjectedProps } from '../src/hoc/withPermission';

// Props
interface Props extends AuthInjectedProps, PermissionInjectedProps {
  users: IUser[];
  getUsers: () => Action<any>;
}

const Page: NextFC<Props> = (props: Props) => {
  const { users, getUsers } = props;
  console.log('index render');
  console.log(users);
  return (
    <TestForm
      initialUserId={1}
      initialBeginDate={new Date()}
      submit={(value: any) => {
        console.log(JSON.stringify(value));
      }}
      getUsers={getUsers}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  users: usersSelector.getUsers(state)
});

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
  getUsers: () => dispatch(actions.fetch())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot({ permissions: ['VIEW'] })(Page));
