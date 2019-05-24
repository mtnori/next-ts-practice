/**
 * @fileoverview Form component with Formik, react-redux connect and Material UI styles
 */
import React, { useContext, useEffect, useRef } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import {
  Field,
  FieldProps,
  Formik,
  Form,
  FormikProps,
  FormikActions
} from 'formik';
import * as Yup from 'yup';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';

import { IUserDTO } from '../models/User';
import { RootState } from '../redux/reducers';
import { RootAction } from '../redux/actions';
import * as usersSelector from '../redux/selectors/users';
import * as usersActions from '../redux/actions/users';

import NotificationContext from './NotificationContext';
import TokenContext from './TokenContext';

import TextField from '../mui/TextField';
import NumberField from '../mui/NumberField';
import DatePicker from '../mui/DatePicker';
import Downshift from '../mui/Downshift';

/**
 * Styles
 */
const styles = createStyles({
  container: {
    padding: 10
  }
});

/**
 * Style Props
 */
type StyleProps = WithStyles<typeof styles>;

/**
 * Redux
 */
const mapStateToProps = (state: RootState) => ({
  users: usersSelector.getUsersItem(state)
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  getUsers: () => dispatch(usersActions.fetch())
});

/**
 * Redux Props
 */
type ReduxProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

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
 * 外から見えるProps
 */
interface MyFormProps {
  initialUserId: number | null;
  initialBeginDate: Date | null;
  submit: (data: IUserDTO) => void;
}

const itemsToMenuItems = (items: { label: string; value: any }[]) =>
  items.map(item => (
    <MenuItem key={item.value} value={item.value}>
      {item.label}
    </MenuItem>
  ));

const InnerForm = (
  props: MyFormProps & FormikProps<FormValues> & StyleProps & ReduxProps
) => {
  const { values, touched, errors, users, getUsers, classes } = props;

  // Contextから取得する
  const { addNotification } = useContext(NotificationContext);
  const token = useContext(TokenContext);

  const numberParser = (value: any) => value || null;

  const isInitialMount = useRef(true);

  // componentDidMountと同じ動作
  /*
  useEffect(() => {
    async function fetchData() {
      getUsers();
    }
    fetchData();
  }, [getUsers]);
   */

  // Effect Hooks
  // 直接store.dispatchへはアクセスできないので、connect経由でpropsへinjectする
  useEffect(() => {
    async function fetchData() {
      getUsers();
    }
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // componentDidUpdateと同じ動作にする
      fetchData();
      // メッセージを発火させる
      addNotification({ message: 'Redux SagaのTaskがFire', level: 'success' });
    }
  }, [addNotification, getUsers, values.userId]);

  return (
    <Paper className={classes.container}>
      <Form>
        {/* Downshift */}
        <Field name="userId">
          {({ field, form }: FieldProps) => (
            <Downshift
              field={field}
              form={form}
              items={users}
              getInputProps={() => ({
                helperText: 'Helper Text',
                required: true,
                label: 'Downshift'
              })}
            />
          )}
        </Field>
        <Field
          name="userId"
          label="Select"
          variant="standard"
          select
          InputLabelProps={{ shrink: true }}
          required
          parse={numberParser}
          component={TextField}
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
        <div>{`Token:${token}`}</div>
        <Button type="submit" variant="contained">
          送信
        </Button>
      </Form>
    </Paper>
  );
};

const TestForm = (props: MyFormProps & ReduxProps & WithStyles) => {
  const { initialUserId, initialBeginDate, submit } = props;
  return (
    <Formik
      initialValues={{
        userId: initialUserId,
        beginDate: initialBeginDate,
        selectValue: initialUserId,
        numberInput: null
      }}
      validationSchema={Yup.object().shape({
        userId: Yup.number()
          .nullable()
          .required('必須です'),
        beginDate: Yup.date()
          .nullable()
          .required('必須です')
      })}
      onSubmit={(_: FormValues, actions: FormikActions<FormValues>) => {
        setTimeout(() => {
          submit({ id: null, name: '' });
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(formikBag: FormikProps<FormValues>) => (
        <InnerForm {...formikBag} {...props} />
      )}
    </Formik>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TestForm));
