/**
 * @fileoverview Formik wrapper of DatePicker component
 */
import * as React from 'react';
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps
} from '@material-ui/pickers';
import { FieldProps, getIn } from 'formik';
import { Omit } from '../types';

export interface DatePickerProps
  extends FieldProps,
    Omit<MuiDatePickerProps, 'error' | 'name' | 'onChange' | 'value'> {}

export const fieldToDatePicker = ({
  field,
  form,
  disabled = false,
  format = 'yyyy/MM/dd',
  clearable = true,
  ...props
}: DatePickerProps): MuiDatePickerProps => {
  const { name } = field;
  const {
    touched,
    errors,
    isSubmitting,
    setFieldValue,
    setFieldTouched
  } = form;

  const fieldError = getIn(errors, name);
  const showError = getIn(touched, name) && !!fieldError;

  return {
    ...props,
    ...field,
    disabled: isSubmitting || disabled,
    format,
    clearable,
    error: showError,
    helperText: showError ? fieldError : props.helperText,
    onChange: value => {
      setFieldValue(name, value);
    },
    onOpen: () => {
      setFieldTouched(name);
    }
  };
};

const DatePicker: React.ComponentType<DatePickerProps> = (
  props: DatePickerProps
) => <MuiDatePicker {...fieldToDatePicker(props)} />;

DatePicker.displayName = 'FormikMaterialUIDatePicker';

export default DatePicker;
