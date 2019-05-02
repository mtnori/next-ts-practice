/**
 * @fileoverview User Model
 */
import { Record, RecordOf, List } from 'immutable';
import { RoleRecord } from './Role';

interface UserProps {
  id: number | null;
  name: string;
  roles: List<RoleRecord>;
}

const defaultValues = {
  id: null,
  name: '',
  roles: List([])
};

export type UserRecord = RecordOf<UserProps>;

const makeUser = Record(defaultValues);
export default {
  makeUser
};
