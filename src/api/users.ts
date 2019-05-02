import fetch from 'isomorphic-unfetch';

async function getUsers() {
  const response = await fetch(`http://localhost:3030/users`);
  if (response.ok) {
    const payload = await response.json();
    return { payload };
  }
  const error = new Error(response.statusText);
  return { error };
}

async function getUserById(id: number) {
  const response = await fetch(`http://localhost:3030/users/${id}`);
  if (response.ok) {
    const payload = await response.json();
    return { payload };
  }
  const error = new Error(response.statusText);
  return { error };
}

export default {
  getUsers,
  getUserById
};
