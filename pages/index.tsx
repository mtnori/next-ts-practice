/**
 * @fileoverview フォームテスト
 */
import * as React from 'react';
import withRoot from '../src/hoc/withRoot';
import TestForm from '../src/components/TestForm';
import UsersActionDispatcher from '../src/redux/dispatchers/UsersActionDispatcher';

import { InjectedProps as AuthInjectedProps } from '../src/hoc/withAuth';
import { InjectedProps as PermissionInjectedProps } from '../src/hoc/withPermission';

// Props
interface Props extends AuthInjectedProps, PermissionInjectedProps {}

class Page extends React.Component<Props> {
  static async getInitialProps({ store }: any) {
    const usersActions = new UsersActionDispatcher(store.dispatch);
    await usersActions.getUsers();
  }

  render() {
    return (
      <TestForm
        initialCompanyId={1}
        initialBeginDate={new Date()}
        submit={value => {
          console.log(JSON.stringify(value));
        }}
      />
    );
  }
}
export default withRoot({ permissions: ['VIEW'] })(Page);
