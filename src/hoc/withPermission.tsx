/**
 * @fileoverview Authorization HOC
 */
import * as React from 'react';
import { NextComponentType } from 'next';

interface Options {
  permissions?: string[];
}

interface State {
  isAuthorized: boolean;
}

// Gets the display name of a JSX component for dev tools
const getDisplayName = (Component: any) =>
  Component.displayName || Component.name || 'Component';

const withPermission = ({ permissions = [] }: Options) => <P extends object>(
  WrappedComponent: NextComponentType<P, any, any>
) =>
  class extends React.Component<P, State> {
    static displayName = `withPermission(${getDisplayName(WrappedComponent)})`;

    state = {
      isAuthorized: false
    };

    static async getInitialProps(ctx: any) {
      // TODO
      // Auth stateへ認証情報を保存して、WrappedComponentへ渡す
      // withAppbar HOCでもpermissionを使うが、そっちはそっちでAPIを投げて取得する？
      // Auth.permissionsへ情報が含まれていればWrappedComponentを表示し、
      // そうでなければ権限なしページへ遷移させる
      // Stateに持たせて処理したい
      // 一旦、Reduxに持たせて引っ張ってくるのは面倒・・・
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps };
    }

    render() {
      return <WrappedComponent {...this.props as P} />;
    }
  };
export default withPermission;
