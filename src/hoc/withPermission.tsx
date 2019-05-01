/**
 * @fileoverview Authorization HOC
 */
import * as React from 'react';
import nextCookie from 'next-cookies';
import { NextComponentType } from 'next';
import { Subtract } from 'utility-types';

import authAPI from '../api/auth';

export interface Options {
  permissions?: string[];
}

export interface InjectedProps {
  auth: {
    username: string;
    permissions: string[];
  };
}

interface State {
  isAuthorized: boolean;
}

// Gets the display name of a JSX component for dev tools
const getDisplayName = (Component: any) =>
  Component.displayName || Component.name || 'Component';

const withPermission = ({ permissions = [] }: Options) => <
  P extends InjectedProps
>(
  WrappedComponent: NextComponentType<P, any, any>
) =>
  class extends React.Component<Subtract<P, InjectedProps>, State> {
    static displayName = `withPermission(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx: any) {
      const { token } = nextCookie(ctx);
      const auth = token && (await authAPI.load(token));

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, auth };
    }

    constructor(props: P) {
      super(props);

      let isAuthorized = false;
      permissions.forEach(permission => {
        props.auth.permissions.forEach(authPermission => {
          if (authPermission === permission) {
            isAuthorized = true;
          }
        });
      });
      this.state = {
        isAuthorized
      };
    }

    render() {
      return <WrappedComponent {...this.props as P} />;
    }
  };

export default withPermission;
