import * as React from 'react';
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps
} from '@material-ui/core/TextField';

type TextFieldProps = MuiTextFieldProps & { dateValue: Date };

export const fieldToTextField = ({
  dateValue,
  ...props
}: TextFieldProps): MuiTextFieldProps => {
  return {
    ...props,
    value: dateValue.toString()
  };
};

const TextField: React.ComponentType<TextFieldProps> = (
  props: TextFieldProps
) => <MuiTextField {...fieldToTextField(props)} />;
export default TextField;
