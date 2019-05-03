import * as companies from '../constants/companies';

interface Payload {
  result: string[];
  entities: Object;
}

export function fetch() {
  return {
    type: companies.FETCH
  };
}

export function fetchSuccess(payload: Payload) {
  return {
    type: companies.FETCH_SUCCESS,
    payload
  };
}

export function fetchFailure(error: Error) {
  return {
    type: companies.FETCH_FAILURE,
    error
  };
}
