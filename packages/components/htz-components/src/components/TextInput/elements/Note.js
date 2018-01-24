import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { responsivePropBaseType, } from '../../../propTypes/responsivePropBaseType';
import { textInputVariantType, } from './../textInputVariantType';

const TextInputVariants = textInputVariantType;

const propTypes = {
  /** Class(es) to be added to the DOM element.
   * Automatically generated by Fela, do not enter manually.
   */
  className: PropTypes.string,
  /** true if there is a validation error */
  // used for style change
  // eslint-disable-next-line react/no-unused-prop-types
  isError: PropTypes.bool,
  /**
   * Id used to connect the note to input with aria-describedby for a11y reasons,
   * default will generate random id
   */
  noteId: PropTypes.string,
  /** the note text, parent component responsible for changing the text when there is an error */
  text: PropTypes.string,
  /** The TextInput stylistic variant */
  // used for styling
  // eslint-disable-next-line react/no-unused-prop-types
  variant: PropTypes.oneOfType([
    TextInputVariants,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: TextInputVariants.isRequired,
      })
    ),
  ]),
};
const defaultProps = {
  className: null,
  isError: false,
  noteId: null,
  text: null,
  variant: 'primary',
};

const styles = ({ theme, isError, variant, }) => ({
  color: isError
    ? theme.color('input', `${variant}ErrorTextNote`)
    : theme.color('input', `${variant}TextNote`),
  ...theme.type(-3),
});

function Note({ className, text, noteId, }) {
  return (
    <span className={className} id={noteId}>
      {text}
    </span>
  );
}

Note.propTypes = propTypes;
Note.defaultProps = defaultProps;

const StyledNote = createComponent(styles, Note, [ 'text', 'noteId', ]);

export default StyledNote;
