/**
 * @fileoverview Form component for mui formik wrapper
 */
import * as React from 'react';

import { Field, withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '../mui/TextField';
import DatePicker from '../mui/DatePicker';
import Downshift from '../mui/Downshift';
import CompaniesActionDispatcher from '../redux/dispatchers/CompaniesActionDispatcher';

/**
 * Formikのvalues
 */
export interface FormValues {
  companyId: number | null;
  beginDate: Date | null;
  selectValue: number | null;
}

/**
 * そのほかのProps
 */
export interface OtherProps {
  submit: (values: FormValues) => void;
  companiesActions: CompaniesActionDispatcher;
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
  const { handleSubmit, values, touched, errors, companiesActions } = props;

  const numberParser = (value: any) => value || null;

  // Effect Hooks
  React.useEffect(() => {
    async function fetchData() {
      await companiesActions.getCompanies();
    }
    fetchData();
    console.log('hooks');
  }, [companiesActions, values.companyId]);

  return (
    <form onSubmit={handleSubmit}>
      {/* Downshift */}
      <Field
        name="companyId"
        component={Downshift}
        items={companies}
        getInputProps={() => ({
          helperText: 'Helper Text',
          required: true,
          label: 'Downshift'
        })}
      />
      <Field
        name="companyId"
        label="Select"
        select
        component={TextField}
        InputLabelProps={{ shrink: true }}
        required
        parse={numberParser}
      >
        <MenuItem value="">なし</MenuItem>
        {itemsToMenuItems(companies)}
      </Field>
      {/* Select */}
      <Field
        name="selectValue"
        label="Select"
        select
        component={TextField}
        required
        parse={numberParser}
      >
        <MenuItem value="">なし</MenuItem>
        {itemsToMenuItems(companies)}
      </Field>
      {/* DatePicker */}
      <Field
        name="beginDate"
        label="BeginDate"
        component={DatePicker}
        required
      />
      <div>{JSON.stringify(values)}</div>
      <div>{JSON.stringify(touched)}</div>
      <div>{JSON.stringify(errors)}</div>
    </form>
  );
};

/**
 * 外から見えるProps
 */
interface MyFormProps {
  initialCompanyId: number | null;
  initialBeginDate: Date | null;
  companiesActions: CompaniesActionDispatcher;
  submit: (values: FormValues) => void;
}

const TestForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: ({ initialCompanyId, initialBeginDate }) => ({
    companyId: initialCompanyId,
    beginDate: initialBeginDate,
    selectValue: initialCompanyId
  }),
  validationSchema: Yup.object().shape({
    companyId: Yup.number()
      .nullable()
      .required('必須です'),
    beginDate: Yup.date()
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
