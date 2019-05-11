/**
 * @fileoverview フォームテスト
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';

import { Company } from '../src/models/Company';
import withRoot from '../src/hoc/withRoot';
import TestForm from '../src/components/TestForm';
import companiesSelector from '../src/redux/selectors/companies';

import { InjectedProps as AuthInjectedProps } from '../src/hoc/withAuth';
import { InjectedProps as PermissionInjectedProps } from '../src/hoc/withPermission';

// Props
interface Props extends AuthInjectedProps, PermissionInjectedProps {
  companies: Company[];
}

const Page: React.FC<Props> = (props: Props) => {
  const { companies } = props;
  console.log(companies);
  return (
    <TestForm
      initialCompanyId={1}
      initialBeginDate={new Date()}
      submit={value => {
        console.log(JSON.stringify(value));
      }}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  companies: companiesSelector.getCompaniesResult(state)
});

export default connect(mapStateToProps)(
  withRoot({ permissions: ['VIEW'] })(Page)
);
