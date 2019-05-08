import fetcher from './fetcher';
import { formatUrl } from './apiUtils';

interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  roles: Role[];
}

type Users = User[];

async function getUsers() {
  try {
    const payload = await fetcher<Users>(formatUrl('/users'));
    return { payload };
  } catch (error) {
    return { error };
  }
}

async function getUserById(id: number) {
  try {
    const payload = await fetcher<User>(formatUrl(`/users/${id}`));
    return { payload };
  } catch (error) {
    return { error };
  }
}

export { getUsers, getUserById };
