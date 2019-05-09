import { CompanyEntities } from '../types/entities/companies';

interface Entities {
  companies?: CompanyEntities;
}

export interface Payload {
  result?: string[] | string;
  entities?: Entities;
}
