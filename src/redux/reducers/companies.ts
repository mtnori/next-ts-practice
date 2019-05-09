import {
  FETCH_SUCCESS,
  CompaniesActionTypes,
  CompaniesPayloadActionTypes
} from '../constants/companies';

const merge = (state: string[], action: CompaniesActionTypes): string[] => {
  if ((<CompaniesPayloadActionTypes>action).payload) {
    const {
      payload: { result }
    } = <CompaniesPayloadActionTypes>action;
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

const reducer = (state: string[] = [], action: CompaniesActionTypes) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return merge(state, action);
    default:
      return state;
  }
};
export default reducer;
