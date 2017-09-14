import React from 'react';
import Document, { Head, Main, NextScript, } from 'next/document';
import { renderToSheetList, } from 'fela-dom';
import config from 'config';
import serialize from 'serialize-javascript';

/**
 * The returned class should be exported as the default export in the
 * `pages/_document.js` file of a Next.js app.
 *
 * @param {object} styleRenderer - a react-fela renderer
 * @param {object} appData - An application data object, defaults to just having
 *                           a `config` field with data from the `config` module.
 *
 * @return {class} A Next.js `document` component
 */
const createDocument = (styleRenderer, appData = { config, }) =>
  class HaaretzDocument extends Document {
    static getInitialProps({ renderPage, }) {
      const page = renderPage();
      const sheetList = renderToSheetList(styleRenderer);
      styleRenderer.clear();

      return {
        ...page,
        sheetList,
        appData,
      };
    }

    renderStyles() {
      return this.props.sheetList.map(({ type, media, css, }) => (
        <style
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: css, }}
          data-fela-type={type}
          key={`${type}-${media}`}
          media={media}
        />
      ));
    }

    renderData() {
      return (
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `__HTZ_DATA__ = ${serialize(this.props.appData)};`,
          }}
        />
      );
    }

    render() {
      return (
        <html lang={this.props.lang} dir={this.props.isRtl ? 'rtl' : 'ltr'}>
          <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <link rel="shortcut icon" href="about:blank"/>
            {this.renderStyles()}
            {this.renderData()}
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </html>
      );
    }
  };

export default createDocument;
