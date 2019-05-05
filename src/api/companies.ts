import fetch from 'isomorphic-unfetch';
import ApiUtils from './apiUtils';

async function getCompanies() {
  const response = await fetch(ApiUtils.formatUrl('/companies'));
  const result = await ApiUtils.getPayloadOrError(response);
  return result;
}

async function getCompanyById(id: number) {
  const response = await fetch(ApiUtils.formatUrl(`/companies/${id}`));
  const result = await ApiUtils.getPayloadOrError(response);
  return result;
}

export default {
  getCompanies,
  getCompanyById
};
