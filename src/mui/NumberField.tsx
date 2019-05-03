/**
 * @fileoverview 数値入力のためのTextField
 */
import * as React from 'react';

import MuiTextField from '@material-ui/core/TextField';
import {
  fieldToTextField,
  TextFieldProps as MuiTextFieldProps
} from 'formik-material-ui';

interface NumberFieldProps extends MuiTextFieldProps {}

const NumberField: React.FC<NumberFieldProps> = (props: NumberFieldProps) => {
  const {
    field: { name, value }
  } = props;

  const onChange = async (event: any) => {
    // 文字列で値が入ってくるので、Numberに変更して、Formikのvaluesへ格納する
    const { value: newValue } = event.target;
    const parseValue = newValue ? Number(newValue) : null;
    props.form.setFieldValue(name, parseValue);
  };

  return (
    <MuiTextField
      {...fieldToTextField(props)}
      type="number"
      onChange={onChange}
      value={value === null ? '' : value}
    />
  );
};
export default NumberField;
