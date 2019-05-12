/**
 * @fileoverview Users Action creator
 */
import { FETCH, FETCH_SUCCESS, FETCH_FAILURE } from '../constants/users';
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

export type UsersActions =
  | ReturnType<typeof fetch>
  | ReturnType<typeof fetchSuccess>
  | ReturnType<typeof fetchFailure>;
