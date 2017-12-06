import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

const propTypes = {
  /** Is this input in error state */
  isError: PropTypes.bool,
  /** Is this a textarea */
  isTextArea: PropTypes.bool,
  /** input BorderColor when isError is not passed */
  inputBorderColor: PropTypes.string,
  /** input BorderColor when isError prop is passed */
  inputBorderColorError: PropTypes.string,
  /** general style of component, insert a regular css in js object, not limited to color and font-size, overrides overlapping default styles */
  styleObject: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.string,
  }),
};
const defaultProps = {
  inputBorderColor: 'green',
  inputBorderColorError: 'red',
  isError: false,
  isTextArea: false,
  styleObject: null,
};

const inputStyle = ({
  isError,
  as,
  inputBorderColorError,
  inputBorderColor,
  styleObject,
}) => ({
  borderColor: isError ? inputBorderColorError : inputBorderColor,
  height: as === 'textarea' ? '10rem' : '3rem',
  resize: 'none',
  ...styleObject,
});

// when passing all props the is prop causes trouble, should change after changing to as in new fela version??
const StyledTextInput = createComponent(inputStyle, 'input', [ 'defaultValue', ]);

function TextInput(props) {
  // in new fela is prop will change to as
  return (
    <StyledTextInput
      {...props}
      as={props.isTextArea ? 'textarea' : undefined}
    />
  );
}

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

export default TextInput;
