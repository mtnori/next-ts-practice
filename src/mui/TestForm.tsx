/**
 * @fileoverview Form component for mui formik wrapper
 */
import * as React from 'react';

import { Field, withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';

import Downshift from './Downshift';

export interface FormValues {
  companyId: number | null;
}

export interface OtherProps {
  submit: (values: FormValues) => void;
}

const items = [
  {
    label: 'aaa',
    value: 1
  },
  {
    label: 'bbb',
    value: 2
  }
];

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { setFieldValue, handleSubmit, values, touched, errors } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="companyId"
        label="企業名"
        component={Downshift}
        items={items}
        setFieldValue={setFieldValue}
        getInputProps={() => ({
          helperText: 'Helper Text',
          error: true // trueにしても処理が上書きされているので使えない
        })}
      />
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
    companyId: initialCompanyId
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
