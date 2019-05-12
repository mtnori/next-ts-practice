import React from 'react';

export interface Auth {
  name: string;
  permissions: string[];
}

const AuthContext = React.createContext<Auth>({
  name: '',
  permissions: [] as string[]
});
export default AuthContext;
