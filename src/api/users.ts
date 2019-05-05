import fetch from 'isomorphic-unfetch';
import ApiUtils from './apiUtils';

async function getUsers() {
  const response = await fetch(ApiUtils.formatUrl('/users'));
  const result = await ApiUtils.getPayloadOrError(response);
  return result;
}

async function getUserById(id: number) {
  const response = await fetch(ApiUtils.formatUrl(`/users/${id}`));
  const result = await ApiUtils.getPayloadOrError(response);
  return result;
}

export default {
  getUsers,
  getUserById
};
