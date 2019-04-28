import * as React from 'react';
import { Field, withFormik, FormikProps } from 'formik';
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
  const { setFieldValue, handleSubmit, values } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="companyId"
        label="企業名"
        component={Downshift}
        items={items}
        setFieldValue={setFieldValue}
      />
      <div>{JSON.stringify(values)}</div>
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
  handleSubmit: (values, { props, setSubmitting }) => {
    setTimeout(() => {
      props.submit(values);
      setSubmitting(false);
    }, 1000);
  }
})(InnerForm);

export default TestForm;
