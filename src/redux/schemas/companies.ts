import { schema } from 'normalizr';

const role = new schema.Entity('companies', undefined, {
  idAttribute: value => String(value.id)
});
export default role;
