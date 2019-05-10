import { RootState } from 'typesafe-actions';

export type SuccessPayload = {
  result?: string | string[];
  entities?: Partial<Pick<RootState, 'entities'>>;
};
