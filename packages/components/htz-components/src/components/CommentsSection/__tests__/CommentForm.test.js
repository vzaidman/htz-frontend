/* global window document */
import React from 'react';
// import toJson from 'enzyme-to-json';
import { ApolloProvider, } from 'react-apollo';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';
import queryCommandStatePolyFill from '../../../test-helpers/queryCommandStatePolyFill';
import execCommandPolyfill from '../../../test-helpers/execCommandPolyfill';
import CommentForm from '../CommentForm';
import client from '../../../../styleguide/ApolloMockClient';
// Math random used to generate random ids in TextInput,
// next row is used to produce same id everytime so tests wont fail
Math.random = jest.fn(() => 123456789);
const mockFunc = jest.fn();

describe('<CommentForm>', () => {
  describe('DOM element', () => {
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(
        <ApolloProvider client={client}>
          <CommentForm
            initNewComment={mockFunc}
            signUpNotification={mockFunc}
          />
        </ApolloProvider>
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('Correctly calls closeReply Form when close button is clicked', () => {
      const mockCallback = jest.fn();
      const output = felaMount(
        <ApolloProvider client={client}>
          <CommentForm
            closeReplyForm={mockCallback}
            parentCommentId="123"
            initNewComment={mockFunc}
            signUpNotification={mockFunc}
          />
        </ApolloProvider>
      );
      const closeButton = output.find('button').at(3);
      closeButton.simulate('click');
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });
    it('Does not call initNewComment when submiting a comment without input', () => {
      const mockCallback = jest.fn();
      const output = felaMount(
        <ApolloProvider client={client}>
          <CommentForm
            closeReplyForm={mockFunc}
            parentCommentId="123"
            initNewComment={mockCallback}
            signUpNotification={mockFunc}
          />
        </ApolloProvider>
      );
      const submitButton = output.find('button').at(4);
      submitButton.simulate('click');
      expect(mockCallback).toHaveBeenCalledTimes(0);
    });
    it('Calls initNewComment when submiting a comment with input', () => {
      const mockCallback = jest.fn();
      const oldExecCommand = execCommandPolyfill();
      const oldQueryCommandState = queryCommandStatePolyFill();
      const output = felaMount(
        <ApolloProvider client={client}>
          <CommentForm
            closeReplyForm={mockFunc}
            parentCommentId="123"
            initNewComment={mockCallback}
            signUpNotification={mockFunc}
          />
        </ApolloProvider>
      );
      const input = output.find('input');
      input.instance().value = 'author value';
      input.simulate('change');
      const contentEditable = output.find({ role: 'textbox', });
      contentEditable.instance().innerHTML = 'text value';
      contentEditable.simulate('input');
      const submitButton = output.find('button').at(4);
      submitButton.simulate('click');
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith(
        'author value',
        'text value',
        '123'
      );
      document.execCommand = oldExecCommand;
      document.queryCommandState = oldQueryCommandState;
    });
    it('does not Call signUpNotification when choosing to not sign up', () => {
      const mockCallback = jest.fn();
      const oldExecCommand = execCommandPolyfill();
      const oldQueryCommandState = queryCommandStatePolyFill();
      const output = felaMount(
        <ApolloProvider client={client}>
          <CommentForm
            closeReplyForm={mockFunc}
            parentCommentId="123"
            initNewComment={mockFunc}
            signUpNotification={mockCallback}
          />
        </ApolloProvider>
      );
      const input = output.find('input');
      input.instance().value = 'author value';
      input.simulate('change');
      const contentEditable = output.find({ role: 'textbox', });
      contentEditable.instance().innerHTML = 'text value';
      contentEditable.simulate('input');
      const submitButton = output.find('button').at(4);
      submitButton.simulate('click');
      const dontSignUpButton = output.find('button').last();
      dontSignUpButton.simulate('click');
      expect(mockCallback).toHaveBeenCalledTimes(0);
      document.execCommand = oldExecCommand;
      document.queryCommandState = oldQueryCommandState;
    });
    it('Calls signUpNotification when choosing to sign up with sign up email', () => {
      const mockCallback = jest.fn();
      const oldExecCommand = execCommandPolyfill();
      const oldQueryCommandState = queryCommandStatePolyFill();
      const output = felaMount(
        <ApolloProvider client={client}>
          <CommentForm
            closeReplyForm={mockFunc}
            parentCommentId="123"
            initNewComment={mockFunc}
            signUpNotification={mockCallback}
          />
        </ApolloProvider>
      );
      const input = output.find('input');
      input.instance().value = 'author value';
      input.simulate('change');
      const contentEditable = output.find({ role: 'textbox', });
      contentEditable.instance().innerHTML = 'text value';
      contentEditable.simulate('input');
      const submitButton = output.find('button').at(4);
      submitButton.simulate('click');
      const emailInput = output.find('input');
      emailInput.instance().value = 'example@email.com';
      emailInput.simulate('change');
      const signUpButton = output.find('button').first();
      signUpButton.simulate('click');
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith('example@email.com');
      document.execCommand = oldExecCommand;
      document.queryCommandState = oldQueryCommandState;
    });
    it('Closes CommentSent Component when clicking close', () => {
      const mockCallback = jest.fn();
      const oldExecCommand = execCommandPolyfill();
      const oldQueryCommandState = queryCommandStatePolyFill();
      const output = felaMount(
        <ApolloProvider client={client}>
          <CommentForm
            closeReplyForm={mockCallback}
            parentCommentId="123"
            initNewComment={mockFunc}
            signUpNotification={mockFunc}
          />
        </ApolloProvider>
      );
      const input = output.find('input');
      input.instance().value = 'author value';
      input.simulate('change');
      const contentEditable = output.find({ role: 'textbox', });
      contentEditable.instance().innerHTML = 'text value';
      contentEditable.simulate('input');
      const submitButton = output.find('button').at(4);
      submitButton.simulate('click');
      const emailInput = output.find('input');
      emailInput.instance().value = 'example@email.com';
      emailInput.simulate('change');
      const signUpButton = output.find('button').first();
      signUpButton.simulate('click');
      const closeButton = output.find('button');
      closeButton.simulate('click');
      expect(mockCallback).toHaveBeenCalledTimes(1);
      document.execCommand = oldExecCommand;
      document.queryCommandState = oldQueryCommandState;
    });
  });
});
