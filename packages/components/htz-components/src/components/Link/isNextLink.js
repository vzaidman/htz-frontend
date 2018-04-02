import config from 'config';

const domain = config.has('domain') && config.get('domain');
const isLocal = new RegExp(`(^((?!((https?:)?\\/\\/)).)*$)|(${domain})`);

// TODO Add more non-react time
const NonReactArticleTypes = [ '(MAGAZINE-)', '(LIVE-)', '(INTERACTIVE-)', ];
const isNonReactArticleType = new RegExp(
  `(${NonReactArticleTypes.join('|')})1\\.\\d+`
);

const articlePattern = '(\\/1\\.\\d+.*)';
const homepagePattern = '(^\\/(\\?.*)?$)';
const reactPathPattern = [ articlePattern, homepagePattern, ].join('|');
const isReactType = new RegExp(reactPathPattern);

/*
 * This function takes an href and decides whether or not
 * the link should be handled as a Next link or a regular link
 * @param href
 */
export default function isNextLink(href) {
  // `href` is a simple string
  if (typeof href === 'string') {
    return (
      isLocal.test(href) &&
      !isNonReactArticleType.test(href) &&
      isReactType.test(href)
    );
  }
  // `href` is a Next Link object
  return true;
}
