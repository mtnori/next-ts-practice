/**
 * @fileoverview ログインページ
 */
import React from 'react';

import withAppBar from '../src/hoc/withAppBar';
import { login } from '../src/hoc/withAuth';
import authAPI from '../src/api/auth';

class Login extends React.Component<{}> {
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
export default withAppBar(Login);
