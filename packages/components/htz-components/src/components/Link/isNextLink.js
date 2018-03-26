/*
 * This function takes an href and decides whether or not
 * the link should be handled as a Next link or a regular link
 * @param href
 */
export default function isNextLink(href) {
  if (typeof href === 'string') {
    // case of 'href' being passed as a simple string
    const articlePattern = /\/1\.\d+.*$/;
    const homepagePattern = /^\/$/;
    const reactPathPattern = [ articlePattern, homepagePattern, ].join('|');
    const reactPathMatcher = new RegExp(reactPathPattern);
    return reactPathMatcher.test(href);
  }
  return true; // case of 'href' being passed as a complex object (Next Link)
}
