/**
 * @fileoverview Role Model
 */
export interface IRole {
  id: number | null;
  name: string;
  users: import('./User').IUser[];
}
