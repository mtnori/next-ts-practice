import { createAsyncAction } from 'typesafe-actions';
import { FETCH, FETCH_SUCCESS, FETCH_FAILURE } from '../constants/users';
import { User } from '../models/User';

export const fetchUsersAsync = createAsyncAction(
  FETCH,
  FETCH_SUCCESS,
  FETCH_FAILURE
)<undefined, User[], Error>();
