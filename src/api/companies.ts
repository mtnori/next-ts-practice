import fetch from 'isomorphic-unfetch';

async function getCompanies() {
  const response = await fetch(`http://localhost:3030/companies`);
  if (response.ok) {
    const payload = await response.json();
    return { payload };
  }
  const error = new Error(response.statusText);
  return { error };
}

async function getCompanyById(id: number) {
  const response = await fetch(`http://localhost:3030//companies${id}`);
  if (response.ok) {
    const payload = await response.json();
    return { payload };
  }
  const error = new Error(response.statusText);
  return { error };
}

export default {
  getCompanies,
  getCompanyById
};
