import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';
import { ScrollStoreMutator, UPDATE_SCROLL, } from '../ScrollStoreMutator';

describe('<ScrollStoreMutator>', () => {
  describe('DOM element', () => {
    it('correctly doesnt render anything with minimal required props', () => {
      const mockFunc = jest.fn();
      const { component, styles, } = felaSnapshotter(
        <ScrollStoreMutator throttle={100} x={0} y={0} mutate={mockFunc} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('calls mutate function with the correct params', () => {
      const onMutate = jest.fn();
      const output = felaMount(
        <ScrollStoreMutator throttle={100} x={0} y={0} mutate={onMutate} />
      );
      output.setProps({ y: 100, x: 50, });
      expect(onMutate).toHaveBeenCalledWith({
        variables: { x: 50, y: 100, velocity: -1, },
      });
    });
    it('calls doesnt call mutate if x and y dont change', () => {
      const onMutate = jest.fn();
      const output = felaMount(
        <ScrollStoreMutator throttle={100} x={100} y={50} mutate={onMutate} />
      );
      output.setProps({ y: 50, x: 100, });
      expect(onMutate).toHaveBeenCalledTimes(0);
    });
    it('has the same mutation query string', () => {
      expect(UPDATE_SCROLL).toMatchSnapshot();
    });
  });
});
