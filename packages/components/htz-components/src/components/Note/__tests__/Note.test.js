import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Note from '../Note';

describe('<Note>', () => {
  describe('DOM element', () => {
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(<Note text="text" id="1234" />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with `isError prop', () => {
      const { component, styles, } = felaSnapshotter(<Note isError text="error text" id="1234" />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
  });
});
