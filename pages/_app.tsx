import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { serialize, deserialize } from 'json-immutable';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';

import DateFnsUtils from '@date-io/date-fns';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import jaLocale from 'date-fns/locale/ja';

import getPageContext from '../src/getPageContext';
import makeStore from '../src/redux/store';

class MyApp extends App<any> {
  constructor(props: any, context: any) {
    super(props, context);
    this.pageContext = getPageContext();
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

  pageContext: any;

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
                <Component pageContext={this.pageContext} {...pageProps} />
              </MuiThemeProvider>
            </JssProvider>
          </MuiPickersUtilsProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore, {
  serializeState: (state: any) => serialize(state),
  deserializeState: (state: any) => (state ? deserialize(state) : state)
})(MyApp);
