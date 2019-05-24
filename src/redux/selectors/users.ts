/**
 * @fileoverview Users selector
 */
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { RootState } from '../reducers';
import { EntitiesState } from '../reducers/entities';
import { IUser } from '../../models/User';
import schemas from '../schemas';

const getResult = (state: RootState) => state.users;

const getEntities = (state: RootState) => state.entities;

export const getFetchStatus = (state: RootState) => state.fetchStatus.users;

export const getUsers = createSelector<
  RootState,
  string[],
  EntitiesState,
  IUser[]
>(
  getResult,
  getEntities,
  (result, entities) => denormalize(result, [schemas.user], entities)
);

// この定義は外でも使いたいので、exportしておく
export interface Item {
  label: string;
  value: number;
}

interface NullableItem {
  label: string;
  value: number | null;
}

// Type Guard
function notNull(item: Item | NullableItem): item is Item {
  return item.value !== null;
}

// Return user item list(notNull)
// Type Guardを使用したので、valueがnullの値は入ってこない
export const getUsersItem = createSelector<RootState, IUser[], Item[]>(
  getUsers,
  users =>
    users
      .map(user => ({
        label: user.name,
        value: user.id
      }))
      .filter(notNull)
);
