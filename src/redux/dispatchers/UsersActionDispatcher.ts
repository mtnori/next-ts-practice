/**
 * @fileoverview Users action dispatcher
 */
import { normalize } from 'normalizr';
import schemas from '../schemas';
import { fetch, fetchSuccess, fetchFailure } from '../actions/users';
import * as API from '../../api/users';

export default class UsersActionDispatcher {
  dispatch: any;

  constructor(dispatch: any) {
    this.dispatch = dispatch;
  }

  async getUsers(): Promise<void> {
    this.dispatch(fetch()); // Fetch start

    const response = await API.getUsers(); // Call api
    const { payload, error } = response;

    if (payload && !error) {
      const normalizedData = normalize(payload, [schemas.user]); // Normalize
      this.dispatch(fetchSuccess(normalizedData)); // Fetch success
    } else if (error) {
      this.dispatch(fetchFailure(error)); // Fetch failure
    }
  }
}
