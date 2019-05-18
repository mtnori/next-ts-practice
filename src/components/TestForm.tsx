/**
 * @fileoverview Form component with Formik, react-redux connect and Material UI styles
 */
import React, { useContext, useEffect, useRef } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Field, withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';

import { RootState } from '../redux/reducers';
import { RootAction } from '../redux/actions';
import * as usersSelector from '../redux/selectors/users';
import * as actions from '../redux/actions/users';

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
  getUsers: () => dispatch(actions.fetch())
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
 * 親から受け取ったPropsの内、InnerForm内で利用するProps
 */
export interface OtherProps {}

const itemsToMenuItems = (items: { label: string; value: any }[]) =>
  items.map(item => (
    <MenuItem key={item.value} value={item.value}>
      {item.label}
    </MenuItem>
  ));

const InnerForm = (
  props: OtherProps & FormikProps<FormValues> & StyleProps & ReduxProps
) => {
  const {
    handleSubmit,
    values,
    touched,
    errors,
    users,
    getUsers,
    classes
  } = props;

  // Contextから取得する
  const { addNotification } = useContext(NotificationContext);
  const token = useContext(TokenContext);

  const numberParser = (value: any) => value || null;

  const isInitialMount = useRef(true);

  // Effect Hooks
  // 直接store.dispatchへはアクセスできないので、connect経由でpropsへinjectする
  useEffect(() => {
    async function fetchData() {
      getUsers();
    }
    // componentDidUpdateと同じ動作にする
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchData();
      // メッセージを発火させる
      addNotification({ message: 'Redux SagaのTaskがFire', level: 'success' });
    }
  }, [addNotification, getUsers, values.userId]);

  return (
    <Paper className={classes.container}>
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
        <div>{`Token:${token}`}</div>
        <Button type="submit" variant="contained">
          送信
        </Button>
      </form>
    </Paper>
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

const formikEnhancer = withFormik<
  MyFormProps & ReduxProps & WithStyles,
  FormValues
>({
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
    console.log('submitted');
    setTimeout(() => {
      props.submit(values);
      setSubmitting(false);
    }, 1000);
  }
});

// OK
// export const Form2 = withStyles(styles)(InnerForm);

// OK
// export const Form3 = withStyles(styles)(formikEnhancer(InnerForm));

// OK
// 最初にwithFormikを呼ぶこと
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(formikEnhancer(InnerForm)));

// NG
// withStylesはStylePropsを削除したcomponentを返すのでマッチしない
// export const Form4 = formikEnhancer(withStyles(styles)(InnerForm));

// NG
/*
export const Form5 = formikEnhancer(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(InnerForm))
);
 */

// OK
// export default formikEnhancer(InnerForm);
