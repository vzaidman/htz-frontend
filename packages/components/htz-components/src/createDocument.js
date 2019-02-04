/* eslint-disable react/no-danger */
import React from 'react';
import Document, { Head, Main, NextScript, } from 'next/document';
import { renderToSheetList, } from 'fela-dom';
import config from 'config';
import serialize from 'serialize-javascript';
import { breakUrl, } from '@haaretz/app-utils';
import SEO from './components/SEO/SEO';
import criticalFontLoader from './utils/criticalFontLoader';
// import ChartBeat from './components/Scripts/ChartBeat';

const polyfillSrc = 'https://cdn.polyfill.io/v3/polyfill.min.js?features=default,Object.entries,Array.prototype.entries,fetch,IntersectionObserver,Array.prototype.find,Array.prototype.findIndex,Array.prototype.includes,Function.name,Array.prototype.@@iterator&flags=gated&flags=gated&unknown=polyfill';

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
      url: req.url,
      criticalFontElements,
    };
  }

  renderStyles() {
    return this.props.sheetList.map(({ type, rehydration, support, media, css, }) => (
      <style
        dangerouslySetInnerHTML={{ __html: css, }}
        data-fela-rehydration={rehydration}
        data-fela-support={support}
        data-fela-type={type}
        key={`${type}-${media}`}
        media={media}
      />
    ));
  }

    chartbeatConfig = () => (
      <React.Fragment>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
          var _sf_async_config = _sf_async_config || {};
          /** ChartBeat CONFIGURATION START **/
          _sf_async_config.uid = 5952;
          _sf_async_config.domain = "haaretz.co.il";
          _sf_async_config.flickerControl = false;
          _sf_async_config.useCanonical = true;
          _sf_async_config.useCanonicalDomain = true;
          /** ChartBeat CONFIGURATION END **/
        `,
          }}
        />
        {/* <style
          dangerouslySetInnerHTML={{ __html: 'body { visibility: hidden !important; }', }}
          id="chartbeatFlickerControlStyle"
        /> */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.setTimeout(() => {
                  const hider = document.getElementById('chartbeatFlickerControlStyle');
                  if (hider) {
                    hider.parentNode.removeChild(hider);
                  }
                }, 1000);
              }`,
          }}
        /> */}
        <script async src="//static.chartbeat.com/js/chartbeat_mab.js" />
      </React.Fragment>
    );

    renderData() {
      return (
        <script
          dangerouslySetInnerHTML={{
            __html: `__HTZ_DATA__=${serialize(this.props.appData)};`,
          }}
        />
      );
    }

    render() {
      const criticalFont = this.props.criticalFontElements;
      const { path, } = breakUrl(this.props.url);
      return (
        <html lang={this.props.lang} dir={this.props.isRtl ? 'rtl' : 'ltr'}>
          <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
            {/* dont add link to manifest on purchase-page app  */}
            {hasToggleableTheme ? null : (
              <link rel="manifest" href="/manifest.json" />
            )}
            {criticalFont.preload}
            {/* ************************* *
             *       STYLE ELEMENTS      *
             * ************************* */}
            {criticalFont.style}
            {this.renderStyles()}
            {/* TODO: This should be in the theme's static rules */}
            <style
              dangerouslySetInnerHTML={{
                __html: `
                :-moz-focusring {
                  outline: 2px dotted #0B7EB5;
                }
                `,
              }}
            />

            {/* ************************* *
             *      SCRIPT ELEMENTS      *
             * ************************* */}
            {criticalFont.script}

            {/* ChartBeat scripts should only render on homepage */}
            {path !== '/' ? null : this.chartbeatConfig()}

            <SEO host={this.props.host} polyFillSrc={polyfillSrc} />
            {this.renderData()}
            {process.env.CONNECTION_PRESET === 'stage' ? (
              <meta
                name="google-site-verification"
                content="s8ANajgxerP2VtcnQ05TxVZjP0A9EhPp70_PLse_cBY"
              />
            ) : null}
          </Head>
          <body>
            <Main />
            <script crossOrigin="anonymous" src={polyfillSrc} />
            <NextScript />
          </body>
        </html>
      );
    }
};

export default createDocument;
