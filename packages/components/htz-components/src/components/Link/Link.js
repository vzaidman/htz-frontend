import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import isNextLink from './isNextLink';

const propTypes = {
  /** Link's destination */
  href: PropTypes.oneOfType([ PropTypes.object, PropTypes.string, ]).isRequired,
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
  className: null,
  children: null,
  content: null,
  focus: false,
  prefetch: null,
  target: null,
  onClick: null,
};

// eslint-disable-next-line react/prop-types
const LinkWrapper = ({ href, onClick, passedOnClick, children, }) => {
  const wrappedOnclick = (...args) => {
    if (passedOnClick) {
      passedOnClick(...args);
    }
    // your own code here, this function can even be async
    // TODO: Logging to BI can happen here.
    console.log('LOGGING BI FOR', href);
    return onClick(...args);
  };

  return (
    <a href={href} onClick={wrappedOnclick}>
      {children}
    </a>
  );
};

function Link({
  href,
  target,
  children,
  content,
  prefetch,
  className,
  focus,
  onClick: passedOnClick,
}) {
  // eslint-disable-next-line eqeqeq
  const renderContent = content != undefined ? content : children;
  return isNextLink(href) ? (
    <NextLink
      prefetch={prefetch}
      // href={href}
      href={{ pathname: '/', query: { path: href, }, }}
      as={href}
    >
      <LinkWrapper
        target={target}
        className={className}
        ref={linkRef => focus && linkRef && linkRef.focus()}
        href={href}
        passedOnClick={passedOnClick}
      >
        NextLink: {renderContent}
      </LinkWrapper>
    </NextLink>
  ) : (
    <a
      href={href}
      target={target}
      className={className}
      ref={linkRef => focus && linkRef && linkRef.focus()}
      onClick={passedOnClick}
    >
      Link: {renderContent}
    </a>
  );
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
