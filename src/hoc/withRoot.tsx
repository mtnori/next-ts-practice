/**
 * @fileoverview ページ単位で使うHOCをまとめる(recomponseは使わない)
 */
import { NextComponentType } from 'next';

import withPermission, {
  Options,
  InjectedProps as PermissionInjectedProps
} from './withPermission';
import withAuthSync, { InjectedProps as AuthInjectedProps } from './withAuth';
import withAppBar from './withAppBar';

// 各HOCのInjectedPropsをまとめる
interface InjectedProps extends AuthInjectedProps, PermissionInjectedProps {}

const withRoot = ({ permissions = [] }: Options) => <P extends InjectedProps>(
  WrappedComponent: NextComponentType<P, any, any>
) =>
  withAppBar(withPermission({ permissions })(withAuthSync(WrappedComponent)));
export default withRoot;
