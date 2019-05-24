/**
 * @fileoverview InitialDatas reducer
 */
import { combineReducers } from 'redux';

import customers from './customers';

const initialDatasReducer = combineReducers({
  customers
});

export default initialDatasReducer;

export type InitialDatasState = ReturnType<typeof initialDatasReducer>;
