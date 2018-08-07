import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  host: PropTypes.string.isRequired,
};

const defaultProps = {};

function SEO({ host, }) {
  const site = host === 'themarker.com' ? 'tm' : 'htz';
  return (
    <Fragment>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />

      {/* <!-- Domains --> */}
      <link rel="preconnect dns-prefetch" href="//images.haaretz.co.il" />
      <link rel="preconnect dns-prefetch" href="//cm.g.doubleclick.net" />
      <link
        rel="preconnect dns-prefetch"
        href="//securepubads.g.doubleclick.net"
      />
      <link rel="preconnect dns-prefetch" href="//www.google-analytics.com" />

      {/* <!-- Assets --> */}
      <link
        rel="preload"
        href="//www.googletagservices.com/tag/js/gpt.js"
        as="script"
      />
      <link
        rel="preload"
        href="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,fetch,IntersectionObserver,Array.prototype.find,Array.prototype.includes,Object.entries&flags=gated"
        as="script"
      />

      {/* <!-- FAVICONS --> */}
      <link rel="shortcut icon" href={`/static/${site}/images/favicon.ico`} />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href={`/static/${site}/images/apple-touch-icon-152x152.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href={`/static/${site}/images/apple-touch-icon-144x144.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href={`/static/${site}/images/apple-touch-icon-120x120.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href={`/static/${site}/images/apple-touch-icon-114x114.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href={`/static/${site}/images/apple-touch-icon-72x72.png`}
      />

      <meta
        name="msapplication-TileColor"
        content={site === 'tm' ? '#00C800' : '#0B7EB5'}
      />
      <meta
        name="msapplication-TileImage"
        content={`/static/${site}/images/mstile-144x144.png`}
      />

      <meta name="referrer" content="always" />
      <meta name="robots" content="noarchive" />
    </Fragment>
  );
}

SEO.propTypes = propTypes;
SEO.defaultProps = defaultProps;

export default SEO;
