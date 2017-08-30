import React from 'react';
import Document, { Head, Main, NextScript, } from 'next/document';
import { renderToSheetList, } from 'fela-dom';
import styleRenderer from './components/StyleProvider/renderer';

/**
 * This Document subclass should be re-exported as the default export in the
 * `pages/_document.js` file of a Next.js app.
 */
export default class HaaretzDocument extends Document {
  static getInitialProps({ renderPage, }) {
    const page = renderPage();
    const sheetList = renderToSheetList(styleRenderer);
    styleRenderer.clear();

    return { ...page, sheetList, };
  }

  renderStyles() {
    return this.props.sheetList.map(({ type, media, css, }) =>
      (<style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: css, }}
        data-fela-type={type}
        key={`${type}-${media}`}
        media={media}
      />)
    );
  }

  render() {
    return (
      <html lang={this.props.lang}>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          {this.renderStyles()}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
