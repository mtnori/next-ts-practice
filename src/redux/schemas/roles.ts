import { schema } from 'normalizr';

const role = new schema.Entity('roles', undefined, {
  idAttribute: value => String(value.id)
});
export default role;
