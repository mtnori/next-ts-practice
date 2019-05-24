import { ICustomer } from '../models/Customer';

/**
 * 新規登録用Form
 */
export interface ICustomerNewForm {
  id: number | null;
  firstName: string;
  lastName: string;
  phoneticFirstName: string;
  phoneticLastName: string;
  address: {
    id: number | null;
    postal: string;
    address: string;
    phoneticAddress: string;
    building: string;
    phoneticBuilding: string;
    company: {
      id: number | null;
      name: string;
    };
  };
}

/**
 * モデルを新規登録用Formに変換する
 */
export const fromModel = (model: ICustomer): ICustomerNewForm | undefined => {
  if (model.address && model.address.company) {
    const { address } = model;
    const {
      address: { company }
    } = model;
    return {
      id: model.id,
      firstName: model.firstName,
      lastName: model.lastName,
      phoneticFirstName: model.phoneticFirstName,
      phoneticLastName: model.phoneticLastName,
      address: {
        id: address.id,
        postal: address.postal,
        address: address.address,
        phoneticAddress: address.phoneticAddress,
        building: address.building,
        phoneticBuilding: address.phoneticBuilding,
        company: {
          id: company.id,
          name: company.name
        }
      }
    };
  }
  // 必要なデータが足りなければundefinedを返す
  return undefined;
};
