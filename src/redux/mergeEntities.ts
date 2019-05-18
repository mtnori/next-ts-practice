/**
 * @fileoverview Entities resultをマージする
 */
import { isArray, mergeWith } from 'lodash';

const customizer = (a: any, b: any) => {
  if (isArray(a)) {
    return b;
  }
  return undefined;
};

const mergeEntities = <T>(state: T, entities: Partial<T>): T =>
  mergeWith(state, entities, customizer);

export default mergeEntities;
