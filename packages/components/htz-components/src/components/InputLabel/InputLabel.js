import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

const propTypes = {
  /** id of input passed to html label "for" attribute */
  labelFor: PropTypes.string,
  /** text caption for the relevant input */
  text: PropTypes.string,
  /** child node, should be an input that the label is connected to */
  children: PropTypes.node,
  /** general style of component, insert a regular css in js object, not limited to color and font-size */
  styleObject: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.string,
  }),
};
const defaultProps = {
  text: undefined,
  labelFor: undefined,
  children: undefined,
  styleObject: undefined,
};

const labelStyle = ({ styleObject, }) => ({
  ...styleObject,
});

const StyledLabel = createComponent(labelStyle, 'label', [ 'htmlFor', ]);

function InputLabel(props) {
  return (
    <StyledLabel
      {...props.labelFor && { htmlFor: props.labelFor, }}
      styleObject={props.styleObject}
    >
      {props.text && <span>{props.text}</span>}
      {props.children}
    </StyledLabel>
  );
}

InputLabel.propTypes = propTypes;
InputLabel.defaultProps = defaultProps;

export default InputLabel;
