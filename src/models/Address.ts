/**
 * @fileoverview Address Model
 */
export interface IAddress {
  id: number | null;
  postal: string;
  address: string;
  phoneticAddress: string;
  building: string;
  phoneticBuilding: string;
  companyId: number | null;
  company?: import('./Company').ICompany;
}
