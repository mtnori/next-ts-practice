import { RootState } from 'typesafe-actions';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import schemas from '../schemas';

const getResult = (state: RootState) => state.companies;

const getEntities = (state: RootState) => state.entities;

const getCompaniesResult = createSelector(
  getResult,
  getEntities,
  (result, entities) => denormalize(result, [schemas.company], entities)
);

export default {
  getCompaniesResult
};
