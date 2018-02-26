import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';
import Like from '../Like'; // eslint-disable-line import/no-named-as-default

const mockFunc = jest.fn();

describe('<Like>', () => {
  describe('DOM element', () => {
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(
        <Like initVote={mockFunc} commentId="12345" />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with custom iconsColor', () => {
      const { component, styles, } = felaSnapshotter(
        <Like initVote={mockFunc} commentId="12345" iconColor="facebook" />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('correctly calls initVote function with plus rate', () => {
      const mockCallback = jest.fn();
      const output = felaMount(
        <Like
          initVote={(commentId, rate) => mockCallback(commentId, rate)}
          commentId="12345"
          iconsColor="facebook"
        />
      );
      const plusButton = output.find('button').first();
      plusButton.simulate('click');
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith('12345', 'plus');
    });
    it('correctly calls initVote function with plus rate', () => {
      const mockCallback = jest.fn();
      const output = felaMount(
        <Like
          initVote={(commentId, rateSign) => mockCallback(commentId, rateSign)}
          commentId="12345"
          iconColor="facebook"
        />
      );
      const button = output.find('button');
      button.simulate('click');
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith('12345', 'plus');
    });
    it('correctly calls initVote function with minus rate', () => {
      const mockCallback = jest.fn();
      const output = felaMount(
        <Like
          initVote={(commentId, rateSign) => mockCallback(commentId, rateSign)}
          commentId="12345"
          iconColor="facebook"
          isDisLike
        />
      );
      const button = output.find('button');
      button.simulate('click');
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith('12345', 'minus');
    });
  });
});
