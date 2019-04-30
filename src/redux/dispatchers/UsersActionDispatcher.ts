import { fetch, fetchSuccess } from '../actions/users';
import userApi from '../../api/users';

export default class UsersActionDispatcher {
  dispatch: any;

  constructor(dispatch: any) {
    this.dispatch = dispatch;
  }

  async getUser(id: number): Promise<void> {
    this.dispatch(fetch()); // Fetch start
    const user = await userApi.getUser({ id }); // call api
    // TODO ここで正規化する
    this.dispatch(fetchSuccess(user)); // Fetch success
  }
}
