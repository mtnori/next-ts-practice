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
  getInputProps,
  ...props
}: DownshiftProps): MuiDownshiftProps => {
  const { name } = field;
  const { touched, errors, isSubmitting, setFieldValue } = form;

  // 選択変更された場合、FormikのvalueとinputValueを両方更新する
  const onSelect = (item: { label: string; value: any } | null) => {
    if (item) {
      setFieldValue(name, item.value);
    } else {
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
  filteredItems: Array<{ label: string; value: any }>; // フィルタされたアイテムリスト
  selectedItem: { label: string; value: any } | null;
  inputValue: string;
}

class Downshift extends React.Component<DownshiftProps, State> {
  static displayName = 'FormikMaterialUIDownshift';

  constructor(props: DownshiftProps) {
    super(props);

    // フィルタされたitemsを取得してstateに保存する
    const {
      field: { value },
      items
    } = props;
    let filteredItems = items;
    if (value) {
      filteredItems = items.filter(item => item.value === value);
    }

    const selectedItem = filteredItems.find(item => item.value === value);

    const inputValue = selectedItem ? selectedItem.label : '';

    this.state = {
      filteredItems,
      selectedItem,
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
      (!prevState.selectedItem == null && value !== null)
    ) {
      let filteredItems = items;
      let selectedItem = null;

      if (value) {
        filteredItems = items.filter(item => item.value === value);
        selectedItem = filteredItems.find(item => item.value === value);
      }

      const inputValue = selectedItem ? selectedItem.label : '';
      return {
        filteredItems,
        selectedItem,
        inputValue
      };
    }
    return null;
  }

  handleStateChange = (changes: any) => {
    const { items } = this.props;
    if (typeof changes.inputValue === 'string') {
      const filteredItems = items.filter(item =>
        item.label.toLowerCase().includes(changes.inputValue.toLowerCase())
      );
      this.setState({ ...changes, filteredItems });
    } else {
      this.setState(changes);
    }
  };

  render() {
    // itemsはフィルタした値を渡す
    const { filteredItems, selectedItem, inputValue } = this.state;

    return (
      <MuiDownshift
        {...fieldToDownshift({
          ...this.props,
          selectedItem,
          inputValue,
          items: filteredItems,
          onStateChange: this.handleStateChange
        })}
      />
    );
  }
}

export default Downshift;
