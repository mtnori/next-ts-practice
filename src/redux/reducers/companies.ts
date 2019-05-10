import { FETCH_SUCCESS } from '../constants/companies';

const merge = (state: string[], action: any): string[] => {
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

const reducer = (state: string[] = [], action: any) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return merge(state, action);
    default:
      return state;
  }
};
export default reducer;
