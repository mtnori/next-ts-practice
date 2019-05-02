import * as users from '../constants/users';

interface Payload {
  result: string[];
  entities: Object;
}

export function fetch() {
  return {
    type: users.FETCH
  };
}

export function fetchSuccess(payload: Payload) {
  return {
    type: users.FETCH_SUCCESS,
    payload
  };
}

export function fetchFailure(error: Error) {
  return {
    type: users.FETCH_FAILURE,
    error
  };
}
