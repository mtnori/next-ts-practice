/**
 * @fileoverview ページ単位で使うHOCをまとめる(recomponseは使わない)
 */
import { NextComponentType } from 'next';

import withPermission, { Options } from './withPermission';
import withAuthSync from './withAuth';
import withAppBar from './withAppBar';

const withRoot = ({ permissions = [] }: Options) => <P extends {}>(
  WrappedComponent: NextComponentType<P, any, any>
) =>
  withAuthSync(withPermission({ permissions })(withAppBar(WrappedComponent)));

export default withRoot;
