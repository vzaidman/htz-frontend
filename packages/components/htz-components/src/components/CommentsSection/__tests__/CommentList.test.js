/* global window */
import React from 'react';
import matchMediaPolyfill from 'mq-polyfill';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import CommentList from '../CommentList'; // eslint-disable-line import/no-named-as-default

// Math random used to generate random ids in TextInput,
// next row is used to produce same id everytime so tests wont fail
Math.random = jest.fn(() => 0.123456789);
const mockFunc = jest.fn();

describe('<Comment>', () => {
  describe('DOM element', () => {
    matchMediaPolyfill(window);
    window.resizeTo = resizeTo;
    window.resizeTo(1100, 768);
    it('renders correctly with required props', () => {
      const { component, styles, } = felaSnapshotter(
        <CommentList
          initVote={mockFunc}
          reportAbuse={mockFunc}
          comments={[
            {
              author:
                'אורי ויסלאורי ויסלאורי ויסלאורי ויסלאורי ויסלאורי ויסלאורי ויסלאורי ויסלאורי ויסלאורי ויסלאורי ויסלאורי ויסלר',
              title: 'התמונה בכתבה היא בסבירות גבוהה לא מבאבי יאר',
              commentText:
                'long text sdmgalkgmlaskgmaslkg lsdlk jasldk lsdkj lksajg lskdgjaslkdgjmlaskgjmlasdkgjmslkdgmsldk sdlkmg slakgmsdgasdgb;l,sad;lgb,s;adb,b fl;,b ;dflb,df;lb, dsdfagkjerngkjawn vkrj vkrejv erkjv krejgv krj vkrwej vkrjv kjrv krjv erkj vrej  v',
              publishingDateForDisplay: '08:57',
              commentId: '19.9522183',
              reviewState: 'nr',
              isEditorPick: 'true',
              publishingDateSortable: '20171119002030',
            },
          ]}
          totalHits={1}
        />,
        {
          createNodeMock: element => {
            if (element.type === 'div') {
              return { clientHeight: 24, };
            }
            return null;
          },
        }
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
  });
});

function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'));
}
