import { createReducer, RootAction } from 'typesafe-actions';
import { FETCH_SUCCESS } from '../constants/users';

const merge = (state: string[], action: RootAction): string[] => {
  const { payload } = action;
  if (payload && payload.result) {
    const { result } = payload;
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
};

const reducer = createReducer([] as string[]).handleAction(
  FETCH_SUCCESS,
  (state, action) => merge(state, action)
);

export default reducer;
