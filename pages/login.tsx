/**
 * @fileoverview ログインページ
 */
import React from 'react';
import getConfig from 'next/config';

import withAppBar from '../src/hoc/withAppBar';
import { login } from '../src/hoc/withAuth';
import * as authAPI from '../src/api/auth';

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

class Login extends React.Component<{}> {
  handleSubmit = async (event: any) => {
    event.preventDefault();
    const { token } = await authAPI.login('username', 'password');
    login({ token }); // トークンをCookieに設定する
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>{`The API_URL is ${API_URL}`}</div>
        <button type="submit">Login</button>
      </form>
    );
  }
}
export default withAppBar(Login);
