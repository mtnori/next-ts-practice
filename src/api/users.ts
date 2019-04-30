import fetch from 'isomorphic-unfetch';

async function getUser(id: number) {
  const response = await fetch(`http://localhost:3030/users/${id}`);
  if (response.ok) {
    const payload = await response.json();
    return { payload };
  }
  const error = new Error(response.statusText);
  return { error };
}

export default {
  getUser
};
