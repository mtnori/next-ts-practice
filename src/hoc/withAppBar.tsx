/**
 * @fileoverview AppBar HOC
 */
import * as React from 'react';
import { NextComponentType } from 'next';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Gets the display name of a JSX component for dev tools
const getDisplayName = (Component: any) =>
  Component.displayName || Component.name || 'Component';

const withAppBar = <P extends object>(
  WrappedComponent: NextComponentType<P, any, any>
): NextComponentType<P, any, any> =>
  class extends React.Component<P> {
    static displayName = `withAppBar(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx: any) {
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps };
    }

    render() {
      return (
        <>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Title
              </Typography>
            </Toolbar>
          </AppBar>
          <WrappedComponent {...this.props as P} />
        </>
      );
    }
  };
export default withAppBar;
