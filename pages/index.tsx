/**
 * @fileoverview フォームテスト
 */
import * as React from 'react';
import withRoot from '../src/hoc/withRoot';
import TestForm from '../src/components/TestForm';
import { InjectedProps as AuthInjectedProps } from '../src/hoc/withAuth';
import { InjectedProps as PermissionInjectedProps } from '../src/hoc/withPermission';

// Props
interface Props extends AuthInjectedProps, PermissionInjectedProps {}

const Page: React.FC<Props> = () => (
  <>
    <TestForm
      initialCompanyId={1}
      initialBeginDate={new Date()}
      submit={value => {
        console.log(JSON.stringify(value));
      }}
    />
  </>
);
export default withRoot({ permissions: ['VIEW'] })(Page);
