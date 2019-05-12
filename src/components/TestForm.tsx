/**
 * @fileoverview Form component for mui formik wrapper
 */
import * as React from 'react';

import { Field, withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '../mui/TextField';
import NumberField from '../mui/NumberField';
import DatePicker from '../mui/DatePicker';
import Downshift from '../mui/Downshift';
import * as actions from '../redux/actions/users';

/**
 * Formikのvalues
 */
export interface FormValues {
  userId: number | null;
  beginDate: Date | null;
  selectValue: number | null;
  numberInput: number | null;
}

/**
 * そのほかのProps
 */
export interface OtherProps {
  submit: (values: FormValues) => void;
}

const users = [
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
  const { handleSubmit, values, touched, errors } = props;

  const numberParser = (value: any) => value || null;

  // Effect Hooks
  React.useEffect(() => {
    async function fetchData() {
      await actions.fetch();
    }
    fetchData();
    console.log('hooks');
  }, [values.userId]);

  return (
    <form onSubmit={handleSubmit}>
      {/* Downshift */}
      <Field
        name="userId"
        component={Downshift}
        items={users}
        getInputProps={() => ({
          helperText: 'Helper Text',
          required: true,
          label: 'Downshift'
        })}
      />
      <Field
        name="userId"
        label="Select"
        select
        component={TextField}
        InputLabelProps={{ shrink: true }}
        required
        parse={numberParser}
      >
        <MenuItem value="">なし</MenuItem>
        {itemsToMenuItems(users)}
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
        {itemsToMenuItems(users)}
      </Field>
      {/* DatePicker */}
      <Field
        name="beginDate"
        label="BeginDate"
        component={DatePicker}
        required
      />
      {/* NumberInput */}
      <Field name="numberInput" label="numerInput" component={NumberField} />
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
  initialUserId: number | null;
  initialBeginDate: Date | null;
  submit: (values: FormValues) => void;
}

const TestForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: ({ initialUserId, initialBeginDate }) => ({
    userId: initialUserId,
    beginDate: initialBeginDate,
    selectValue: initialUserId,
    numberInput: null
  }),
  validationSchema: Yup.object().shape({
    userId: Yup.number()
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
