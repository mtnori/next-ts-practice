import {
  FETCH,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  Payload,
  CompaniesActionTypes
} from '../constants/companies';

export function fetch(): CompaniesActionTypes {
  return {
    type: FETCH
  };
}

export function fetchSuccess(payload: Payload): CompaniesActionTypes {
  return {
    type: FETCH_SUCCESS,
    payload
  };
}

export function fetchFailure(error: Error): CompaniesActionTypes {
  return {
    type: FETCH_FAILURE,
    error
  };
}
