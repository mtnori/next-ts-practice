interface User {
  id: number;
  name: string;
  roles: string[];
}

interface Role {
  id: number;
  name: string;
}

interface Company {
  id: number;
  name: string;
}

interface Entities {
  users: Map<string, User>;
  roles: Map<string, Role>;
  companies: Map<string, Company>;
}

export interface State {
  users: List<string>;
  companies: List<string>;
  entities: Entities;
}
