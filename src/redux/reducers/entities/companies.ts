import {
  CompaniesActionTypes,
  CompaniesPayloadActionTypes
} from '../../constants/companies';
import { CompanyEntities } from '../../types/entities/companies';

const initialState = {};

const merge = (
  state: CompanyEntities,
  action: CompaniesActionTypes
): CompanyEntities => {
  if ((<CompaniesPayloadActionTypes>action).payload) {
    const { payload } = <CompaniesPayloadActionTypes>action;
    return payload.entities.companies;
  }
  return state;
};

const reducer = (
  state: CompanyEntities = initialState,
  action: CompaniesActionTypes
): CompanyEntities => {
  return merge(state, action);
};
export default reducer;
