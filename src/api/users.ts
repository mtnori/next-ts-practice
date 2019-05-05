import fetch from 'isomorphic-unfetch';
import getPayloadOrError from './getPayloadOrError';

async function getUsers() {
  const response = await fetch(`http://localhost:3030/users`);
  const result = await getPayloadOrError(response);
  return result;
}

async function getUserById(id: number) {
  const response = await fetch(`http://localhost:3030/users/${id}`);
  const result = await getPayloadOrError(response);
  return result;
}

export default {
  getUsers,
  getUserById
};
