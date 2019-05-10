import { createReducer } from 'typesafe-actions';
import { FETCH_SUCCESS } from '../constants/companies';

const reducer = createReducer([] as string[]).handleAction(
  FETCH_SUCCESS,
  (state, action) => {
    const { result } = action.payload;
    if (result) {
      // 配列ならば新しいものを返す
      if (Array.isArray(result)) {
        return result;
      }
      // 単一の要素なら追加して重複削除する
      let addArray = state.concat([result]);
      addArray = addArray.filter((x, i, self) => self.indexOf(x) === i);
      return addArray;
    }
    return state;
  }
);
export default reducer;
