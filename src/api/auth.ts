/**
 * @fileoverview Auth API
 */
import fetch from 'isomorphic-unfetch';
import ApiUtils from './apiUtils';
import dateParser from '../utils/dateParser';

/**
 * ログイン処理
 * @param {string} loginId
 * @param {string} password
 * @return {Promise<{ token: string }>} ログイントークン
 */
async function login(
  loginId: string,
  password: string
): Promise<{ token: string }> {
  const response = await fetch(ApiUtils.formatUrl('/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ loginId, password })
  });
  if (response.ok) {
    const text = await response.text();
    const data = await JSON.parse(text, dateParser);
    return data;
  }
  const error = new Error(response.statusText);
  throw error;
}

/**
 * ログイントークンから、プロフィールと認可情報を取得する
 * @param {string} ログイントークン
 * @return {Promise<{ name: string, permissions: string[]}>} 認可情報
 */
async function load(
  token: string
): Promise<{
  name: string;
  permissions: string[];
}> {
  const response = await fetch(ApiUtils.formatUrl('/loadAuth'), {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: JSON.stringify({ token })
    }
  });
  if (response.ok) {
    const text = await response.text();
    const data = await JSON.parse(text, dateParser);
    return data;
  }
  const error = new Error(response.statusText);
  throw error;
}

export default {
  login,
  load
};
