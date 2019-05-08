import fetcher from './fetcher';
import { formatUrl } from './apiUtils';

interface Company {
  id: number;
  name: string;
}

type Companies = Company[];

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
    const payload = await fetcher<Company>(formatUrl(`/companies/${id}`));
    return { payload };
  } catch (error) {
    return { error };
  }
}

export { getCompanies, getCompanyById };
