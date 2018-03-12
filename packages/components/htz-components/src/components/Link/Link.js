import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';

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
};

const defaultProps = {
  className: null,
  children: null,
  content: null,
  focus: false,
  prefetch: null,
  target: null,
};

function Link({ href, target, children, content, prefetch, className, focus, }) {
  // eslint-disable-next-line eqeqeq
  const renderContent = content != undefined ? content : children;

  return (
    <NextLink prefetch={prefetch} href={href}>
      <a
        target={target}
        className={className}
        ref={linkRef => focus && linkRef && linkRef.focus()}
      >
        {renderContent}
      </a>
    </NextLink>
  );
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
