/**
 * @fileoverview Formik wrapper of MuiDownshift component
 */
import * as React from 'react';
import _ from 'lodash';
import { FieldProps, getIn } from 'formik';
import MuiDownshift, { MuiDownshiftProps } from 'mui-downshift';

export interface DownshiftProps extends FieldProps, MuiDownshiftProps {
  inputValue: string;
  setFieldValue: any;
  selectedItem: { label: string; value: any } | null;
  handleSelect: (item: { label: string; value: any } | null) => void;
}

export const fieldToDownshift = ({
  field,
  form,
  items = [],
  disabled = false,
  inputValue,
  setFieldValue,
  selectedItem,
  handleSelect,
  getInputProps,
  ...props
}: DownshiftProps): MuiDownshiftProps => {
  // 選択変更された場合、FormikのvalueとinputValueを両方更新する
  const onSelect = (item: { label: string; value: any } | null) => {
    if (item) {
      handleSelect(item);
      setFieldValue(field.name, item.value);
    } else {
      handleSelect(null);
      setFieldValue(field.name, null);
    }
  };

  const { name } = field;
  const { touched, errors, isSubmitting } = form;

  const fieldError = getIn(errors, name);
  const showError = getIn(touched, name) && !!fieldError;

  // valueとonChangeは使わないのでOmitしておく
  const restField = _.omit(field, 'onChange', 'value');
  // Inputコンポーネント部分に適用されるProps
  const inputProps = getInputProps ? getInputProps() : {};

  return {
    ...props,
    items,
    selectedItem,
    onSelect,
    getInputProps: () => ({
      ...inputProps,
      ...restField,
      value: inputValue,
      disabled: isSubmitting || disabled,
      error: showError,
      helperText: showError ? fieldError : inputProps.helperText
    })
  };
};

interface State {
  selectedItem: { label: string; value: any } | null; // 現在選択されているアイテム
  filteredItems: Array<{ label: string; value: any }>[]; // フィルタされたアイテムリスト
  inputValue: string; // 入力項目値
}

class Downshift extends React.Component<DownshiftProps, State> {
  constructor(props: DownshiftProps) {
    super(props);
    const {
      items,
      field: { value }
    } = props;
    const selectedItem = items.find(v => v.value === value);

    this.state = {
      selectedItem: selectedItem || null,
      filteredItems: props.items,
      inputValue: selectedItem ? selectedItem.label : ''
    };
  }

  handleStateChange = (changes: any) => {
    const { items } = this.props;
    if (typeof changes.inputValue === 'string') {
      const filteredItems = items.filter(item =>
        item.label.toLowerCase().includes(changes.inputValue.toLowerCase())
      );
      this.setState({ filteredItems, inputValue: changes.inputValue });
    }
  };

  /**
   * アイテムを選択したときのState変更処理
   */
  handleSelect = (item: { label: string; value: any } | null) => {
    this.setState({
      selectedItem: item,
      inputValue: item ? item.label : ''
    });
  };

  render() {
    // itemsはフィルタした値を渡す
    const { filteredItems, inputValue, selectedItem } = this.state;
    return (
      <MuiDownshift
        {...fieldToDownshift({
          ...this.props,
          items: filteredItems,
          inputValue,
          selectedItem,
          handleSelect: this.handleSelect
        })}
        onStateChange={this.handleStateChange}
      />
    );
  }
}

export default Downshift;
