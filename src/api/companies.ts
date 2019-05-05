import fetch from 'isomorphic-unfetch';
import getPayloadOrError from './getPayloadOrError';

async function getCompanies() {
  const response = await fetch(`http://localhost:3030/companies`);
  const result = await getPayloadOrError(response);
  return result;
}

async function getCompanyById(id: number) {
  const response = await fetch(`http://localhost:3030//companies${id}`);
  const result = await getPayloadOrError(response);
  return result;
}

export default {
  getCompanies,
  getCompanyById
};
