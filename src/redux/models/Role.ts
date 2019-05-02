/**
 * @fileoverview Role Model
 */
import { Record, RecordOf } from 'immutable';

interface RoleProps {
  id: number | null;
  name: string;
}

const defaultValues = {
  id: null,
  name: ''
};

export type RoleRecord = RecordOf<RoleProps>;

const makeRole = Record(defaultValues);
export default {
  makeRole
};
