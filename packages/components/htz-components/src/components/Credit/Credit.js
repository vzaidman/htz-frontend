import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Link from '../Link/Link';

const creditPropTypes = {
  /**
   * Author name/Credit text
   */
  name: PropTypes.string.isRequired,
  /**
   * Authors page url
   */
  url: PropTypes.string,
};

const creditDefaultProps = {
  url: null,
}

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
  Link,
  [ 'href', 'content', ]
);


function Credit({
  name,
  url,
  className,
}) {
  const tname = name.trim();
  return (
    tname ? (
      <address {...className && { className, }}>
        { url ?
          <LinkStyled href={url} content={tname} /> :
          `${tname}`
        }
      </address>
    ) : null
  );
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
}

export default Credit;
export { creditPropTypes, creditDefaultProps, };
