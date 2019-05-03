/**
 * @fileoverview Propsを追加して拡張したTextField
 */
import * as React from 'react';

import MuiTextField from '@material-ui/core/TextField';
import {
  fieldToTextField,
  TextFieldProps as MuiTextFieldProps
} from 'formik-material-ui';

interface TextFieldProps extends MuiTextFieldProps {
  parse?: (value: any) => any;
}

const TextField: React.FC<TextFieldProps> = ({
  parse,
  ...props
}: TextFieldProps) => {
  const {
    field: { name, value }
  } = props;

  const onChange = async (event: any) => {
    const { value: newValue } = event.target;
    const parseValue = parse ? parse(newValue) : value;
    props.form.setFieldValue(name, parseValue);
  };

  return (
    <MuiTextField
      {...fieldToTextField(props)}
      onChange={onChange}
      value={value || ''}
    />
  );
};
export default TextField;
