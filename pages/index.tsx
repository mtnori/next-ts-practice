/**
 * @fileoverview フォームテスト
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { Dispatch } from 'redux';
import { CompanyRecord } from '../src/redux/models/Company';
import withRoot from '../src/hoc/withRoot';
import TestForm from '../src/components/TestForm';
import CompaniesActionDispatcher from '../src/redux/dispatchers/CompaniesActionDispatcher';
import companiesSelector from '../src/redux/selectors/companies';

import { InjectedProps as AuthInjectedProps } from '../src/hoc/withAuth';
import { InjectedProps as PermissionInjectedProps } from '../src/hoc/withPermission';
import { StateMap } from '../src/redux/State';

// Props
interface Props extends AuthInjectedProps, PermissionInjectedProps {
  companies: List<CompanyRecord>;
  companiesActions: CompaniesActionDispatcher;
}

const Page: React.FC<Props> = (props: Props) => {
  const { companies, companiesActions } = props;
  console.log(companies);
  return (
    <TestForm
      initialCompanyId={1}
      initialBeginDate={new Date()}
      submit={value => {
        console.log(JSON.stringify(value));
      }}
      companiesActions={companiesActions}
    />
  );
};

const mapStateToProps = (state: StateMap) => ({
  companies: companiesSelector.getCompaniesResult(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  companiesActions: new CompaniesActionDispatcher(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot({ permissions: ['VIEW'] })(Page));
