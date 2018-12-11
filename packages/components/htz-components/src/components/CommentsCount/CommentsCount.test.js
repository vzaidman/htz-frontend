import React from 'react';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
import CommentsCount from './CommentsCount';

describe('<CommentsCount>', () => {
  describe('DOM element', () => {
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(<CommentsCount />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with color, size and commentsCount', () => {
      const { component, styles, } = felaSnapshotter(
        <CommentsCount size={2} commentsCount={32} color={[ 'primary', '-1', ]} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with miscStyles', () => {
      const { component, styles, } = felaSnapshotter(
        <CommentsCount
          size={3}
          commentsCount={12}
          color={[ 'quaternary', '+3', ]}
          miscStyles={{ display: 'block', marginInlineEnd: '5rem', }}
          textMiscStyles={{ paddingInlineStart: '0.2rem', }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('should render nothing when commentsCount is smaller than minCount', () => {
      const { component, } = felaSnapshotter(
        <CommentsCount
          minCount={5}
          commentsCount={4}
        />
      );
      expect(component).toMatchSnapshot();
    });
  });
});
