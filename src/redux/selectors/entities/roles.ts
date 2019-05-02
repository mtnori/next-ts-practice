import { createSelector } from 'reselect';
import { StateMap } from '../../State';

const getRolesMap = (state: StateMap) => state.getIn(['entities', 'roles']);

const getRoles = createSelector(
  getRolesMap,
  rolesMap => {
    return rolesMap.toJS();
  }
);

export default {
  getRoles
};
