import { createAsyncAction } from 'typesafe-actions';
import { FETCH, FETCH_SUCCESS, FETCH_FAILURE } from '../constants/companies';
import { SuccessPayload } from '../types/SuccessPayload';

export const fetchCompaniesAsync = createAsyncAction(
  FETCH,
  FETCH_SUCCESS,
  FETCH_FAILURE
)<undefined, SuccessPayload, Error>();
