/**
 * @fileoverview フォームテスト
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { UserRecord } from '../src/redux/models/User';

import withRoot from '../src/hoc/withRoot';
import TestForm from '../src/components/TestForm';
import UsersActionDispatcher from '../src/redux/dispatchers/UsersActionDispatcher';
import usersSelector from '../src/redux/selectors/users';

import { InjectedProps as AuthInjectedProps } from '../src/hoc/withAuth';
import { InjectedProps as PermissionInjectedProps } from '../src/hoc/withPermission';
import { StateMap } from '../src/redux/State';

// Props
interface Props extends AuthInjectedProps, PermissionInjectedProps {
  users: List<UserRecord>;
}

class Page extends React.Component<Props> {
  static async getInitialProps({ store }: any) {
    const usersActions = new UsersActionDispatcher(store.dispatch);
    await usersActions.getUsers();
  }

  render() {
    const { users } = this.props;
    console.log(users);
    return (
      <>
        <TestForm
          initialCompanyId={1}
          initialBeginDate={new Date()}
          submit={value => {
            console.log(JSON.stringify(value));
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state: StateMap) => ({
  users: usersSelector.getUsersResult(state)
});

export default connect(mapStateToProps)(
  withRoot({ permissions: ['VIEW'] })(Page)
);
