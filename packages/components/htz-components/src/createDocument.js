import React from 'react';
import Document, { Head, Main, NextScript, } from 'next/document';
import { renderToSheetList, } from 'fela-dom';
import config from 'config';
import serialize from 'serialize-javascript';
import SEO from './components/SEO/SEO';
import criticalFontLoader from './utils/criticalFontLoader';


const polyFillSrc = 'https://cdn.polyfill.io/v2/polyfill.js?features=default,Object.entries,Array.prototype.entries,fetch,IntersectionObserver,Array.prototype.find,Array.prototype.includes,Function.name,Array.prototype.@@iterator&flags=gated';

/**
 * The returned class should be exported as the default export in the
 * `pages/_document.js` file of a Next.js app.
 *
 * @param {object} options
 * @param {object} options.styleRenderer
 *   a react-fela renderer
 * @param {string|string[]} options.staticRules
 *   css string (or an array of) for Fela to render with `renderStatic`
 * @param {Component} options.StyleProvider
 *   The Fela style provider used in the app
 * @param {object} options.theme
 *   The Fela theme used in the app
 * @param {object} options.appData
 *   An application data object, defaults to just having
 *   a `config` field with data from the `config` module.
 *
 * @return {class} A Next.js `document` component
 */
const createDocument = ({
  styleRenderer,
  FelaProvider,
  theme,
  staticRules = '',
  appData = { config, },
  isRtl,
  lang,
  hasToggleableTheme = false,
  fontStacks,
}) => class HaaretzDocument extends Document {
  static getInitialProps({ renderPage, req, }) {
    const host = req.hostname.match(/^(?:.*?\.)?(.*)/i)[1];
    const validatedTheme = hasToggleableTheme ? theme(host) : theme;
    const varifiedStaticRules = hasToggleableTheme ? staticRules(host) : staticRules;

    if (varifiedStaticRules) {
      Array.isArray(varifiedStaticRules)
        ? varifiedStaticRules.forEach(rule => styleRenderer.renderStatic(rule))
        : styleRenderer.renderStatic(varifiedStaticRules);
    }

    const page = renderPage(App => props => (
      <FelaProvider theme={validatedTheme} renderer={styleRenderer}>
        <App {...props} />
      </FelaProvider>
    ));

    const sheetList = renderToSheetList(styleRenderer);
    styleRenderer.clear();

    // console.log('[cretaeDocument] fontStacks: ', JSON.stringify(fontStacks));
    const criticalFontElements = criticalFontLoader(fontStacks.criticalFont, fontStacks.base);

    return {
      ...page,
      sheetList,
      appData,
      isRtl,
      lang,
      host,
      criticalFontElements,
    };
  }

  renderStyles() {
    return this.props.sheetList.map(({ type, rehydration, support, media, css, }) => (
      <style
          // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: css, }}
        data-fela-rehydration={rehydration}
        data-fela-support={support}
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
          __html: `__HTZ_DATA__=${serialize(this.props.appData)};`,
        }}
      />
    );
  }

  render() {
    const criticalFont = this.props.criticalFontElements;
    return (
      <html lang={this.props.lang} dir={this.props.isRtl ? 'rtl' : 'ltr'}>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
          {/* dont add link to manifest on purchase-page app  */}
          {hasToggleableTheme ? null : (
            <link rel="manifest" href="/static/manifest/manifest.json" />
          )}

          {criticalFont.preload}
          <SEO host={this.props.host} polyFillSrc={polyFillSrc} />
          {criticalFont.style}
          {criticalFont.script}
          {this.renderStyles()}
          {this.renderData()}
          {process.env.CONNECTION_PRESET === 'stage' ? (
            <meta
              name="google-site-verification"
              content="s8ANajgxerP2VtcnQ05TxVZjP0A9EhPp70_PLse_cBY"
            />
          ) : null}

          <style
            dangerouslySetInnerHTML={{
              __html: `
                :-moz-focusring {
                  outline: 2px dotted #0B7EB5;
                }
                `,
            }}
          />
        </Head>
        <body>
          <Main />
          <script src={polyFillSrc} />
          <NextScript />
        </body>
      </html>
    );
  }
};

export default createDocument;
