/**
 * @fileoverview フォームテスト
 */
import React from 'react';

import { connect } from 'react-redux';

import { RootState } from '../src/redux/reducers';

import withRoot from '../src/hoc/withRoot';
import * as usersSelector from '../src/redux/selectors/users';

import TestForm from '../src/components/TestForm';

const mapStateToProps = (state: RootState) => ({
  users: usersSelector.getUsers(state)
});

type ReduxType = ReturnType<typeof mapStateToProps>;

// Props
interface Props {}

const Page = (props: Props & ReduxType) => {
  const { users } = props;
  console.log(users);
  return (
    <TestForm
      initialUserId={1}
      initialBeginDate={new Date()}
      submit={(value: any) => {
        console.log(JSON.stringify(value));
      }}
    />
  );
};

export default connect(mapStateToProps)(
  withRoot({ permissions: ['VIEW'] })(Page)
);
