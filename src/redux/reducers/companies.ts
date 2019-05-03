import { OrderedSet } from 'immutable';
import * as companies from '../constants/companies';

const initialState = OrderedSet([]);

const merge = (state: OrderedSet<string>, action: any) => {
  const { result } = action.payload;
  if (result) {
    // 配列ならばマージ
    if (Array.isArray(result)) {
      return state.merge(result);
    }
    // 単一の要素なら追加
    return state.merge([result]);
  }
  return state;
};

const reducer = (state: OrderedSet<string> = initialState, action: any) => {
  switch (action.type) {
    case companies.FETCH_SUCCESS:
      return merge(state, action);
    default:
      return state;
  }
};
export default reducer;
