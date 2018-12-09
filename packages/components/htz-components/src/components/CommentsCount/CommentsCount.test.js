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
      it('renders correctly with iconColor, size and commentsCount', () => {
        const { component, styles, } = felaSnapshotter(<CommentsCount size={2} commentsCount={32} iconColor={["primary", "-1"]} />);
        expect(component).toMatchSnapshot();
        expect(styles).toMatchSnapshot();
      });
      it('renders correctly with miscStyles', () => {
        const { component, styles, } = felaSnapshotter( 
            <CommentsCount 
              size={3}
              commentsCount={12}
              iconColor={["quaternary", "+3"]}
              miscStyles={{ display: 'block', marginInlineEnd: '5rem', }} 
              textMiscStyles={{ paddingInlineStart: '0.2rem'}}
           />
          );
        expect(component).toMatchSnapshot();
        expect(styles).toMatchSnapshot();
      });
    })
});   
