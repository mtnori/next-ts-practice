/**
 * @fileoverview Users Action creator
 */
import { IUserDTO } from '../../models/User';
import {
  FETCH,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  CREATE,
  CREATE_SUCCESS,
  CREATE_FAILURE
} from '../constants/users';
import { NormalizedData } from '../NormalizedData';

export const fetch = () => ({
  type: FETCH as typeof FETCH
});

export const fetchSuccess = (payload: NormalizedData) => ({
  type: FETCH_SUCCESS as typeof FETCH_SUCCESS,
  payload
});

export const fetchFailure = (error: Error) => ({
  type: FETCH_FAILURE as typeof FETCH_FAILURE,
  error
});

export const create = (data: IUserDTO, token: string) => ({
  type: CREATE as typeof CREATE,
  payload: data,
  meta: { token }
});

export const createSuccess = (payload: NormalizedData) => ({
  type: CREATE_SUCCESS as typeof CREATE_SUCCESS,
  payload
});

export const createFailure = (error: Error) => ({
  type: CREATE_FAILURE as typeof CREATE_FAILURE,
  error
});

export type UsersActions =
  | ReturnType<typeof fetch>
  | ReturnType<typeof fetchSuccess>
  | ReturnType<typeof fetchFailure>
  | ReturnType<typeof create>
  | ReturnType<typeof createSuccess>
  | ReturnType<typeof createFailure>;
