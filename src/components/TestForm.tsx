/**
 * @fileoverview Form component for mui formik wrapper
 */
import * as React from 'react';

import { Field, withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';

import MenuItem from '@material-ui/core/MenuItem';
import { TextField } from 'formik-material-ui';
import Downshift from '../mui/Downshift';

export interface FormValues {
  companyId: number | null;
  selectValue: number | null;
}

export interface OtherProps {
  submit: (values: FormValues) => void;
}

const companies = [
  {
    label: 'aaa',
    value: 1
  },
  {
    label: 'bbb',
    value: 2
  }
];

const itemsToMenuItems = (items: { label: string; value: any }[]) =>
  items.map(item => (
    <MenuItem key={item.value} value={item.value}>
      {item.label}
    </MenuItem>
  ));

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { setFieldValue, handleSubmit, values, touched, errors } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="companyId"
        component={Downshift}
        items={companies}
        setFieldValue={setFieldValue}
        getInputProps={() => ({
          helperText: 'Helper Text',
          required: true,
          label: 'Downshift'
        })}
      />
      <Field
        name="selectValue"
        label="Select"
        select
        component={TextField}
        InputLabelProps={{ shrink: true }}
        required
      >
        {itemsToMenuItems(companies)}
      </Field>
      <div>{JSON.stringify(values)}</div>
      <div>{JSON.stringify(touched)}</div>
      <div>{JSON.stringify(errors)}</div>
    </form>
  );
};

interface MyFormProps {
  initialCompanyId: number | null;
  submit: (values: FormValues) => void;
}

const TestForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: ({ initialCompanyId }) => ({
    companyId: initialCompanyId,
    selectValue: initialCompanyId
  }),
  validationSchema: Yup.object().shape({
    companyId: Yup.number()
      .nullable()
      .required('必須です')
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setTimeout(() => {
      props.submit(values);
      setSubmitting(false);
    }, 1000);
  }
})(InnerForm);

export default TestForm;
