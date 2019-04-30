/**
 * @fileoverview フォームテスト
 */
import * as React from 'react';
import withRoot from '../src/hoc/withRoot';
import TestForm from '../src/mui/TestForm';

const Page: React.FC = () => (
  <>
    <TestForm
      initialCompanyId={1}
      submit={value => {
        console.log(JSON.stringify(value));
      }}
    />
  </>
);
export default withRoot({})(Page);
