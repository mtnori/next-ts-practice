export interface Company {
  id: number;
  name: string;
}

export interface CompanyEntity extends Company {}

export interface CompanyEntities {
  [key: string]: CompanyEntity;
}
