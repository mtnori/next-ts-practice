import fetcher from './fetcher';
import { formatUrl } from './apiUtils';
import { ICustomer } from '../models/Customer';
import { ICustomerNewForm } from '../forms/CustomerNewForm';
import { ICustomerEditForm } from '../forms/CustomerEditForm';

type Customers = ICustomer[];

export async function index(token: string) {
  try {
    const payload = await fetcher<Customers>(formatUrl('/customers'), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.stringify({ token })
      }
    });
    return { payload };
  } catch (error) {
    throw error;
  }
}

export async function show(id: number, token: string) {
  try {
    const payload = await fetcher<ICustomer>(formatUrl(`/customers/${id}`), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.stringify({ token })
      }
    });
    return { payload };
  } catch (error) {
    throw error;
  }
}

export async function initialize(token: string) {
  try {
    const payload = await fetcher<ICustomer>(formatUrl('/customers/new'), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.stringify({ token })
      }
    });
    return { payload };
  } catch (error) {
    throw error;
  }
}

export async function edit(id: number, token: string) {
  try {
    const payload = await fetcher<ICustomer>(
      formatUrl(`/customers/${id}/edit`),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: JSON.stringify({ token })
        }
      }
    );
    return { payload };
  } catch (error) {
    throw error;
  }
}

export async function create(data: ICustomerNewForm, token: string) {
  try {
    const response = await fetcher<ICustomer>(formatUrl('/customers'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.stringify({ token })
      },
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function update(
  id: number,
  data: ICustomerEditForm,
  token: string
) {
  try {
    const response = await fetcher<ICustomer>(formatUrl(`/customers/${id}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.stringify({ token })
      },
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    throw error;
  }
}
