/**
 * @fileoverview フォームテスト
 */
import React, { useContext, useEffect } from 'react';

import { connect } from 'react-redux';
import Router from 'next/router';
import { NextPage } from 'next';
import usePrevious from '../src/hooks/usePrevious';

import { RootState } from '../src/redux/reducers';
import * as usersSelector from '../src/redux/selectors/users';

import NotificationContext from '../src/components/NotificationContext';
import TestForm from '../src/components/TestForm';

import { fetch as fetchUsers } from '../src/redux/actions/users';

import withRoot from '../src/hoc/withRoot';

const mapStateToProps = (state: RootState) => ({
  fetchStatus: usersSelector.getFetchStatus(state)
});

type ReduxType = ReturnType<typeof mapStateToProps>;

// Props
interface Props {}

const Page: NextPage<Props & ReduxType> = (props: Props & ReduxType) => {
  const { addNotification } = useContext(NotificationContext);

  const { fetchStatus } = props;
  const prevFetchStatus = usePrevious(fetchStatus);

  useEffect(() => {
    if (prevFetchStatus !== undefined) {
      if (prevFetchStatus.submitting && !fetchStatus.submitting) {
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
    <TestForm
      initialUserId={1}
      initialBeginDate={new Date()}
      submit={(value: any) => {
        console.log(JSON.stringify(value));
      }}
    />
  );
};
Page.getInitialProps = async ({ store }: any) => {
  store.dispatch(fetchUsers());
  return {} as Props & ReduxType;
};

export default connect(mapStateToProps)(
  withRoot({ permissions: ['VIEW'] })(Page)
);
