import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import isNextLink from './isNextLink';
import { attrsPropType, } from '../../propTypes/attrsPropType';

const propTypes = {
  /**
   * An object of attrbutes to set on the DOM element.
   * Passed to the underlying react element
   */
  attrs: attrsPropType,
  /** Link's destination */
  href: PropTypes.oneOfType([ PropTypes.object, PropTypes.string, ]).isRequired,
  asPath: PropTypes.string,
  children: PropTypes.node,
  /**
   * Link's content (simple string or another component/element).
   * Overrides `children` when both are defined.
   */
  content: PropTypes.oneOfType([ PropTypes.node, PropTypes.string, ]),
  /** Basic HTML target (destination window) */
  target: PropTypes.string,
  /** Should prefetch */
  prefetch: PropTypes.bool,
  /** react-fela class names */
  className: PropTypes.string,
  /** Set the focus on this component */
  focus: PropTypes.bool,
  /** An onClick function */
  onClick: PropTypes.func,
};

const defaultProps = {
  attrs: null,
  className: null,
  asPath: null,
  children: null,
  content: null,
  focus: false,
  prefetch: null,
  target: null,
  onClick: null,
};

/* eslint-disable react/prop-types */
const LinkWrapper = ({
  attrs,
  children,
  className,
  href,
  onClick,
  passedOnClick,
  ref,
}) => {
  const wrappedOnclick = (...args) => {
    if (passedOnClick) {
      passedOnClick(...args);
    }
    // your own code here, this function can even be async
    // TODO: Logging to BI can happen here.
    console.log('LOGGING BI FOR', href);
    return onClick(...args);
  };
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  /* eslint-disable jsx-a11y/click-events-have-key-events */
  return (
    <a
      href={href}
      className={className}
      onClick={wrappedOnclick}
      ref={ref}
      {...attrs}
    >
      {children}
    </a>
  );
};
/* eslint-enable jsx-a11y/no-static-element-interactions */
/* eslint-enable jsx-a11y/click-events-have-key-events */
/* eslint-enable react/prop-types */

// const getPage = prefix => {
//   if (prefix) {
//     switch (prefix) {
//       case 'MAGAZINE':
//         return '/magazine';
//       case 'RECIPE':
//       case 'REVIEW':
//       case 'LIVE':
//         return '/article';
//       default:
//         return '/';
//     }
//   }
//   return '/article';
// };

function Link({
  attrs,
  children,
  className,
  content,
  focus,
  href,
  asPath,
  onClick: passedOnClick,
  prefetch,
  target,
}) {
  // eslint-disable-next-line eqeqeq
  const renderContent = content != undefined ? content : children;
  // eslint-disable-next-line eqeqeq
  if (isNextLink(href) && !target) {
    /* eslint-disable no-unused-vars */
    let fullId;
    let premium;
    let prefix;
    let articleId;
    let params;
    let page;
    /* eslint-enable no-unused-vars */

    // if (href === '/') {
    //   prefix = '';
    //   articleId = '/';
    // }

    // if (href.startsWith('stage') || href.startsWith('thankYou') || href.startsWith('debt')) {
    //   page = href;
    // }
    // else if (href.includes('purchase-page')) {
    //   page = href.split('/')[href.split('/').length - 1];
    // }
    // else {
    //   const hrefPattern = new RegExp(
    //     '\\/?(?=[^/]*$)(?:(\\.\\w*)-)?(?:(\\w*)-)?(1\\.\\d*)(?:\\?(.*))?'
    //   );
    //   // eslint-disable-next-line no-unused-vars
    //   [ fullId, premium, prefix, articleId, params, ] = hrefPattern.exec(href);
    //   page = getPage(prefix);
    // }

    // TODO check this case
    const computedHref = typeof href === 'string' ? { pathname: href, } : href;

    return (
      <NextLink
        prefetch={prefetch}
        passHref
        href={computedHref}
        // href={{ pathname: page, query: { path: `/${articleId}`, }, }}
        as={asPath}
      >
        <LinkWrapper
          attrs={attrs}
          className={className}
          ref={linkRef => focus && linkRef && linkRef.focus()}
          passedOnClick={passedOnClick}
        >
          {renderContent}
        </LinkWrapper>
      </NextLink>
    );
  }
  return (
    <a
      {...attrs}
      href={href}
      target={target}
      className={className}
      ref={linkRef => focus && linkRef && linkRef.focus()}
      onClick={passedOnClick}
    >
      {renderContent}
    </a>
  );
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
