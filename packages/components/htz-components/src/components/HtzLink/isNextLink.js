/* eslint-disable no-unused-vars */
import config from 'config';
import { breakUrl, } from '@haaretz/app-utils';

// const domain = config.has('domain') && config.get('domain');
// const isLocal = new RegExp(`(^((?!((https?:)?\\/\\/)).)*$)|(${domain})`);

const premiumPrefix = '(?:\\.premium-)?';
const multiSectionPrefix = '(?:\\/(.+?\\/)+)?';
const articlePattern = '(1\\.\\d+.*)';
const homepagePattern = '(^\\/(\\?.*)?$)';
const offersPattern =
  '(\\/promotions-page\\/(product|price|login|method|payment|thankYou|debt|stage\\d))';

// TODO Add more non-react time
const NonReactArticleTypes = [
  '(MAGAZINE-)',
  '(REVIEW-)',
  '(TAG-)',
  '(WRITER-)',
  '(BLOG-)',
  '(LIVE-)',
  '(INTERACTIVE-)',
];
const isNonReactArticleType = new RegExp(
  `${multiSectionPrefix}${premiumPrefix}(${NonReactArticleTypes.join(
    '|'
  )})${articlePattern}`
);
const isReactArticleType = `${multiSectionPrefix}${premiumPrefix}${articlePattern}`;

const reactPathPattern = [ isReactArticleType, offersPattern, ].join('|');

const isReactType = new RegExp(reactPathPattern);
const isReactArticleTypeRegex = new RegExp(isReactArticleType);

// Method for next to replace pathname with article.js for in-app browsing
export function isReactArticle(href) {
  return isReactArticleTypeRegex.test(href);
}

/*
 * This function takes an href and decides whether or not
 * the link should be handled as a Next link or a regular link
 * @param href
 */
export default function isNextLink(href) {
  // `href` is a simple string
  if (typeof href === 'string') {
    return isNextLinkSimpleString(href);
  }
  if (
    href &&
    typeof href === 'object' &&
    href.pathname &&
    typeof href.pathname === 'string'
  ) {
    return isNextLinkSimpleString(href.pathname);
  }
  // `href` is of unknown form
  return false;
}

/**
 * Internal tester - works only for simple strings
 * @param {string} href the url to test
 */
function isNextLinkSimpleString(href) {
  const all = breakUrl(href);
  const {
    fullMatch,
    baseUrl,
    scheme,
    fqdn,
    hostname,
    domain,
    port,
    path,
    query,
    fragment,
  } = all;
  return !isNonReactArticleType.test(path) && isReactType.test(path);
}
