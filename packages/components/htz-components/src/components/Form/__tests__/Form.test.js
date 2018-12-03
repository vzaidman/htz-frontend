/* global document */
import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';
import queryCommandStatePolyFill from '../../../test-helpers/queryCommandStatePolyFill';
import execCommandPolyfill from '../../../test-helpers/execCommandPolyfill';
import Form from '../Form'; // eslint-disable-line import/no-named-as-default
import TextInput from '../../TextInput/TextInput';
import CheckBox from '../../CheckBox/CheckBox'; // eslint-disable-line import/no-named-as-default
import RadioGroup from '../../RadioButton/RadioGroup';

// Math random used to generate random ids in TextInput,
// next row is used to produce same id everytime so tests wont fail
Math.random = jest.fn(() => 0.123456789);
const mockFunc = jest.fn();

describe('<Form>', () => {
  describe('DOM element', () => {
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(
        <Form
          onSubmit={mockFunc}
          render={({ getInputProps, handleSubmit, clearForm, }) => (
            <div>
              <TextInput
                {...getInputProps({
                  name: 'email',
                  label: 'email',
                  type: 'email',
                  id: '12345',
                })}
              />
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                <button onClick={handleSubmit}>submit</button>
                <button onClick={clearForm}>clear</button>
              </div>
            </div>
          )}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with initialValues prop', () => {
      const { component, styles, } = felaSnapshotter(
        <Form
          initialValues={{ email: 'example@email.com', }}
          onSubmit={mockFunc}
          render={({ getInputProps, handleSubmit, clearForm, }) => (
            <div>
              <TextInput
                {...getInputProps({
                  name: 'email',
                  label: 'email',
                  type: 'email',
                  id: '12345',
                })}
              />

              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                <button onClick={handleSubmit}>submit</button>
                <button onClick={clearForm}>clear</button>
              </div>
            </div>
          )}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('correctly validates an error', () => {
      const output = felaMount(
        <Form
          onSubmit={mockFunc}
          validate={({ email, text, }) => {
            const errors = [];
            if (!email) {
              errors.push({
                name: 'email',
                order: 1,
                errorText: 'must provide email',
              });
            }
            return errors;
          }}
          render={({ getInputProps, handleSubmit, clearForm, }) => (
            <div>
              <TextInput
                {...getInputProps({
                  label: 'email',
                  name: 'email',
                  type: 'email',
                })}
              />
            </div>
          )}
        />
      );
      const input = output.find('input');
      input.simulate('focus');
      input.simulate('blur');
      expect(output.state().errors[0].name).toEqual('email');
    });
    it('correctly clears a form', () => {
      const output = felaMount(
        <Form
          initialValues={{ email: 'example@email.com', }}
          onSubmit={mockFunc}
          validate={({ email, text, }) => {
            const errors = [];
            if (!email) {
              errors.push({
                name: 'email',
                order: 1,
                errorText: 'must provide email',
              });
            }
            return errors;
          }}
          render={({ getInputProps, handleSubmit, clearForm, }) => (
            <div>
              <TextInput
                {...getInputProps({
                  label: 'email',
                  name: 'email',
                  type: 'email',
                })}
              />
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                <button onClick={clearForm}>Clear</button>
              </div>
            </div>
          )}
        />
      );
      expect(output.state().values.email).toEqual('example@email.com');
      const button = output.find('button');
      button.simulate('click');
      expect(output.state().values.email).toEqual('');
    });
    it('Correctly calls onSubmit when calling handleSubmit callback', () => {
      const mockCallback = jest.fn();

      const output = felaMount(
        <Form
          initialValues={{ email: 'example@email.com', }}
          onSubmit={mockCallback}
          validate={({ email, text, }) => {
            const errors = [];
            if (!email) {
              errors.push({
                name: 'email',
                order: 1,
                errorText: 'must provide email',
              });
            }
            return errors;
          }}
          render={({ getInputProps, handleSubmit, clearForm, }) => (
            <div>
              <TextInput
                {...getInputProps({
                  label: 'email',
                  name: 'email',
                  type: 'email',
                })}
              />
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                <button onClick={handleSubmit}>submit</button>
              </div>
            </div>
          )}
        />
      );
      expect(output.state().values.email).toEqual('example@email.com');
      const button = output.find('button');
      button.simulate('click');
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith({ email: 'example@email.com', });
    });
    it('Correctly calls onSubmit when calling handleSubmit callback and there is no validate prop', () => {
      const mockCallback = jest.fn();

      const output = felaMount(
        <Form
          initialValues={{ email: 'example@email.com', }}
          onSubmit={mockCallback}
          render={({ getInputProps, handleSubmit, clearForm, }) => (
            <div>
              <TextInput
                {...getInputProps({
                  label: 'email',
                  name: 'email',
                  type: 'email',
                })}
              />
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                <button onClick={handleSubmit}>submit</button>
              </div>
            </div>
          )}
        />
      );
      expect(output.state().values.email).toEqual('example@email.com');
      const button = output.find('button');
      button.simulate('click');
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith({ email: 'example@email.com', });
    });
    it('does not call onSubmit when calling handleSubmit callback when there are errors', () => {
      const mockCallback = jest.fn();

      const output = felaMount(
        <Form
          onSubmit={mockCallback}
          validate={({ email, text, }) => {
            const errors = [];
            if (!email) {
              errors.push({
                name: 'email',
                order: 1,
                errorText: 'must provide email',
              });
            }
            if (!text) {
              errors.push({
                name: 'text',
                order: 2,
                errorText: 'must provide text',
              });
            }
            return errors;
          }}
          render={({ getInputProps, handleSubmit, clearForm, }) => (
            <div>
              <TextInput
                {...getInputProps({
                  label: 'email',
                  name: 'email',
                  type: 'email',
                })}
              />
              <TextInput
                {...getInputProps({
                  label: 'text',
                  name: 'text',
                  type: 'text',
                })}
              />
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                <button onClick={handleSubmit}>submit</button>
              </div>
            </div>
          )}
        />
      );
      const button = output.find('button');
      button.simulate('click');
      expect(mockCallback).toHaveBeenCalledTimes(0);
    });
    it('Correctly handles an input change and updates form state value', () => {
      const mockCallback = jest.fn();

      const output = felaMount(
        <Form
          onSubmit={mockCallback}
          render={({ getInputProps, handleSubmit, clearForm, }) => (
            <div>
              <TextInput
                {...getInputProps({
                  label: 'email',
                  name: 'email',
                  type: 'email',
                })}
              />
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                <button onClick={handleSubmit}>submit</button>
              </div>
            </div>
          )}
        />
      );
      const input = output.find('input');
      input.instance().value = 'new value';
      input.simulate('change');
      expect(output.state().values.email).toEqual('new value');
    });
    it('Correctly handles an CheckBox change and updates form state value', () => {
      const mockCallback = jest.fn();

      const output = felaMount(
        <Form
          onSubmit={mockCallback}
          render={({ getInputProps, handleSubmit, clearForm, }) => (
            <div>
              <CheckBox
                {...getInputProps({
                  label: 'terms',
                  name: 'terms',
                  formElementType: 'checkBox',
                })}
              />
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                <button onClick={handleSubmit}>submit</button>
              </div>
            </div>
          )}
        />
      );
      const input = output.find('input');
      input.instance().checked = true;
      input.simulate('change');
      expect(output.state().values.terms).toEqual(true);
    });
    it('Correctly handles an RadioGroup change and updates form state value', () => {
      const mockCallback = jest.fn();

      const output = felaMount(
        <Form
          onSubmit={mockCallback}
          render={({ getInputProps, handleSubmit, clearForm, }) => (
            <div>
              <RadioGroup
                {...getInputProps({
                  name: 'radio',
                  noteText: 'choose',
                  radioButtons: [
                    { value: '1', label: 'one', },
                    { value: '2', label: 'two', },
                  ],
                  formElementType: 'radio',
                })}
              />
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                <button onClick={handleSubmit}>submit</button>
              </div>
            </div>
          )}
        />
      );
      const input = output.find('input').at(0);
      input.simulate('change', { target: { value: '1', }, });
      expect(input.instance().checked).toEqual(true);
      expect(output.state().values.radio).toEqual('1');
    });
    it('Correctly handles a contentEditable change and updates form state value', () => {
      const mockCallback = jest.fn();
      const oldExecCommand = execCommandPolyfill();
      const oldQueryCommandState = queryCommandStatePolyFill();
      const output = felaMount(
        <Form
          initialValues={{ richText: 'initial', }}
          onSubmit={mockCallback}
          render={({ getInputProps, handleSubmit, clearForm, }) => (
            <TextInput
              {...getInputProps({
                label: 'richText',
                name: 'richText',
                isContentEditable: true,
              })}
            />
          )}
        />
      );
      const contentEditable = output.find({ role: 'textbox', });
      contentEditable.instance().innerHTML = 'new value';
      contentEditable.simulate('input');
      expect(output.state().values.richText).toEqual('new value');
      document.execCommand = oldExecCommand;
      document.queryCommandState = oldQueryCommandState;
    });
    it('Correctly handles a contentEditable change and updates form state value but doesnt update errors when isValidateOnChange = false prop is passed', () => {
      const mockCallback = jest.fn();
      const oldExecCommand = execCommandPolyfill();
      const oldQueryCommandState = queryCommandStatePolyFill();
      const output = felaMount(
        <Form
          initialValues={{ richText: 'initial', }}
          isValidateOnChange={false}
          validate={({ richText, }) => {
            const errors = [];
            if (!richText) {
              errors.push({
                name: 'richText',
                order: 1,
                errorText: 'must provide richText',
              });
            }
            return errors;
          }}
          onSubmit={mockCallback}
          render={({ getInputProps, handleSubmit, clearForm, }) => (
            <TextInput
              {...getInputProps({
                label: 'richText',
                name: 'richText',
                isContentEditable: true,
              })}
            />
          )}
        />
      );
      const contentEditable = output.find({ role: 'textbox', });
      contentEditable.instance().innerHTML = 'new value';
      /** make sure the input is touched so we can test not validating onInput */
      contentEditable.simulate('focus');
      contentEditable.simulate('input');
      contentEditable.simulate('blur');
      contentEditable.instance().innerHTML = '';
      contentEditable.simulate('input');
      expect(output.state().values.richText).toEqual('');
      expect(output.state().errors.length).toEqual(0);
      document.execCommand = oldExecCommand;
      document.queryCommandState = oldQueryCommandState;
    });
    it('Correctly handles a input change and updates form state value but doesnt update errors when isValidateOnChange = false prop is passed', () => {
      const mockCallback = jest.fn();
      const oldExecCommand = execCommandPolyfill();
      const oldQueryCommandState = queryCommandStatePolyFill();
      const output = felaMount(
        <Form
          initialValues={{ email: 'email@example.com', }}
          isValidateOnChange={false}
          validate={({ email, }) => {
            const errors = [];
            if (!email) {
              errors.push({
                name: 'email',
                order: 1,
                errorText: 'must provide email',
              });
            }
            return errors;
          }}
          onSubmit={mockCallback}
          render={({ getInputProps, handleSubmit, clearForm, }) => (
            <TextInput
              {...getInputProps({
                label: 'email',
                name: 'email',
              })}
            />
          )}
        />
      );
      const input = output.find('input');
      input.instance().value = 'new value';
      /** make sure the input is touched so we can test not validating onInput */
      input.simulate('focus');
      input.simulate('change');
      input.simulate('blur');
      input.instance().value = '';
      input.simulate('change');
      expect(output.state().values.email).toEqual('');
      expect(output.state().errors.length).toEqual(0);
      document.execCommand = oldExecCommand;
      document.queryCommandState = oldQueryCommandState;
    });
    it('Correctly doesnt update errors when bluring when isValidateOnBlur = false prop is passed', () => {
      const mockCallback = jest.fn();
      const oldExecCommand = execCommandPolyfill();
      const oldQueryCommandState = queryCommandStatePolyFill();
      const output = felaMount(
        <Form
          isValidateOnBlur={false}
          validate={({ email, }) => {
            const errors = [];
            if (!email) {
              errors.push({
                name: 'email',
                order: 1,
                errorText: 'must provide email',
              });
            }
            return errors;
          }}
          onSubmit={mockCallback}
          render={({ getInputProps, handleSubmit, clearForm, }) => (
            <TextInput
              {...getInputProps({
                label: 'email',
                name: 'email',
              })}
            />
          )}
        />
      );
      const input = output.find('input');
      input.simulate('focus');
      input.simulate('blur');
      input.simulate('focus');
      input.simulate('blur');
      expect(output.state().errors.length).toEqual(0);
      document.execCommand = oldExecCommand;
      document.queryCommandState = oldQueryCommandState;
    });
  });
});
