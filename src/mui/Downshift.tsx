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
  setFieldValue: any;
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
  setFieldValue,
  getInputProps,
  ...props
}: DownshiftProps): MuiDownshiftProps => {
  // 選択変更された場合、FormikのvalueとinputValueを両方更新する
  const onSelect = (item: { label: string; value: any } | null) => {
    if (item) {
      setFieldValue(field.name, item.value);
    } else {
      setFieldValue(field.name, null);
    }
  };

  const { name } = field;
  const { touched, errors, isSubmitting } = form;

  const fieldError = getIn(errors, name);
  const showError = getIn(touched, name) && !!fieldError;

  // valueとonChangeは使わないのでOmitしておく
  // Inputのvalueは表示にしか使わないので、stateのinputValue値が入る
  // Inputからstateを変化させてはいけないので、onChangeは不要
  const restField = _.omit(field, 'onChange', 'value');
  // Inputコンポーネント部分に適用されるProps
  const inputProps = getInputProps ? getInputProps() : {};

  return {
    ...props,
    items,
    onSelect,
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
}

class Downshift extends React.Component<DownshiftProps, State> {
  constructor(props: DownshiftProps) {
    super(props);
    this.state = {
      filteredItems: props.items
    };
  }

  handleStateChange = (changes: any) => {
    const { items } = this.props;
    if (typeof changes.inputValue === 'string') {
      const filteredItems = items.filter(item =>
        item.label.toLowerCase().includes(changes.inputValue.toLowerCase())
      );
      this.setState({ filteredItems });
    }
  };

  render() {
    // itemsはフィルタした値を渡す
    const { filteredItems } = this.state;

    // Formikのvalueから初期値を取得する
    const {
      field: { value }
    } = this.props;

    const defaultSelectedItem = filteredItems.find(
      item => item.value === value
    );

    return (
      <MuiDownshift
        {...fieldToDownshift({
          ...this.props,
          defaultSelectedItem,
          items: filteredItems,
          onStateChange: this.handleStateChange
        })}
      />
    );
  }
}

export default Downshift;
