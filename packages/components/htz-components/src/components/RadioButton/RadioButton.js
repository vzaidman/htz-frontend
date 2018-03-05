import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import { radioButtonPropType, } from './RadioButtonPropType';
import Ripple from '../Animations/Ripple';

const styles = ({ miscStyles, theme, }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  extend: [ ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []), ],
});

const radioButtonStyle = ({ checked, isDisabled, isFocused, theme, }) => ({
  height: '2rem',
  width: '2rem',
  flexShrink: 0,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.color('checkBox', 'bg'),
  transitionProperty: 'all',
  borderWidth: isFocused && !checked ? '2px' : '1px',
  borderStyle: 'solid',
  borderColor: isDisabled
    ? theme.color('checkBox', 'borderDisabled')
    : theme.color('checkBox', 'border'),
});

const StyledRadioButton = createComponent(radioButtonStyle);

const checkStyle = ({ checked, theme, }) => ({
  height: '80%',
  width: '80%',
  borderRadius: '50%',
  backgroundColor: theme.color('checkBox', 'bgChecked'),
  opacity: checked ? 1 : 0,
  transitionProperty: 'all',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'white',
  extend: [ theme.getTransition(1, 'swiftIn'), ],
});

const StyledCheck = createComponent(checkStyle);

const spanStyle = () => ({
  marginInlineStart: '0.3em',
});

const StyledSpan = createComponent(spanStyle);

export class RadioButton extends Component {
  static propTypes = radioButtonPropType;
  static defaultProps = {
    attrs: null,
    checked: null,
    className: null,
    radioButtonId: null,
    isDisabled: false,
    label: null,
    miscStyles: null,
    onBlur: null,
    onChange: null,
    onClick: null,
    onFocus: null,
    refFunc: undefined,
  };
  state = {
    radioButtonId: this.props.radioButtonId || Math.random().toString(),
    checked: this.props.checked || false,
    isFocused: false,
  };

  render() {
    const {
      attrs,
      checked,
      className,
      isDisabled,
      label,
      name,
      onBlur,
      onChange,
      onClick,
      onFocus,
      refFunc,
      value,
    } = this.props;

    const controllingChecked = checked !== null ? checked : this.state.checked;

    return (
      <label
        htmlFor={this.state.radioButtonId}
        className={className}
        {...(refFunc ? { ref: el => refFunc(el), } : {})}
      >
        <input
          type="checkBox"
          {...(this.state.noteId ? { 'aria-describedby': this.state.noteId, } : {})}
          {...attrs}
          checked={controllingChecked}
          {...(isDisabled ? { disabled: true, } : {})}
          id={this.state.radioButtonId}
          name={name}
          value={value}
          onClick={evt => {
            if (!isDisabled) {
              if (checked === null) {
                this.setState((prevState, props) => ({
                  checked: !prevState.checked,
                }));
              }
              if (onClick) onClick(evt);
            }
          }}
          onFocus={evt => {
            this.setState((prevState, props) => ({
              isFocused: true,
            }));
            if (onFocus) onFocus(evt);
          }}
          onBlur={evt => {
            this.setState((prevState, props) => ({
              isFocused: false,
            }));
            if (onBlur) onBlur(evt);
          }}
          {...(onChange ? { onChange, } : {})}
        />
        <Ripple isActive={this.state.isFocused} />
        <StyledRadioButton checked={controllingChecked} isDisabled={isDisabled} isFocused={this.state.isFocused}>
          <StyledCheck checked={controllingChecked} />
        </StyledRadioButton>
        <StyledSpan>{label}</StyledSpan>
      </label>
    );
  }
}

export default createComponent(styles, RadioButton, [
  'attrs',
  'checked',
  'radioButtonId',
  'isDisabled',
  'label',
  'name',
  'onBlur',
  'onChange',
  'onClick',
  'onFocus',
  'refFunc',
  'value',
]);
