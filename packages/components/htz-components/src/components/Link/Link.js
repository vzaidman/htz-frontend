import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import NextLink from 'next/link';

const propTypes = {
  /**
   * Link's destination.
   * */
  href: PropTypes.string.isRequired,
  /**
   * Link's content (simple string or another component/element)
   * */
  content: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  /**
   * OnClick behavior.
   * */
  target: PropTypes.string,
  /**
   * Should prefetch.
   * */
  prefetch: PropTypes.bool,
};

const defaultProps = {
  target: '_self',
  prefetch: false,
};

const linkStyle = ({ theme, }) => ({
  '& a': {
    color: theme.color('link'),
  },
});

const LinkWrapper = createComponent(linkStyle, 'span');

function Link({ href, target, content, prefetch, }) {
  return (
    <LinkWrapper>
      <NextLink prefetch={prefetch} href={href}>
        <a target={target}>{content}</a>
      </NextLink>
    </LinkWrapper>
  );
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
