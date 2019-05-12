import fetcher from './fetcher';
import { formatUrl } from './apiUtils';
import { IUser } from '../models/User';

type Users = IUser[];

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
    const payload = await fetcher<IUser>(formatUrl(`/users/${id}`));
    return { payload };
  } catch (error) {
    return { error };
  }
}

export { getUsers, getUserById };
