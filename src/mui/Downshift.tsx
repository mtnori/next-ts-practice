/**
 * @fileoverview Formik wrapper of MuiDownshift component
 */
import * as React from 'react';
import _ from 'lodash';
import { FieldProps, getIn } from 'formik';
import MuiDownshift, { MuiDownshiftProps, InputProps } from 'mui-downshift';
import { Omit } from '../types';

export interface DownshiftProps
  extends FieldProps,
    Omit<MuiDownshiftProps, 'getInputProps'> {
  getInputProps?: () => Omit<
    InputProps,
    'error' | 'name' | 'onChange' | 'value' // fieldが持っているのでOmit
  >;
}

interface InnerProps {
  handleSelect: (item: { label: string; value: any } | null) => void;
}

/**
 * FieldのPropsからDownshiftのPropsへ変換する
 * @param {DownshiftProps}
 * @return {MuiDownshiftProps}
 */
export const fieldToDownshift = ({
  field,
  form,
  items = [],
  disabled = false,
  focusOnClear = true,
  handleSelect,
  getInputProps,
  ...props
}: DownshiftProps & InnerProps): MuiDownshiftProps => {
  const { name } = field;
  const { touched, errors, isSubmitting, setFieldValue } = form;

  // 選択変更された場合、FormikのvalueとinputValueを両方更新する
  const onSelect = (item: { label: string; value: any } | null) => {
    if (item) {
      handleSelect(item);
      setFieldValue(name, item.value);
    } else {
      handleSelect(null);
      setFieldValue(name, null);
    }
  };

  const fieldError = getIn(errors, name);
  const showError = getIn(touched, name) && !!fieldError;

  // valueとonChangeは使わないのでOmitしておく
  const restField = _.omit(field, 'onChange', 'value');
  // Inputコンポーネント部分に適用されるProps
  const inputProps = getInputProps ? getInputProps() : {};

  return {
    ...props,
    items,
    onSelect,
    focusOnClear,
    getInputProps: () => ({
      ...restField,
      ...inputProps,
      disabled: isSubmitting || disabled,
      error: showError,
      helperText: showError ? fieldError : inputProps.helperText
    })
  };
};

interface State {
  selectedItem: { label: string; value: any } | null;
  inputValue: string;
}

class Downshift extends React.Component<DownshiftProps, State> {
  static displayName = 'FormikMaterialUIDownshift';

  constructor(props: DownshiftProps) {
    super(props);

    const {
      field: { value },
      items
    } = props;
    const selectedItem = items.find(item => item.value === value);
    const inputValue = selectedItem ? selectedItem.label : '';

    this.state = {
      selectedItem: selectedItem || null,
      inputValue
    };
  }

  static getDerivedStateFromProps(nextProps: DownshiftProps, prevState: State) {
    const {
      items,
      field: { value }
    } = nextProps;

    /**
     * 外からvalueが変化した場合、表示を更新する
     */
    if (
      (prevState.selectedItem !== null &&
        value !== prevState.selectedItem.value) ||
      (prevState.selectedItem == null && value !== null)
    ) {
      let selectedItem = null;

      if (value) {
        selectedItem = items.find(item => item.value === value);
      }

      const inputValue = selectedItem ? selectedItem.label : '';
      return {
        selectedItem: selectedItem || null,
        inputValue
      };
    }
    return null;
  }

  /**
   * Inputコンポーネントへ入力を行ったとき
   */
  handleStateChange = (changes: any) => {
    if (typeof changes.inputValue === 'string') {
      this.setState({
        inputValue: changes.inputValue
      });
    }
  };

  /**
   * アイテムを選択したときのState変更処理
   */
  handleSelect = (item: { label: string; value: any } | null) => {
    const inputValue = item ? item.label : '';
    this.setState({
      selectedItem: item,
      inputValue
    });
  };

  /**
   * フィルタしたアイテムリストを取得する
   */
  getFilteredItems = (
    items: { label: string; value: any }[],
    inputValue: string
  ) => {
    let filteredItems = items;
    if (inputValue) {
      filteredItems = items.filter(v =>
        v.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
    return filteredItems;
  };

  render() {
    const { items } = this.props;
    const { selectedItem, inputValue } = this.state;

    return (
      <MuiDownshift
        {...fieldToDownshift({
          ...this.props,
          selectedItem,
          inputValue,
          items: this.getFilteredItems(items, inputValue),
          handleSelect: this.handleSelect,
          onStateChange: this.handleStateChange
        })}
      />
    );
  }
}

export default Downshift;
