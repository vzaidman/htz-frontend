/* global window */
import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';
import CommentSent from '../CommentSent'; // eslint-disable-line import/no-named-as-default

// Math random used to generate random ids in TextInput,
// next row is used to produce same id everytime so tests wont fail
Math.random = jest.fn(() => 123456789);
const mockFunc = jest.fn();

describe('<CommentSent>', () => {
  describe('DOM element', () => {
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(
        <CommentSent
          closeDisplayThankYou={mockFunc}
          displayThankYou={false}
          signUpNotification={mockFunc}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with minimal required props, display Thank you true', () => {
      const { component, styles, } = felaSnapshotter(
        <CommentSent
          closeDisplayThankYou={mockFunc}
          displayThankYou
          signUpNotification={mockFunc}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('Calls close displayThankYou callback when close button is clicked', () => {
      const mockCallback = jest.fn();
      const output = felaMount(
        <CommentSent
          closeDisplayThankYou={mockCallback}
          displayThankYou
          signUpNotification={mockFunc}
        />
      );
      const closeButton = output.find('button');
      closeButton.simulate('click');
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });
    it('Calls signUpNotification with true as the first argument and the value from the email input as the second when update me button is clicked', () => {
      const mockCallback = jest.fn();
      const output = felaMount(
        <CommentSent
          closeDisplayThankYou={() => console.log('close display thank you')}
          displayThankYou={false}
          signUpNotification={mockCallback}
        />
      );
      const input = output.find('input');
      input.instance().value = 'email@example.com';
      input.simulate('change');
      const submitButton = output.find('button').first();
      submitButton.simulate('click');
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith(true, 'email@example.com');
    });
    it('Does not Call signUpNotification when an invalid email is entered', () => {
      const mockCallback = jest.fn();
      const output = felaMount(
        <CommentSent
          closeDisplayThankYou={() => console.log('close display thank you')}
          displayThankYou={false}
          signUpNotification={mockCallback}
        />
      );
      const submitButton = output.find('button').first();
      submitButton.simulate('click');
      const input = output.find('input');
      input.instance().value = 'emailinvalid';
      input.simulate('change');
      submitButton.simulate('click');
      expect(mockCallback).toHaveBeenCalledTimes(0);
      // todo: add snapshots after figuring out a way to remove theme from the snapshot
      // expect(output).toMatchSnapshot();
    });
    it('Calls signUpNotification with false as the argument when no Thanks button is clicked', () => {
      const mockCallback = jest.fn();
      const output = felaMount(
        <CommentSent
          closeDisplayThankYou={() => console.log('close display thank you')}
          displayThankYou={false}
          signUpNotification={mockCallback}
        />
      );
      const submitButton = output.find('button').last();
      submitButton.simulate('click');
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith(false);
    });
  });
});
