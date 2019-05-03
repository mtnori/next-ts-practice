import { createSelector } from 'reselect';
import { StateMap } from '../../State';

const getCompaniesMap = (state: StateMap) =>
  state.getIn(['entities', 'companies']);

const getCompanies = createSelector(
  getCompaniesMap,
  companysMap => {
    return companysMap.toJS();
  }
);

export default {
  getCompanies
};
