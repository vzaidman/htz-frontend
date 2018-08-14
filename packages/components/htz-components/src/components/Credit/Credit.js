import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import HtzLink from '../HtzLink/HtzLink';

const creditPropTypes = {
  /**
   * Author name/Credit text
   */
  contentName: PropTypes.string.isRequired,
  /**
   * Authors page url
   */
  url: PropTypes.string,
};

const creditDefaultProps = {
  url: null,
};

const LinkStyled = createComponent(
  theme => ({
    color: 'currentcolor',
    ':hover': {
      textDecoration: 'underline',
    },
    ':focus': {
      textDecoration: 'underline',
    },
  }),
  HtzLink,
  [ 'href', 'content', ]
);

function Credit({ contentName, url, className, }) {
  const name = contentName.trim();
  return name ? (
    <address {...(className ? { className, } : null)}>
      {url ? <LinkStyled href={url} content={name} /> : `${name}`}
    </address>
  ) : null;
}

Credit.propTypes = {
  ...creditPropTypes,
  /**
   * CSS class names provided by Fela
   */
  className: PropTypes.string,
};

Credit.defaultProps = {
  ...creditDefaultProps,
  className: null,
};

export default Credit;
export { creditPropTypes, creditDefaultProps, };
