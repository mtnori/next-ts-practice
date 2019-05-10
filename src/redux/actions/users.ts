import { createAsyncAction } from 'typesafe-actions';
import { FETCH, FETCH_SUCCESS, FETCH_FAILURE } from '../constants/users';
import { SuccessPayload } from '../types/SuccessPayload';

export const fetchUsersAsync = createAsyncAction(
  FETCH,
  FETCH_SUCCESS,
  FETCH_FAILURE
)<undefined, SuccessPayload, Error>();
