import fetcher from './fetcher';
import { formatUrl } from './apiUtils';
import { IUser, IUserDTO } from '../models/User';

type Users = IUser[];

export async function getUsers() {
  try {
    const response = await fetcher<Users>(formatUrl('/users'));
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(id: number) {
  try {
    const response = await fetcher<IUser>(formatUrl(`/users/${id}`));
    return response;
  } catch (error) {
    throw error;
  }
}

export async function createUser(data: IUserDTO, token: string) {
  try {
    const response = await fetcher<IUser>(formatUrl('/users'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.stringify({ token })
      },
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    throw error;
  }
}
