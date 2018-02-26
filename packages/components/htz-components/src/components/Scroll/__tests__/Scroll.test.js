import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import { Scroll, SCROLL_QUERY, } from '../Scroll';

describe('<Scroll>', () => {
  describe('DOM element', () => {
    it('correctly renders when passed a loading prop', () => {
      const mockFunc = jest.fn();
      const { component, styles, } = felaSnapshotter(
        <Scroll loading render={mockFunc} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
      expect(mockFunc).toHaveBeenCalledTimes(0);
    });
    it('correctly renders when passed a error prop', () => {
      const mockFunc = jest.fn();
      const { component, styles, } = felaSnapshotter(
        <Scroll error render={mockFunc} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
      expect(mockFunc).toHaveBeenCalledTimes(0);
    });
    it('correctly renders when passed a scroll prop and a render function', () => {
      const { component, styles, } = felaSnapshotter(
        <Scroll
          scroll={{ x: 0, y: 0, velocity: -5, }}
          render={({ x, y, velocity, }) => (
            <div>
              x: {x} y: {y} velocity: {velocity}
            </div>
          )}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('has the same query string', () => {
      expect(SCROLL_QUERY).toMatchSnapshot();
    });
  });
});
