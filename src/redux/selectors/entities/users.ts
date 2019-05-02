import { createSelector } from 'reselect';
import { StateMap } from '../../State';

const getUsersMap = (state: StateMap) => state.getIn(['entities', 'users']);

const getUsers = createSelector(
  getUsersMap,
  usersMap => {
    return usersMap.toJS();
  }
);

export default {
  getUsers
};
