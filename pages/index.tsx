/**
 * @fileoverview フォームテスト
 */
import React, { useContext, useEffect } from 'react';

import { connect } from 'react-redux';
import Router from 'next/router';
import { NextPage } from 'next';
import { Dispatch } from 'redux';
import { RootAction } from '../src/redux/actions';
import usePrevious from '../src/hooks/usePrevious';

import { IUserDTO } from '../src/models/User';

import { RootState } from '../src/redux/reducers';
import * as usersSelector from '../src/redux/selectors/users';

import NotificationContext from '../src/components/NotificationContext';
import TokenContext from '../src/components/TokenContext';
import TestForm from '../src/components/TestForm2';

import {
  fetch as fetchUser,
  create as createUser
} from '../src/redux/actions/users';

import withRoot from '../src/hoc/withRoot';

const mapStateToProps = (state: RootState) => ({
  fetchStatus: usersSelector.getFetchStatus(state)
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  submit: (token: string) => (data: IUserDTO) =>
    dispatch(createUser(data, token))
});

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

// Props
interface Props {}

const Page: NextPage<Props & ReduxType> = (props: Props & ReduxType) => {
  const { submit, fetchStatus } = props;
  const { addNotification } = useContext(NotificationContext);
  const token = useContext(TokenContext);

  const prevFetchStatus = usePrevious(fetchStatus);

  // メッセージを表示するEffect Hook
  useEffect(() => {
    if (prevFetchStatus !== undefined) {
      if (prevFetchStatus.saving && !fetchStatus.saving && fetchStatus.saved) {
        addNotification({
          level: 'success',
          title: '送信成功',
          message: '送信成功しました'
        });
        Router.push('/');
      }
    }
  }, [addNotification, fetchStatus, prevFetchStatus]);

  return (
    <>
      <TestForm
        initialUserId={1}
        initialBeginDate={new Date()}
        submit={submit(token)}
      />
    </>
  );
};
Page.getInitialProps = async ({ store }: any) => {
  store.dispatch(fetchUser());
  return {} as Props & ReduxType;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot({ permissions: ['VIEW'] })(Page));
