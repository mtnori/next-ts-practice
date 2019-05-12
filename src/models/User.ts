/**
 * @fileoverview User Model
 */
export interface IUser {
  id: number;
  name: string;
  roles: import('./Role').IRole;
}
