/**
 * @fileoverview Root Action
 */
import { UsersActions } from './users';
import { CustomersActions } from './customers';

export type RootAction = UsersActions | CustomersActions;
