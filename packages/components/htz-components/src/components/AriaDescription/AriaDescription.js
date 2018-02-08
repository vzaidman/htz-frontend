import React from 'react';
import { createComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import { visuallyHidden, } from '@haaretz/htz-css-tools';

const AriaDescriptionStyled = createComponent( visuallyHidden, 'span', [ 'id', ]);

function AriaDescription({ id, children, }) {
  return <AriaDescriptionStyled id={id}>{children}</AriaDescriptionStyled>
}

AriaDescription.propTypes = {
  /**
   * ID for the HTML element
   */
  id: PropTypes.string.isRequired,
}
export default AriaDescription;
