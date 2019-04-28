import * as React from 'react';
import TestForm from '../components/mui/TestForm';

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
export default Page;
