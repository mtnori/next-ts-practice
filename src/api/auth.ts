/**
 * @fileoverview Auth API
 */
import fetch from 'isomorphic-unfetch';

/**
 * ログイン処理
 * @param {string} loginId
 * @param {string} password
 */
async function login(loginId: string, password: string) {
  const response = await fetch('http://localhost:3030/login', {
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

export default {
  login
};
