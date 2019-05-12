import React from 'react';

export interface Auth {
  username: string;
  permissions: string[];
}

const AuthContext = React.createContext<Auth>({
  username: '',
  permissions: [] as string[]
});
export default AuthContext;
