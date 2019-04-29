import * as React from 'react';
import withAuthSync from '../src/hoc/withAuth';
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
export default withAuthSync(Page);
