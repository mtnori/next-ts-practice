/**
 * @fileoverview Auth API
 */
import fetcher from './fetcher';
import { formatUrl } from './apiUtils';

interface Token {
  token: string;
}

interface Auth {
  name: string;
  permissions: string[];
}

/**
 * ログイン処理
 * @param {string} loginId
 * @param {string} password
 * @return {Promise<Token>} ログイントークン
 */
async function login(loginId: string, password: string): Promise<Token> {
  try {
    const response = await fetcher<Token>(formatUrl('/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ loginId, password })
    });
    return response;
  } catch (error) {
    throw error;
  }
}

/**
 * ログイントークンから、プロフィールと認可情報を取得する
 * @param {string} ログイントークン
 * @return {Promise<Auth>} 認可情報
 */
async function load(token: string): Promise<Auth> {
  try {
    const response = await fetcher<Auth>(formatUrl('/loadAuth'), {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.stringify({ token })
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export { login, load };
