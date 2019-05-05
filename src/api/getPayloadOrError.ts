import fetch from 'isomorphic-unfetch';
import dateParser from '../utils/dateParser';

const getPayloadOrError = async (response: fetch.IsomorphicResponse) => {
  if (response.ok) {
    const text = await response.text();
    const payload = JSON.parse(text, dateParser);
    return { payload };
  }
  const error = new Error(response.statusText);
  return { error };
};
export default getPayloadOrError;
