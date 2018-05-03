import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { attrsPropType, } from '../../propTypes/attrsPropType';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

export class Form extends Component {
  static propTypes = {
    /**
     * An object of attrbutes to set on the DOM element.
     * Passed to the underlying input/textarea element in this component
     */
    attrs: attrsPropType,
    /**
     * If true when handleSubmit function is called
     * native submit behaviour wont be prevented
     */
    disablePreventDefault: PropTypes.bool,
    /**
     * If true handleSubmit function is called
     * native submit behaviour wont be prevented
     */
    disableSubmitOnEnterKeyDown: PropTypes.bool,
    /**
     * If true when handleSubmit function is called
     * The form wont be cleared
     */
    clearFormAfterSubmit: PropTypes.bool,
    /**
     * Initial values to inject to the Form state,
     * The initial values are spread into he Form's state.values object
     * The given values name key should corrospond to the name attribute given to the relevant input
     */
    initialValues: PropTypes.shape({
      name: PropTypes.string,
    }),
    /**
     * Should The Form check for if the validation passes when the input blurs
     */
    isValidateOnBlur: PropTypes.bool,
    /**
     * Should The Form check for if the validation passes when the user enters new input
     */
    isValidateOnChange: PropTypes.bool,
    /**
     * A callback that gets the the values object from the Form state
     * Gets called through handleSubmit() if the validation callback returns no errors
     * @param {Object} values - The Values Object from the Form state
     * @param {Any} args - pass all other arguments needed by onSubmit
     */
    onSubmit: PropTypes.func.isRequired,
    /**
     * A callback that should validate inputs inside that the form controls
     *
     * The function should return and Array of error objects that have the following keys:
     *
     * name: required, and needs to correspond with the input name
     *
     * order: required, in case of an error after trying to submit the for will focus
     *        on the input that is in error state and has the lowest order value
     *
     * errorText: optional, will render the given errorNote in case of error
     * @param {Object} values - The Values Object from the Form state
     */
    validate: PropTypes.func,
    /**
     * The render Props callback
     * This component was built using the render props pattern together with prop getters pattern
     *
     * Checkout the following link to learn about render props pattern http://bit.ly/2CSxs7g
     *
     * And the following link to learn about prop getters http://bit.ly/2Fk27bY
     *
     * The Form Component passes an Object to its render function.
     * @param {Object} - holds the getInputProps, handleSubmit, and clearForm functions
     */
    render: PropTypes.func.isRequired,
  };
  static defaultProps = {
    attrs: null,
    disablePreventDefault: false,
    disableSubmitOnEnterKeyDown: false,
    clearFormAfterSubmit: true,
    initialValues: {},
    isValidateOnBlur: true,
    isValidateOnChange: true,
    validate: null,
  };

  state = {
    values: { ...this.props.initialValues, },
    errors: [],
    touched: {},
    // TODO: handle submitting state
    // isSubmiting: false,
  };

  /**
   * A function that is used to spread all the props on a input element that is controlled by the form.
   * The input Element must be a custom React component that accepts the following props:
   * refFunc (a calback that sets a ref to the actual input), isError and errorText
   * @param {Object} userProps
   *   An Object holding all the props the user wants to spread on the input element.
   *   The consumer must pass an Object with a name key that has a unique value, the
   *   rest of the properties are optional.
   *
   *   All props passed to a input element controlled by the Form should be passed
   *   through the getInputProps func, e.g.,
   *
   *   `<input {...getInputProps(myOwnProps)} />`
   *
   *   rather than `<input {...getInputProps} {...myOwnProps} />`
   *
   * @returns {Object} props
   *   an Object holding all the user props + all the generically generated props needed by
   *   Form to control the input
   */

  getInputProps = ({
    errorText,
    isContentEditable = false,
    isError,
    name,
    formElementType = 'text',
    onBlur,
    onChange,
    onContentEditableChange,
    validationOrder,
    ...rest
  }) => {
    const stateError = this.state.errors.find(error => {
      if (error && error.name === name) {
        return error;
      }
      return null;
    });

    let formElementProperties;

    switch (formElementType) {
      case 'checkBox':
        formElementProperties = {
          checked: this.state.values[name] || false,
          onChange: callAll(onChange, evt => {
            const values = { ...this.state.values, [name]: evt.target.checked, };
            const errors = this.props.isValidateOnChange
              ? this.handleTouchedValidate(values)
              : null;
            this.setState({
              values,
              ...(errors ? { errors, } : {}),
            });
          }),
        };
        break;
      case 'radio':
        formElementProperties = {
          // RadioGroup needs the name in order to pass it to RadioButton
          name,
          onChange: callAll(onChange, evt => {
            const values = { ...this.state.values, [name]: evt.target.value, };
            const errors = this.props.isValidateOnChange
              ? this.handleTouchedValidate(values)
              : null;
            this.setState({
              values,
              ...(errors ? { errors, } : {}),
            });
          }),
          value: this.state.values[name] || null,
        };
        break;
      case 'select':
        formElementProperties = {
          onChange: callAll(onChange, selectedItem => {
            const values = { ...this.state.values, [name]: selectedItem, };
            const errors = this.props.isValidateOnChange
              ? this.handleTouchedValidate(values)
              : null;
            this.setState({
              values,
              ...(errors ? { errors, } : {}),
            });
          }),
          controlledSelectedItem: this.state.values[name] || null,
        };
        break;
      default:
        formElementProperties = {
          ...(isContentEditable
            ? {
              onContentEditableChange: callAll(
                onContentEditableChange,
                (evt, value) => {
                  const values = { ...this.state.values, [name]: value, };
                  const errors = this.props.isValidateOnChange
                    ? this.handleTouchedValidate(values)
                    : null;
                  this.setState({
                    values,
                    ...(errors ? { errors, } : {}),
                  });
                }
              ),
              isContentEditable,
            }
            : {
              onChange: callAll(onChange, evt => {
                const values = {
                  ...this.state.values,
                  [name]: evt.target.value,
                };
                const errors = this.props.isValidateOnChange
                  ? this.handleTouchedValidate(values)
                  : null;
                this.setState({
                  values,
                  ...(errors ? { errors, } : {}),
                });
              }),
            }),
          /**
           * empty string is needed so react wont think it is an
           * uncontrolled input when the value is empty
           */
          value: this.state.values[name] || '',
        };
    }
    return {
      ...formElementProperties,
      onBlur: callAll(onBlur, evt => {
        if (!this.state.touched[name]) {
          this.setState({
            touched: { ...this.state.touched, [name]: true, },
          });
        }
        if (this.props.isValidateOnBlur) {
          const errors = this.handleTouchedValidate(this.state.values, name);
          this.setState({ errors, });
        }
      }),
      ...(stateError || isError ? { isError: true, } : {}),
      ...(stateError && stateError.errorText
        ? { errorText: stateError.errorText, }
        : errorText ? { errorText, } : {}),
      refFunc: elem => {
        this[`${name}El`] = elem;
      },
      ...rest,
    };
  };

  /**
   * A function that handles submitting data from the Form
   * @param {SyntheticEvent} evt - Pass the submit event object
   * @param {Any} args - pass all other arguments needed by onSubmit
   *   If true the submit will not prevent form submit default behaviour.
   *   The function first checks if the values pass the validation function.
   *   If there are errors it will focus on the error with the lowest error.order value
   *   If there are no errors or no validation function it will call the
   *   `onSubmit` function provided to the Form with the values from the state,
   *   and then clear the form.
   *   By default, submit event is prevented with evt.preventDefault() in the
   *   handle submit function.
   *   The `disablePreventDefault` prop will restructure the default submit
   *   functionality of the form.
   */
  handleSubmit = (evt, ...args) => {
    if (!this.props.disablePreventDefault) evt.preventDefault();
    // check if enter was pressed and id submit on enter was disabled
    if (
      !(
        args[0] &&
        args[0].enterKeyPressed &&
        this.props.disableSubmitOnEnterKeyDown
      )
    ) {
      if (this.props.validate) {
        const errors = this.props.validate(this.state.values);
        if (errors.length > 0) {
          this.focusFirstError(errors);
        }
        else {
          this.props.onSubmit(this.state.values, ...args);
          if (this.props.clearFormAfterSubmit) this.clearForm();
        }
      }
      else {
        this.props.onSubmit(this.state.values, ...args);
        if (this.props.clearFormAfterSubmit) this.clearForm();
      }
    }
  };

  /**
   * A function that clears all errors, values, and reset the touched fields
   */

  clearForm = () => {
    const values = {};
    const keys = Object.keys(this.state.values);
    keys.forEach(key => {
      if (typeof this.state.values[key] === 'string') values[key] = '';
      if (typeof this.state.values[key] === 'boolean') values[key] = false;
    });
    this.setState({
      values,
      errors: [],
      touched: {},
    });
  };

  focusFirstError(errors) {
    if (errors.length > 0) {
      errors.sort((a, b) => a.order - b.order);
      this[`${errors[0].name}El`].focus();
      this.setState({ errors, });
    }
  }

  handleTouchedValidate(values, name = null) {
    if (this.props.validate) {
      const errors = this.props.validate(values);
      const cleanErrors = errors.filter(
        error => this.state.touched[error.name] || error.name === name
      );
      return cleanErrors;
    }
    return [];
  }

  render() {
    const { attrs, render, } = this.props;

    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <form
        {...attrs}
        onKeyDown={evt => {
          if (evt.keyCode === 13) {
            this.handleSubmit(evt, { enterKeyPressed: true, });
          }
        }}
      >
        {render({
          getInputProps: this.getInputProps,
          handleSubmit: this.handleSubmit,
          clearForm: this.clearForm,
        })}
      </form>
    );
  }
}

export default Form;
