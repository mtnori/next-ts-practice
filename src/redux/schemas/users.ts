import { schema } from 'normalizr';
import role from './roles';

const user = new schema.Entity(
  'users',
  {
    roles: [role]
  },
  {
    idAttribute: value => String(value.id)
  }
);
export default user;
