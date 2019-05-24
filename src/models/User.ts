/**
 * @fileoverview User Model
 */

/**
 * モデル
 * InitialDataにもこの形式で保存する
 */
export interface IUser {
  id: number | null;
  name: string;
  roles: import('./Role').IRole[];
}

/**
 * フォームやAPI送信時に利用されるDTO
 */
export interface IUserDTO {
  id: number | null;
  name: string;
}

/**
 * モデルをDTOに変換する
 */
export const toDTO = (model: IUser): IUserDTO => ({
  id: model.id,
  name: model.name
});

/**
 * DTOをモデルに変換する
 */
export const fromDTO = (dto: IUserDTO): IUser => ({
  ...dto,
  roles: []
});
