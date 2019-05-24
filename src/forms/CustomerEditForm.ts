import { ICustomer } from '../models/Customer';

/**
 * 編集用Form
 */
export interface ICustomerEditForm {
  id: number | null;
  firstName: string;
  lastName: string;
  phoneticFirstName: string;
  phoneticLastName: string;
  addressId: number | null;
}

/**
 * モデルを編集用Formに変換する
 */
export const fromModel = (model: ICustomer): ICustomerEditForm => ({
  id: model.id,
  firstName: model.firstName,
  lastName: model.lastName,
  phoneticFirstName: model.phoneticFirstName,
  phoneticLastName: model.phoneticLastName,
  addressId: model.addressId
});
