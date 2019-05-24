/**
 * @fileoverview Customer Model
 */
export interface ICustomer {
  id: number | null;
  firstName: string;
  lastName: string;
  phoneticFirstName: string;
  phoneticLastName: string;
  addressId: number | null;
  address?: import('./Address').IAddress;
  createdAt: Date | null;
  updatedAt: Date | null;
}
