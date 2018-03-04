import React from 'react';
import { createComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import { visuallyHidden, } from '@haaretz/htz-css-tools';

const AriaDescriptionStyled = createComponent(visuallyHidden, 'span', [ 'id', ]);

AriaDescription.propTypes = {
  /** ID for the HTML element */
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
};

AriaDescription.defaultProps = {
  children: null,
};

function AriaDescription({ id, children, }) {
  return <AriaDescriptionStyled id={id}>{children}</AriaDescriptionStyled>;
}
export default AriaDescription;
