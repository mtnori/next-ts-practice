import fetcher from './fetcher';
import { formatUrl } from './apiUtils';
import { IUser } from '../models/User';

type Users = IUser[];

async function getUsers() {
  try {
    const response = await fetcher<Users>(formatUrl('/users'));
    return response;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id: number) {
  try {
    const response = await fetcher<IUser>(formatUrl(`/users/${id}`));
    return response;
  } catch (error) {
    throw error;
  }
}

export { getUsers, getUserById };
