/* global document */

import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { border, borderBottom, parseStyleProps, parseComponentProp, } from '@haaretz/htz-css-tools';
import { attrsPropType, } from '../../propTypes/attrsPropType';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import Abbr from './elements/Abbr';
import Button from '../Button/Button'; // eslint-disable-line import/no-named-as-default
import IconBold from '../Icon/icons/IconBold';
import IconItalic from '../Icon/icons/IconItalic';
import InputElement from './elements/InputElement';
import Note from '../Note/Note';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';
import { textInputVariantType, } from './textInputVariantType';

const labelStyle = ({
  isContentEditable,
  isDisabled,
  isError,
  isFocused,
  isTextArea,
  miscStyles,
  theme,
  variant,
}) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  ...(isTextArea || isContentEditable ? { flexDirection: 'column', alignItems: 'flex-start', } : {}),
  paddingInlineStart: '1rem',
  paddingInlineEnd: '1rem',
  width: '100%',
  ...(!isTextArea && !isContentEditable ? { position: 'relative', marginTop: '1rem', } : {}),
  extend: [
    theme.type(theme.inputStyle.typeScale),
    parseComponentProp(
      undefined,
      variant,
      theme.mq,
      setVariant,
      theme.color,
      isError,
      isFocused,
      theme,
      isDisabled
    ),
    // Trump all other styles with those defined in `miscStyles`
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

const StyledLabel = createComponent(labelStyle, 'label', [ 'htmlFor', 'onClick', ]);

function setVariant(prop, variant, getColor, isError, isFocused, theme, isDisabled) {
  const focusedStyle = {
    backgroundColor: getColor('input', `${variant}FocusBg`),
    ...border(
      `${theme.inputStyle.borderWidth}px`,
      theme.inputStyle.lines,
      theme.inputStyle.borderStyle,
      isError
        ? getColor('input', `${variant}ErrorBorder`)
        : getColor('input', `${variant}FocusBorder`)
    ),
  };
  return {
    backgroundColor: getColor('input', `${variant}Bg`),
    ...border(
      `${theme.inputStyle.borderWidth}px`,
      theme.inputStyle.lines,
      theme.inputStyle.borderStyle,
      getColor('input', `${variant}Border`)
    ),
    ...(isFocused
      ? focusedStyle
      : {
        ':hover': {
          backgroundColor: getColor('input', `${variant}HoverBg`),
          borderColor: getColor('input', `${variant}HoverBorder`),
          color: getColor('input', `${variant}HoverText`),
          ...(isDisabled ? { cursor: 'not-allowed', } : {}),
        },
      }),
  };
}

const labelTextStyle = ({
  labelHidden,
  isContentEditable,
  isDisabled,
  isError,
  isFocused,
  isInputEmpty,
  isTextArea,
  theme,
  variant,
}) => ({
  ...(labelHidden
    ? { display: 'none', }
    : {
      marginInlineEnd: '1rem',
      color: isError
        ? theme.color('input', `${variant}ErrorTextLabel`)
        : isDisabled
          ? theme.color('input', `${variant}TextLabelDisabled`)
          : theme.color('input', `${variant}TextLabel`),
      fontWeight: theme.inputStyle.fontWeightLabel,
      transitionProperty: 'transform',

      extend: [
        {
          condition: isTextArea === true,
          style: {
            display: 'block',
          },
        },
        {
          condition: !isTextArea && !isContentEditable,
          style: {
            position: 'absolute',
            bottom: '0.7rem',
            paddingRight: '1rem',
            paddingLeft: '1rem',
            marginInlineStart: '-1rem',
            ...(isFocused || !isInputEmpty
              ? {
                backgroundColor: theme.color(
                  'input',
                  isFocused ? `${variant}FocusBg` : `${variant}Bg`
                ),
                transform: 'translateY(-2.7rem) scale(.8)',
              }
              : {}),
          },
        },
        theme.getTransition(-1, 'swiftOut'),
        {
          condition: isTextArea === true || isContentEditable === true,
          style: {
            flexGrow: 1,
            marginBottom: '1rem',
            ...borderBottom(
              `${theme.inputStyle.borderWidth}px`,
              theme.inputStyle.lines,
              theme.inputStyle.borderStyle,
              isFocused ? theme.color('input', `${variant}BorderTextLabel`) : 'transparent'
            ),
          },
        },
      ],
    }),
});

const StyledLabelText = createComponent(labelTextStyle, 'span', [ 'id', ]);

const labelAndButtonsWrapperStyle = ({ isContentEditable, isTextArea, }) => ({
  ...(isTextArea || isContentEditable ? { width: '100%', } : {}),
  ...(isContentEditable ? { display: 'flex', justifyContent: 'space-between', } : {}),
});

const StyledLabelAndButtonsWrapper = createComponent(labelAndButtonsWrapperStyle);

class TextInput extends Component {
  static propTypes = {
    /**
     * An object of attrbutes to set on the DOM element.
     * Passed to the underlying input/textarea element in this component
     */
    attrs: attrsPropType,
    /** Class(es) to be added to the DOM element.
     * Automatically generated by Fela, do not enter manually.
     */
    className: PropTypes.string,
    /**
     * The initial value of an uncontrolled `<TextInput />`.
     * Only relevant when using an uncontrolled input
     * Allows specifying the initial value but leaving subsequent
     * updates uncontrolled
     */
    defaultValue: PropTypes.string,
    /** error note to display if input is passed a `isError` prop, */
    errorText: PropTypes.oneOfType([ PropTypes.string, PropTypes.element, PropTypes.node, ]),
    /**
     * A callback function to allow parent component to get ref of input,
     * example use case: focusing the input.
     */
    refFunc: PropTypes.func,
    /**
     * Id used to connect the label to input with htmlFor for a11y reasons,
     * default will generate random id
     */
    inputId: PropTypes.string,
    /**
     * Enables rich text capabilities by using a div with
     * a `contenteditable` attribute. Should not be used
     * in cunjunction with `isTextArea`
     */
    isContentEditable: PropTypes.bool,
    /** Is this input disabled */
    isDisabled: PropTypes.bool,
    /** Is this input in error state */
    isError: PropTypes.bool,
    /**
     * Is this a textarea (multi line text input).
     * Should not be used in conjunction with `isContentEditable`
     */
    isTextArea: PropTypes.bool,
    /** label text */
    label: PropTypes.string.isRequired,
    /**
     * Used when a label is needed only for a11y, and should be visually hidden
     * in this case you should write a descriptive label that will help users
     * with screen readers understand the purpose of the input.
     * This will hide the label and add an aria-label attribute on the dom element.
     */
    labelHidden: PropTypes.bool,
    /**
     * ID used to connect the label with contentEditable div with
     * aria-describedby for a11y reasons, default will generate random id
     */
    labelId: PropTypes.string,
    /**
     * The max number of characters allowed in the input.
     *
     * Adds a native html maxlength atrribute.
     *
     * Does not work for contenteditable, if needed, should be implemented
     * via the controlling component
     */
    maxLength: PropTypes.number,
    /**
     * The min number of characters allowed in the input
     *
     * Adds a native html minlength atrribute.
     *
     * Does not work for contenteditable, if needed, should be implemented
     * via the controlling component
     */
    minLength: PropTypes.number,
    /**
     * Id used to connect the note to input with aria-describedby for a11y reasons,
     * default will generate random id
     */
    noteId: PropTypes.string,
    /** Note explaining the TextInput field  */
    noteText: PropTypes.oneOfType([ PropTypes.string, PropTypes.element, PropTypes.node, ]),
    /**
     * A callback that gets called when the input blurs
     * @param {SyntheticEvent} evt - The event object
     */
    onBlur: PropTypes.func,
    /**
     * A callback that gets the new value of Input
     * used to update state of parent when using as react controlled input
     * @param {SyntheticEvent} evt - The event object
     */
    onChange: PropTypes.func,
    /**
     * A callback that gets the event triggered by onInput and the new innerHTML
     * value of the contenteditable div.
     *
     * Used to update state of parent when using as react controlled input.
     *
     * Should not be used in conjucntion with `onInput` or `onChange`
     * @param {SyntheticEvent} evt - The event object
     * @param {String} innerHtml - The new innerHtml value of the div
     */
    onContentEditableChange: PropTypes.func,
    /**
     * A callback that gets called when the input focuses.
     *
     * Used to update state of parent if the input is focused.
     * @param {SyntheticEvent} evt - The event object
     */
    onFocus: PropTypes.func,
    /**
     * Function that gets the new value of Input, alternative to onChange when needed.
     *
     * Used to update state of parent when using as react controlled input
     * @param {SyntheticEvent} evt - The event object
     */
    onInput: PropTypes.func,
    /** placeholder text */
    placeholder: PropTypes.string,
    /**
     * Used to mark an input as required, adds an abbr html element after the label
     */
    requiredText: PropTypes.shape({
      /** is the abbr wrapped in `<sup>` tags */
      isSup: PropTypes.bool,
      /** long string will show when hovering over the Abbr component */
      long: PropTypes.string.isRequired,
      /** the short string will show after the label text */
      short: PropTypes.string.isRequired,
      /**
       * miscStyles of the Abbr component
       * A special property holding miscellaneous CSS values that
       * trump all default values. Processed by
       * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
       */
      miscStyles: stylesPropType,
    }),
    /**
     * The html input type
     * oneOf('email', 'number', 'password', 'search', 'tel', 'text', 'url')
     */
    type: PropTypes.oneOf([ 'email', 'number', 'password', 'search', 'tel', 'text', 'url', ]),
    /**
     * Value of a controlled `<TextInput />`.
     * Should never be passed manually by the consumer, but rather
     * set by the controlling component.
     */
    value: PropTypes.string,

    // Stylistic props
    /**
     * The height of an input, in rems. Only relevant when
     * `isTextArea` or `isContentEditable`.
     */
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(
        PropTypes.shape({
          ...responsivePropBaseType,
          value: PropTypes.number.isRequired,
        })
      ),
    ]),
    /** The `<TextInput />`'s stylistic variant */
    variant: PropTypes.oneOfType([
      textInputVariantType,
      PropTypes.arrayOf(
        PropTypes.shape({
          ...responsivePropBaseType,
          value: textInputVariantType.isRequired,
        })
      ),
    ]),
    /**
     * A special property holding miscellaneous CSS values that
     * trump all default values. Processed by
     * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
     */
    miscStyles: stylesPropType,
  };
  static defaultProps = {
    attrs: null,
    className: null,
    defaultValue: null,
    errorText: null,
    labelHidden: false,
    height: null,
    refFunc: undefined,
    inputId: null,
    isContentEditable: false,
    isDisabled: false,
    isError: false,
    isTextArea: false,
    labelId: null,
    maxLength: null,
    minLength: null,
    miscStyles: null,
    noteId: null,
    noteText: null,
    onBlur: null,
    onChange: null,
    onContentEditableChange: null,
    onInput: null,
    onFocus: null,
    placeholder: null,
    requiredText: null,
    type: 'text',
    value: undefined,
    variant: 'primary',
  };

  state = {
    boldActive: false,
    disableBlur: false,
    italicActive: false,
    inputId: this.props.inputId || Math.random().toString(),
    isFocused: false,
    isInputEmpty: !this.props.defaultValue,
    labelId: this.props.labelId || Math.random().toString(),
    noteId: this.props.noteId
      ? this.props.noteId
      : this.props.errorText || this.props.noteText ? Math.random().toString() : null,
  };

  /**
   * handles updating the state with the current active format buttons,
   * gets called on each keyup and mouseup while editing a contenteditable div so the format buttons
   * active state will stay acurrate.
   */
  setFormatButtonsState = () => {
    const boldActive = document.queryCommandState('bold');
    const italicActive = document.queryCommandState('italic');
    this.setState({ boldActive, italicActive, });
  };

  /**
   * handels executing clicking bold or italic format buttons
   * execCommand method allows one to run commands to manipulate the contents of the editable region
   *
   * @param {aCommandName} command - in our use case either `"bold"` or `"italic"`
   */
  toggleCommand(command) {
    document.execCommand(command);
    this.handleInputFocus(true, true);
    this.setFormatButtonsState();
  }
  /**
   * handles updating the state isFocused and disableBlur properties
   *
   * disabling the blur is needed when clicking the format buttons,
   * otherwise the contenteditable div will lose focus, change style and lose the caret position
   *
   * @param {Boolean} isFocused - Is the input focused.
   * @param {Boolean} disableFocusChange - should the focus change be disabled
   */
  handleInputFocus = (isFocused, disableFocusChange = false) => {
    if (disableFocusChange) {
      this.setState({ disableBlur: true, });
    }
    if (!this.state.disableBlur && !disableFocusChange) {
      this.setState({ isFocused, });
    }
    if (!disableFocusChange) this.setState({ disableBlur: false, });
  };
  /**
   * Used to simulate input native behaviour with contenteditable div
   * when disabled, click wont have an effect.
   *
   * Otherwise, focus on the contenteditable div (used by label and format buttons)
   *
   * @param {SyntheticEvent} evt - click event
   */
  handleClick(evt) {
    if (this.props.isDisabled) {
      evt.preventDefault();
      return;
    }
    this.contentEditableEl.focus();
  }

  render() {
    const {
      attrs,
      defaultValue,
      errorText,
      labelHidden,
      height,
      noteText,
      isContentEditable,
      isError,
      isTextArea,
      isDisabled,
      label,
      maxLength,
      minLength,
      miscStyles,
      onBlur,
      onChange,
      onContentEditableChange,
      onFocus,
      onInput,
      placeholder,
      refFunc,
      requiredText,
      type,
      value,
      variant,
    } = this.props;
    return (
      <div>
        <StyledLabel
          htmlFor={this.state.inputId}
          variant={variant}
          miscStyles={miscStyles}
          isError={isError}
          isFocused={this.state.isFocused}
          isContentEditable={isContentEditable}
          isTextArea={isTextArea}
          isDisabled={isDisabled}
          {...(isContentEditable ? { onClick: evt => this.handleClick(evt), } : {})}
        >
          <StyledLabelAndButtonsWrapper
            isContentEditable={isContentEditable}
            isTextArea={isTextArea}
          >
            <StyledLabelText
              labelHidden={labelHidden}
              isContentEditable={isContentEditable}
              isDisabled={isDisabled}
              isError={isError}
              isFocused={this.state.isFocused}
              isInputEmpty={this.state.isInputEmpty}
              isTextArea={isTextArea}
              variant={variant}
              {...(isContentEditable ? { id: this.state.labelId, } : {})}
            >
              {label}
              {requiredText ? (
                <Abbr
                  miscStyles={requiredText.miscStyles}
                  requiredText={{
                    long: requiredText.long,
                    short: requiredText.short,
                  }}
                  variant={variant}
                />
              ) : null}
            </StyledLabelText>
            {isContentEditable ? (
              <div>
                {' '}
                <Button
                  variant={this.state.italicActive ? 'primaryOpaque' : 'formattingOpaque'}
                  attrs={{
                    'aria-checked': this.state.italicActive,
                    'arial-label': 'italic',
                    onMouseDown: () => this.toggleCommand('italic'),
                    role: 'switch',
                  }}
                  onClick={evt => this.handleClick(evt)}
                  boxModel={{ hp: 0, vp: 0, }}
                  miscStyles={{
                    display: this.state.isFocused ? 'initial' : 'none',
                    fontStyle: 'italic',
                    height: '5rem',
                    marginInlineEnd: '0.1rem',
                    marginTop: 'calc(1px - 1rem)',
                    width: '5rem',
                  }}
                >
                  <IconItalic />
                </Button>
                <Button
                  variant={this.state.boldActive ? 'primaryOpaque' : 'formattingOpaque'}
                  attrs={{
                    'aria-checked': this.state.boldActive,
                    'arial-label': 'bold',
                    onMouseDown: () => this.toggleCommand('bold'),
                    role: 'switch',
                  }}
                  onClick={evt => this.handleClick(evt)}
                  boxModel={{ hp: 0, vp: 0, }}
                  miscStyles={{
                    display: this.state.isFocused ? 'initial' : 'none',
                    height: '5rem',
                    marginInlineEnd: '-1rem',
                    marginTop: 'calc(1px - 1rem)',
                    width: '5rem',
                  }}
                >
                  <IconBold />
                </Button>
              </div>
            ) : null}
          </StyledLabelAndButtonsWrapper>
          <InputElement
            ariaDescribedBy={this.state.noteId}
            ariaLabel={labelHidden ? label : null}
            attrs={attrs}
            defaultValue={defaultValue}
            height={isTextArea || isContentEditable ? height : null}
            inputId={this.state.inputId}
            isContentEditable={isContentEditable}
            isDisabled={isDisabled}
            isFocused={this.state.isFocused}
            isTextArea={isTextArea}
            {...(isContentEditable ? { labelId: this.state.labelId, } : {})}
            {...(maxLength ? { maxLength, } : {})}
            {...(minLength ? { minLength, } : {})}
            onBlur={() => {
              this.handleInputFocus(false);
              if (onBlur) {
                onBlur();
              }
            }}
            {...(!isContentEditable
              ? {
                onChange: evt => {
                  if (onChange) onChange(evt);
                  if (!isTextArea) {
                    if (evt.target.value.length > 0) {
                      this.setState({ isInputEmpty: false, });
                    }
                    if (evt.target.value.length === 0) {
                      this.setState({ isInputEmpty: true, });
                    }
                  }
                },
              }
              : {})}
            onFocus={() => {
              this.handleInputFocus(true);
              if (onFocus) {
                onFocus();
              }
            }}
            {...(onInput ? { onInput, } : {})}
            placeholder={placeholder}
            refFunc={el => {
              this.contentEditableEl = el;
              if (refFunc) refFunc(el);
            }}
            {...(isContentEditable
              ? {
                setFormatButtonsState: this.setFormatButtonsState,
                onContentEditableChange,
              }
              : {})}
            type={type}
            value={value}
          />
        </StyledLabel>
        <Note text={isError ? errorText : noteText} isError={isError} noteId={this.state.noteId} />
      </div>
    );
  }
}

export default TextInput;
