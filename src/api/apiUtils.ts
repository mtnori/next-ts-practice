/**
 * @fileoverview APIのUtility methods
 */
import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config';
import dateParser from '../utils/dateParser';

const formatUrl = (path: string) => {
  const { publicRuntimeConfig } = getConfig();
  const { API_URL } = publicRuntimeConfig;
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  return `${API_URL}${adjustedPath}`;
};

const getPayloadOrError = async (response: fetch.IsomorphicResponse) => {
  if (response.ok) {
    const text = await response.text();
    const payload = JSON.parse(text, dateParser);
    return { payload };
  }
  const error = new Error(response.statusText);
  return { error };
};

export default {
  formatUrl,
  getPayloadOrError
};
