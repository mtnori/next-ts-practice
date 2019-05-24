import { Reducer } from 'redux';
import { RootAction } from '../../actions';
import { ICustomer } from '../../../models/Customer';

import { INITIALIZE_SUCCESS } from '../../constants/customers';

type State = ICustomer;

const initialState = {
  id: null,
  firstName: '',
  lastName: '',
  phoneticFirstName: '',
  phoneticLastName: '',
  addressId: null,
  createdAt: null,
  updatedAt: null
};

const reducer: Reducer<State, RootAction> = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
    default:
      return state;
  }
};

export default reducer;
