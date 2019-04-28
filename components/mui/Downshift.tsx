/**
 * @fileoverview FormikとMuiDownshiftのラッパー
 */
import * as React from 'react';
import _ from 'lodash';
import { FieldProps } from 'formik';
import MuiDownshift, { MuiDownshiftProps } from 'mui-downshift';

export interface DownshiftProps extends FieldProps, MuiDownshiftProps {
  filterInput: string;
  setFieldValue: any;
  selectedItem: { label: string; value: any } | null;
  handleSelect: (item: { label: string; value: any } | null) => void;
}

export const fieldToDownshift = ({
  field,
  form: { isSubmitting },
  items = [],
  disabled = false,
  filterInput,
  setFieldValue,
  selectedItem,
  handleSelect,
  ...props
}: DownshiftProps): MuiDownshiftProps => {
  // 選択変更された場合、Formikのvalueを更新する
  const onSelect = (item: { label: string; value: any } | null) => {
    if (item) {
      handleSelect(item);
      setFieldValue(field.name, item.value);
    } else {
      handleSelect(null);
      setFieldValue(field.name, null);
    }
  };

  const restField = _.omit(field, 'onChange', 'onBlur', 'value');

  return {
    items,
    selectedItem,
    onSelect,
    getInputProps: () => ({
      ...restField,
      ...props,
      value: filterInput,
      disabled: isSubmitting || disabled
    })
  };
};

interface State {
  selectedItem: { label: string; value: any } | null; // 現在選択されているアイテム
  filteredItems: Array<{ label: string; value: any }>[]; // フィルタされたアイテムリスト
  filterInput: string; // 入力項目値
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
      filterInput: selectedItem ? selectedItem.label : ''
    };
  }

  handleStateChange = (changes: any) => {
    const { items } = this.props;
    if (typeof changes.inputValue === 'string') {
      const filteredItems = items.filter(item =>
        item.label.toLowerCase().includes(changes.inputValue.toLowerCase())
      );
      this.setState({ filteredItems, filterInput: changes.inputValue });
    }
  };

  /**
   * アイテムを選択したときのState変更処理
   */
  handleSelect = (item: { label: string; value: any } | null) => {
    this.setState({
      selectedItem: item,
      filterInput: item ? item.label : ''
    });
  };

  render() {
    // itemsはフィルタした値を渡す
    const { filteredItems, filterInput, selectedItem } = this.state;
    return (
      <MuiDownshift
        {...fieldToDownshift({
          ...this.props,
          items: filteredItems,
          filterInput,
          selectedItem,
          handleSelect: this.handleSelect
        })}
        onStateChange={this.handleStateChange}
      />
    );
  }
}

export default Downshift;
