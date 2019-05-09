import { CompaniesActionTypes } from '../../constants/companies';
import { CompanyEntities } from '../../types/entities/companies';

const initialState = {};

const merge = (
  state: CompanyEntities,
  action: CompaniesActionTypes
): CompanyEntities => {
  const { payload } = action;
  if (payload && payload.entities && payload.entities.companies) {
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
