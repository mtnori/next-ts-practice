/**
 * @fileoverview AppBar HOC
 */
import * as React from 'react';
import { NextComponentType } from 'next';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';

import { logout } from './withAuth';

const styles = createStyles({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

interface OriginalProps {
  auth?: {
    username: string;
    permissions: string[];
  };
}
export interface WrapperProps extends WithStyles<typeof styles> {}

// Gets the display name of a JSX component for dev tools
const getDisplayName = (Component: any) =>
  Component.displayName || Component.name || 'Component';

const withAppBar = <P extends OriginalProps>(
  WrappedComponent: NextComponentType<P, any, any>
) =>
  class WithAppBar extends React.Component<P & WrapperProps> {
    static displayName = `withAppBar(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx: any) {
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps };
    }

    state = {
      anchorEl: null
    };

    handleMenu = (event: any) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    handleLogout = () => {
      logout();
      this.setState({ anchorEl: null });
    };

    handleClose = () => {
      this.setState({ anchorEl: null });
    };

    render() {
      const { classes, ...props } = this.props;
      const { anchorEl } = this.state;
      const open = Boolean(anchorEl);

      return (
        <>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Title
              </Typography>
              {props.auth && (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleLogout}>ログアウト</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
          <WrappedComponent {...props as P} />
        </>
      );
    }
  };

// TODO どうしても型が一致しないのでanyで回避している
export default (component: NextComponentType<any, any, any>) =>
  withStyles(styles)(withAppBar(component));
