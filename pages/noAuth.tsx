import * as React from 'react';

import withRoot from '../src/hoc/withRoot';
import { InjectedProps as AuthInjectedProps } from '../src/hoc/withAuth';
import { InjectedProps as PermissionInjectedProps } from '../src/hoc/withPermission';

// Props
interface Props extends AuthInjectedProps, PermissionInjectedProps {}

const noAuth: React.FC<Props> = () => <p>ページを表示する権限がありません</p>;

export default withRoot({})(noAuth);
