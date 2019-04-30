import axios from 'axios';

async function getUser({ id }: { id: number }) {
  const res = await axios.get(`http://localhost:3030/users/${id}`);
  return res.data;
}

export default {
  getUser
};
