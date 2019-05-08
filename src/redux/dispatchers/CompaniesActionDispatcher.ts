/**
 * @fileoverview Companies action dispatcher
 */
import { normalize } from 'normalizr';
import schemas from '../schemas';
import { fetch, fetchSuccess, fetchFailure } from '../actions/companies';
import * as API from '../../api/companies';

export default class CompaniesActionDispatcher {
  dispatch: any;

  constructor(dispatch: any) {
    this.dispatch = dispatch;
  }

  async getCompanies(): Promise<void> {
    this.dispatch(fetch()); // Fetch start

    const response = await API.getCompanies(); // Call api
    const { payload, error } = response;

    if (payload && !error) {
      const normalizedData = normalize(payload, [schemas.company]); // Normalize
      this.dispatch(fetchSuccess(normalizedData)); // Fetch success
    } else if (error) {
      this.dispatch(fetchFailure(error)); // Fetch failure
    }
  }
}
