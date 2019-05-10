/**
 * @fileoverview User Model
 */
import { Role } from './Role';

export interface User {
  id: number;
  name: string;
  roles: Role[];
}

