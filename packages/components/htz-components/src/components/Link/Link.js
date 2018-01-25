import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';

const propTypes = {
  /**
   * Link's destination.
   * */
  href: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
  /**
   * Link's content (simple string or another component/element)
   * */
  content: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  /**
   * Basic HTML target (destination window).
   * */
  target: PropTypes.string,
  /**
   * Should prefetch.
   * */
  prefetch: PropTypes.bool,
  /**
   * react-fela class names.
   * */
  className: PropTypes.string,
};

const defaultProps = {
  target: null,
  prefetch: null,
  className: null,
};

function Link({ href, target, content, prefetch, className, focus, }) {
  return (
    <NextLink prefetch={prefetch} href={href}>
      <a
        target={target}
        className={className}
        ref={(linkRef) => (focus && linkRef && linkRef.focus())}
      >
        {content}
      </a>
    </NextLink>
  );
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
