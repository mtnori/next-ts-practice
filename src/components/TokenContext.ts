import React from 'react';

export type Token = string;

const TokenContext = React.createContext<Token>('');
export default TokenContext;
