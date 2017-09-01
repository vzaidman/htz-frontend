import React from 'react';
import Document, { Head, Main, NextScript, } from 'next/document';
import { renderToSheetList, } from 'fela-dom';

/**
 * The returned class should be exported as the default export in the
 * `pages/_document.js` file of a Next.js app.
 *
 * @param {object} styleRenderer - a react-fela renderer
 *
 * @return {class} A Next.js `document` component
 */
const createDocument = styleRenderer =>
  class HaaretzDocument extends Document {
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
        <html lang={this.props.lang} direction={this.props.isRtl ? 'rtl' : 'ltr'}>
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
  };

export default createDocument;
