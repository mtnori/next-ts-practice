import { Entities } from '../types/entities';

export const FETCH = 'companies/FETCH';
export const FETCH_SUCCESS = 'companies/FETCH_SUCCESS';
export const FETCH_FAILURE = 'companies/FETCH_FAILURE';

export interface Payload {
  result: string[] | string;
  entities: Entities;
}

interface FetchAction {
  type: typeof FETCH;
  payload?: undefined;
}

interface FetchSuccessAction {
  type: typeof FETCH_SUCCESS;
  payload: Payload;
}

interface FetchFailuerAction {
  type: typeof FETCH_FAILURE;
  payload?: undefined;
  error: Error;
}

export type CompaniesActionTypes =
  | FetchAction
  | FetchSuccessAction
  | FetchFailuerAction;
