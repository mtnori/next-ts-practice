import { Company } from '../../models/Company';

export interface CompanyEntity extends Company {}

export interface CompanyEntities {
  [key: string]: CompanyEntity;
}

const initialState = {};

const merge = (state: CompanyEntities, action: any): CompanyEntities => {
  const { payload } = action;
  if (payload && payload.entities && payload.entities.companies) {
    return payload.entities.companies;
  }
  return state;
};

const reducer = (
  state: CompanyEntities = initialState,
  action: any
): CompanyEntities => {
  return merge(state, action);
};
export default reducer;
