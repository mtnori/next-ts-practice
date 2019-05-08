/**
 * @fileoverview APIのUtility methods
 */
import getConfig from 'next/config';

const formatUrl = (path: string) => {
  const { publicRuntimeConfig } = getConfig();
  const { API_URL } = publicRuntimeConfig;
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  return `${API_URL}${adjustedPath}`;
};

export { formatUrl };
