/* eslint-disable no-unused-vars */
/* global window */
import { breakUrl, } from '@haaretz/app-utils';

const premiumPrefix = '(?:\\.premium-)?';
const multiSectionPrefix = '(?:\\/(.+?\\/)+)?';
const articlePattern = '(?:.*-?)(1\\.\\d+.*)';
const homepagePattern = '(^\\/(\\?.*)?$)';
const offersPattern =
  '(\\/promotions-page\\/(product|price|login|method|payment|thankYou|debt|stage\\d))';

const NonReactArticleTypes = [
  '(MAGAZINE-)',
  '(REVIEW-)',
  '(TAG-)',
  '(WRITER-)',
  '(BLOG-)',
  '(CARD-)',
  '(CAREER-)',
  '(LIVE-)',
  '(INTERACTIVE-)',
];

const nonReactSections = [
  '(\\/article-print-page)',
  '(\\/tags)',
  '(\\/writers)',
  '(\\/misc)',
  '(\\/labels)',
  '(\\/st)',
];

const isNonReactArticleType = new RegExp(
  `${multiSectionPrefix}${premiumPrefix}(${NonReactArticleTypes.join('|')})${articlePattern}`
);
const isReactArticleType = `${multiSectionPrefix}${premiumPrefix}${articlePattern}`;

const reactPathPattern = [ isReactArticleType, offersPattern, ].join('|');

const isReactType = new RegExp(reactPathPattern);
const isReactArticleTypeRegex = new RegExp(isReactArticleType);
const isNonReactSectionRegex = new RegExp(nonReactSections.join('|'), 'i');

// Method for next to replace pathname with article.js for in-app browsing
export function isReactArticle(href) {
  return isReactArticleTypeRegex.test(href);
}

export function getArticlePageTypeFromUrl(url) {
  const articleTypes = [
    'BLOG',
    'CARD',
    'CAREER',
    'INTERACTIVE',
    'LIVE',
    'MAGAZINE',
    'RECIPE',
    'REVIEW',
  ];

  // Test if the url contains one of the above article types,
  // and return the article type string according to the
  // `${articleType.toLowerCase()}Article` standard.
  const articleType = articleTypes.reduce(
    (articleTypeName, item) =>
      articleTypeName || (url.includes(`${item}-`) ? `${item.toLowerCase()}Article` : false),
    false
  );

  // Return the article type based on the URL, or if none was found,
  // fallback to `standardArticle`.
  return articleType || 'standardArticle';
}

/**
 * This function takes an href and decides whether or not
 * the link should be handled as a Next link or a regular link
 * @param href
 * @return {boolean}
 */
export default function isNextLink(href, site) {
  // `href` is a simple string
  if (typeof href === 'string') {
    return isNextLinkSimpleString(href, site);
  }
  if (href && typeof href === 'object' && href.pathname && typeof href.pathname === 'string') {
    return isNextLinkSimpleString(href.pathname, site);
  }
  // `href` is of unknown form
  return false;
}

/**
 * Internal tester - works only for simple strings
 * @param {string} href the url to test
 * @return {boolean}
 */
function isNextLinkSimpleString(href, site) {
  if (!isSameDomain(href, site)) {
    return false;
  }
  const { fullMatch, baseUrl, scheme, fqdn, hostname, domain, port, path, query, fragment, } =
    breakUrl(href) || {};
  return (
    !isNonReactArticleType.test(path) &&
    isReactType.test(path) &&
    !isNonReactSectionRegex.test(path)
  );
}

function isSameDomain(href, site) {
  const { domain, } = breakUrl(href);
  return domain ? domain === site : true;
}
