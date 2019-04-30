/**
 * @fileoverview ログインページ
 */
import React from 'react';

import withRoot from '../src/hoc/withRoot';
import { login, InjectedProps as AuthInjectedProps } from '../src/hoc/withAuth';
import authAPI from '../src/api/auth';
import { InjectedProps as PermissionInjectedProps } from '../src/hoc/withPermission';

// Props
interface Props extends AuthInjectedProps, PermissionInjectedProps {}

class Login extends React.Component<Props> {
  handleSubmit = async (event: any) => {
    event.preventDefault();
    const { token } = await authAPI.login('username', 'password');
    login({ token }); // トークンをCookieに設定する
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button type="submit">Login</button>
      </form>
    );
  }
}
export default withRoot({})(Login);
