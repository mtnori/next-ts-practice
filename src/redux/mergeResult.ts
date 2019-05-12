/**
 * @fileoverview Result reducerをmergeする
 */
const mergeResult = (state: string[], result: string | string[]) => {
  if (result) {
    // 配列ならば新しいものを返す
    if (Array.isArray(result)) {
      return result;
    }
    // 単一の要素なら追加して重複削除する
    let newArray = state.concat([result]);
    newArray = newArray.filter((x, i, self) => self.indexOf(x) === i);
    return newArray;
  }
  return state;
};
export default mergeResult;
