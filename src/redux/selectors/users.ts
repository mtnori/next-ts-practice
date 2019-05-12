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
