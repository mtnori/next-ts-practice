/**
 * @fileoverview Entities resultをマージする
 */
import { merge } from 'lodash';

const mergeEntities = <T>(state: T, entities: Partial<T>): T =>
  merge(state, entities);

export default mergeEntities;
