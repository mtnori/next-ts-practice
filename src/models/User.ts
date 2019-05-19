/**
 * @fileoverview User Model
 */
export interface IUser {
  id: number;
  name: string;
  roles: import('./Role').IRole;
}

export interface IUserDTO {
  id: number | null;
  name: string;
}
