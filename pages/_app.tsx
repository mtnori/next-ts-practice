import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';

// Redux
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

// Material UI
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';

// Material UI Pickers
import DateFnsUtils from '@date-io/date-fns';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import jaLocale from 'date-fns/locale/ja';

// NProgress
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';

// React notification sysmem
import NotificationSystem from 'react-notification-system';
import NotificationContext from '../src/components/NotificationContext';

import getPageContext from '../src/getPageContext';
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
    this.pageContext = getPageContext();
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

  pageContext: any;

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
            {/* Wrap every page in Jss and Theme providers */}
            <JssProvider
              registry={this.pageContext.sheetsRegistry}
              generateClassName={this.pageContext.generateClassName}
            >
              <MuiThemeProvider
                theme={this.pageContext.theme}
                sheetsManager={this.pageContext.sheetsManager}
              >
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                {/* Pass pageContext to the _document though the renderPage enhancer
                  to render collected styles on server-side. */}
                <NotificationContext.Provider
                  value={{ addNotification: this.addNotification }}
                >
                  <Component pageContext={this.pageContext} {...pageProps} />
                </NotificationContext.Provider>
              </MuiThemeProvider>
            </JssProvider>
          </MuiPickersUtilsProvider>
        </Provider>
        <NotificationSystem ref={this.notificationSystem} />
      </Container>
    );
  }
}

export default withRedux(makeStore)(withReduxSaga(MyApp));
