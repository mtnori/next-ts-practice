/**
 * @fileoverview Role Model
 */
export interface IRole {
  id: number;
  name: string;
  users: import('./User').IUser[];
}
