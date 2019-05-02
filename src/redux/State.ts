import { Map, OrderedSet } from 'immutable';

interface ImmutableMap<T> extends Map<string, any> {
  get<K extends keyof T>(name: K): T[K];
  getIn<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
    path: [K1, K2, K3]
  ): T[K1][K2][K3];
  getIn<K1 extends keyof T, K2 extends keyof T[K1]>(path: [K1, K2]): T[K1][K2];
  getIn<K1 extends keyof T>(path: [K1]): T[K1];
  getIn(keyPath: any[], notSetValue?: any): any;
}

interface User {
  id: number;
  name: string;
  roles: string[];
}

type UserMap = ImmutableMap<User>;

interface Role {
  id: number;
  name: string;
}

type RoleMap = ImmutableMap<Role>;

interface Entities {
  users: UserMap;
  roles: RoleMap;
}

type EntitiesMap = ImmutableMap<Entities>;

export interface State {
  users: OrderedSet<string>;
  entities: EntitiesMap;
}

export type StateMap = ImmutableMap<State>;
