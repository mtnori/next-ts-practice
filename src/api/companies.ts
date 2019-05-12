import fetcher from './fetcher';
import { formatUrl } from './apiUtils';
import { ICompany } from '../models/Company';

type Companies = ICompany[];

async function getCompanies() {
  try {
    const payload = await fetcher<Companies>(formatUrl('/companies'));
    return { payload };
  } catch (error) {
    return { error };
  }
}

async function getCompanyById(id: number) {
  try {
    const payload = await fetcher<ICompany>(formatUrl(`/companies/${id}`));
    return { payload };
  } catch (error) {
    return { error };
  }
}

export { getCompanies, getCompanyById };
