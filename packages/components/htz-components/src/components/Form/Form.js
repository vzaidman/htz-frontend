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
     */
    onSubmit: PropTypes.func.isRequired,
    /**
     * A callback that should validate inputs inside that the form controls
     *
     * The function should return and Array of error objects that have the following keys:
     *
     * name: required, and needs to corespond with the input name
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
    initialValues: {},
    isValidateOnBlur: true,
    isValidateOnChange: true,
    validate: null,
  };

  state = {
    values: { ...this.props.initialValues, },
    errors: [],
    touched: {},
    isSubmiting: false,
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
    isContentEditable,
    name,
    onBlur,
    onChange,
    onContentEditableChange,
    onFocus,
    validationOrder,
    ...rest
  }) => {
    const stateError = this.state.errors.find(error => {
      if (error && error.name === name) {
        return error;
      }
      return null;
    });
    return {
      ...(isContentEditable
        ? {
          onContentEditableChange: callAll(onContentEditableChange, (evt, value) => {
            const values = { ...this.state.values, [name]: value, };
            const errors = this.props.isValidateOnChange
              ? this.handleTouchedValidate(values)
              : null;
            this.setState({
              values,
              ...(errors ? { errors, } : {}),
            });
          }),
        }
        : {
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
        }),
      onBlur: callAll(onBlur, evt => {
        if (this.props.isValidateOnBlur) {
          const errors = this.handleTouchedValidate(this.state.values);
          this.setState({ errors, });
        }
      }),
      onFocus: callAll(onFocus, evt => {
        if (!this.state.touched[name]) {
          this.setState({
            touched: { ...this.state.touched, [name]: true, },
          });
        }
      }),
      /** empty string is needed so react wont think it is an uncontrolled input when the value is empty */
      value: this.state.values[name] || '',
      ...(stateError ? { isError: true, } : {}),
      ...(stateError && stateError.errorText
        ? { errorText: stateError.errorText, }
        : errorText ? { errorText, } : {}),
      ...(isContentEditable ? { isContentEditable: true, } : {}),
      refFunc: elem => {
        this[`${name}El`] = elem;
      },
      ...rest,
    };
  };

  /**
   * A function that handles submitting data from the Form
   * @param {SyntheticEvent} evt - The event object
   * @param {Boolean} disablePreventDefault - If true the submit will not prevent form submit default behaviour
   * The function first checks if the values pass the validation function.
   * If there are errors it will focus on the error with the lowest error.order value
   * If there are no errors or no validation function it will call the onSubmit function provided to the
   * Form with the values from the state, and then clear the form.
   *
   * By default submit event is prevented with evt.preventDefault() in the handle submit func
   * If the consumer wants default form submit functionallity he can simply pass disablePreventDefault prop to the Form
   */
  handleSubmit = (evt, disablePreventDefault = false) => {
    if (!disablePreventDefault) evt.preventDefault();
    if (this.props.validate) {
      const errors = this.props.validate(this.state.values);
      if (errors.length > 0) {
        this.focusFirstError(errors);
      }
      else {
        this.props.onSubmit(this.state.values);
        this.clearForm();
      }
    }
    else {
      this.props.onSubmit(this.state.values);
      this.clearForm();
    }
  };

  /**
   * A function that clears all errors, values, and reset the touched fields
   */

  clearForm = () => {
    const values = {};
    const keys = Object.keys(this.state.values);
    keys.forEach(key => {
      values[key] = '';
    });
    this.setState({
      values,
      errors: [],
      touched: {},
    });
  }

  focusFirstError(errors) {
    if (errors.length > 0) {
      errors.sort((a, b) => a.order - b.order);
      this[`${errors[0].name}El`].focus();
      this.setState({ errors, });
    }
  }

  handleTouchedValidate(values) {
    if (this.props.validate) {
      const errors = this.props.validate(values);
      const cleanErrors = errors.filter(error => this.state.touched[error.name]);
      return cleanErrors;
    }
    return [];
  }

  render() {
    const { attrs, render, } = this.props;

    return (
      <form {...attrs}>
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
