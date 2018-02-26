/* global window */
import React from 'react';
import matchMediaPolyfill from 'mq-polyfill';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';
import CommentSectionWithTheme, { CommentsSection, } from '../CommentsSection';

// Math random used to generate random ids in TextInput,
// next row is used to produce same id everytime so tests wont fail
Math.random = jest.fn(() => 123456789);
const requiredFunc = jest.fn();

const mockTheme = {
  commentsSectionI18n: {
    buttons: Object.freeze({
      loadAllCommentsBtnText: 'טען את כל התגובות',
    }),
    selectItems: Object.freeze({
      dateDescendingItemTxt: 'מהאחרונה לראשונה',
      dateAscendingItemTxt: 'מהראשונה לאחרונה',
      commentRatingItemTxt: 'הצג לפי דירוג',
      editorsPickItemTxt: 'בחירת העורכים',
    }),
    texts: Object.freeze({
      chooseSortMethodText: 'סדרו את התגובות',
    }),
  },
};

describe('<CommentSection>', () => {
  describe('DOM element', () => {
    matchMediaPolyfill(window);
    window.resizeTo = resizeTo;
    window.resizeTo(1100, 768);
    it('renders correctly with minimum required props', () => {
      const { component, styles, } = felaSnapshotter(
        <CommentSectionWithTheme
          initVote={requiredFunc}
          reportAbuse={requiredFunc}
          initNewComment={requiredFunc}
          signUpNotification={requiredFunc}
          loadAllComments={requiredFunc}
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
    it('correctly changes sorting order according to dateAscending', () => {
      const output = felaMount(
        <CommentsSection
          theme={mockTheme}
          initVote={requiredFunc}
          reportAbuse={requiredFunc}
          initNewComment={requiredFunc}
          signUpNotification={requiredFunc}
          loadAllComments={requiredFunc}
          comments={[
            {
              author: 'first',
              title: 'first',
              commentText: 'first first',
              publishingDateForDisplay: '08:57',
              commentId: '19.9522183',
              reviewState: 'nr',
              isEditorPick: 'true',
              publishingDateSortable: '20171119002030',
            },
            {
              author: 'second',
              commentText: 'second second',
              publishingDateForDisplay: '08:57',
              commentId: '19.9522181',
              reviewState: 'nr',
              isEditorPick: 'true',
              publishingDateSortable: '20171119002035',
            },
          ]}
          totalHits={2}
        />
      );
      expect(output.find('CommentList').props().comments[0].author).toEqual(
        'second'
      );
      output.setState({ sortMethod: { value: 'dateAscending', }, });
      expect(output.find('CommentList').props().comments[0].author).toEqual(
        'first'
      );
    });
    it('correctly changes sorting order according to commentRating', () => {
      const output = felaMount(
        <CommentsSection
          theme={mockTheme}
          initVote={requiredFunc}
          reportAbuse={requiredFunc}
          initNewComment={requiredFunc}
          signUpNotification={requiredFunc}
          loadAllComments={requiredFunc}
          comments={[
            {
              author: 'first and better rating',
              title: 'first',
              commentText: 'first first',
              publishingDateForDisplay: '08:57',
              commentId: '19.9522183',
              reviewState: 'nr',
              isEditorPick: 'true',
              publishingDateSortable: '20171119002030',
            },
            {
              author: 'second',
              commentText: 'second second',
              publishingDateForDisplay: '08:57',
              commentId: '19.9522181',
              reviewState: 'nr',
              isEditorPick: 'true',
              publishingDateSortable: '20171119002035',
            },
          ]}
          totalHits={2}
          commentsPlusRate={{
            19.9522181: 5,
            19.9522183: 14,
          }}
          commentsMinusRate={{
            19.9522181: 0,
            19.9522183: 2,
          }}
        />
      );
      expect(output.find('CommentList').props().comments[0].author).toEqual(
        'second'
      );
      output.setState({ sortMethod: { value: 'commentRating', }, });
      expect(output.find('CommentList').props().comments[0].author).toEqual(
        'first and better rating'
      );
    });
    it('correctly changes sorting order according to editorsPick', () => {
      const output = felaMount(
        <CommentsSection
          theme={mockTheme}
          initVote={requiredFunc}
          reportAbuse={requiredFunc}
          initNewComment={requiredFunc}
          signUpNotification={requiredFunc}
          loadAllComments={requiredFunc}
          comments={[
            {
              author: 'first and editorsPick',
              title: 'first',
              commentText: 'first first',
              publishingDateForDisplay: '08:57',
              commentId: '19.9522183',
              reviewState: 'nr',
              isEditorPick: 'true',
              publishingDateSortable: '20171119002028',
            },
            {
              author: 'second',
              commentText: 'second second',
              publishingDateForDisplay: '08:57',
              commentId: '19.9522181',
              reviewState: 'nr',
              isEditorPick: 'false',
              publishingDateSortable: '20171119002035',
            },
            {
              author: 'third',
              commentText: 'second second',
              publishingDateForDisplay: '08:57',
              commentId: '19.9522181',
              reviewState: 'nr',
              isEditorPick: 'true',
              publishingDateSortable: '20171119002027',
            },
            {
              author: 'fourth',
              commentText: 'second second',
              publishingDateForDisplay: '08:57',
              commentId: '19.9522181',
              reviewState: 'nr',
              isEditorPick: 'false',
              publishingDateSortable: '20171119002029',
            },
          ]}
          totalHits={2}
          commentsPlusRate={{
            19.9522181: 5,
            19.9522183: 14,
          }}
          commentsMinusRate={{
            19.9522181: 0,
            19.9522183: 2,
          }}
        />
      );
      expect(output.find('CommentList').props().comments[0].author).toEqual(
        'second'
      );
      output.setState({ sortMethod: { value: 'editorsPick', }, });
      expect(output.find('CommentList').props().comments[0].author).toEqual(
        'first and editorsPick'
      );
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
