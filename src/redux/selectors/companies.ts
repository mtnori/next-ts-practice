import { createSelector } from 'reselect';

import { StateMap } from '../State';
import companiesEntities from './entities/companies';

import Company from '../models/Company';

const getResult = (state: StateMap) => state.get('companies').toList();

const getCompaniesResult = createSelector(
  getResult,
  companiesEntities.getCompanies,
  (result, companies) => {
    return result.map(entityId => {
      const company = companies[entityId];
      return Company.makeCompany(company);
    });
  }
);

export default {
  getCompaniesResult
};
