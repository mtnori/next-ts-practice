import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';

// Redux
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

// Material UI
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Material UI Pickers
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import jaLocale from 'date-fns/locale/ja';

// NProgress
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';

// React notification sysmem
import NotificationSystem from 'react-notification-system';
import theme from '../src/theme';
import NotificationContext from '../src/components/NotificationContext';

import makeStore from '../src/redux/store';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// MyApp
class MyApp extends App<any> {
  constructor(props: any, context: any) {
    super(props, context);
    this.notificationSystem = React.createRef<NotificationSystem.System>();
  }

  static async getInitialProps({ Component, ctx }: any) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  addNotification = (notification: NotificationSystem.Notification) => {
    const notificationSystem = this.notificationSystem.current;
    if (notificationSystem) {
      notificationSystem.addNotification(notification);
    }
  };

  notificationSystem: React.RefObject<NotificationSystem.System>;

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        <Provider store={store}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <NotificationContext.Provider
                value={{ addNotification: this.addNotification }}
              >
                <Component {...pageProps} />
              </NotificationContext.Provider>
            </ThemeProvider>
          </MuiPickersUtilsProvider>
        </Provider>
        <NotificationSystem ref={this.notificationSystem} />
      </Container>
    );
  }
}

export default withRedux(makeStore)(withReduxSaga(MyApp));
