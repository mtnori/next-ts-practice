/**
 * @fileoverview Enhancerパターン(FunctionComponent)
 */
import * as React from 'react';

interface WithLoadingProps {
  loading: boolean;
}

const withLoading = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithLoadingProps> => ({
  loading,
  ...props
}: WithLoadingProps) =>
  loading ? <span>Loading...</span> : <Component {...props as P} />;
export default withLoading;
