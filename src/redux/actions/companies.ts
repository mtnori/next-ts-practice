import { createAsyncAction } from 'typesafe-actions';
import { FETCH, FETCH_SUCCESS, FETCH_FAILURE } from '../constants/companies';
import { Company } from '../models/Company';

export const fetchCompaniesAsync = createAsyncAction(
  FETCH,
  FETCH_SUCCESS,
  FETCH_FAILURE
)<undefined, Company[], Error>();
