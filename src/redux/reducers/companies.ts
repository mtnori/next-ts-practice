import produce from 'immer';
import * as companies from '../constants/companies';

const merge = (state: string[], action: any) => {
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
  // 変化がなければnullを返す
  return null;
};

const reducer = (state: string[] = [], action: any) =>
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  produce(state, draft => {
    switch (action.type) {
      case companies.FETCH_SUCCESS: {
        const newState = merge(draft, action);
        if (newState) {
          draft = newState; // eslint-disable-line no-param-reassign
        }
        break;
      }
      default:
    }
  });
export default reducer;
