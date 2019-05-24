/**
 * @fileoverview Customers Action creator
 */
import { ICustomer } from '../../models/Customer';
import {
  INITIALIZE,
  INITIALIZE_SUCCESS,
  INITIALIZE_FAILURE
} from '../constants/customers';

export const initialize = (token: string) => ({
  type: INITIALIZE as typeof INITIALIZE,
  meta: { token }
});

export const initializeSuccess = (payload: ICustomer) => ({
  type: INITIALIZE_SUCCESS as typeof INITIALIZE_SUCCESS,
  payload
});

export const initializeFailure = (error: Error) => ({
  type: INITIALIZE_FAILURE as typeof INITIALIZE_FAILURE,
  error
});

export type CustomersActions =
  | ReturnType<typeof initialize>
  | ReturnType<typeof initializeSuccess>
  | ReturnType<typeof initializeFailure>;
