/**
 * @fileoverview Auth API
 */
import fetch from 'isomorphic-unfetch';

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
  const response = await fetch('http://localhost:3030/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ loginId, password })
  });
  if (response.ok) {
    const data = await response.json();
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
  const response = await fetch('http://localhost:3030/loadAuth', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: JSON.stringify({ token })
    }
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  const error = new Error(response.statusText);
  throw error;
}

export default {
  login,
  load
};
