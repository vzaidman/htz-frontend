/* global window */
import React from 'react';
import matchMediaPolyfill from 'mq-polyfill';
import { ApolloProvider, } from 'react-apollo';
import client from '../../../../styleguide/ApolloMockClient';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';
import CommentsSection from '../CommentsSection';

// Math random used to generate random ids in TextInput,
// next row is used to produce same id everytime so tests wont fail
Math.random = jest.fn(() => 123456789);
const requiredFunc = jest.fn();

describe('<CommentsSection>', () => {
  describe('DOM element', () => {
    matchMediaPolyfill(window);
    window.resizeTo = resizeTo;
    window.resizeTo(1100, 768);
    it('renders correctly with minimum required props', () => {
      const { component, styles, } = felaSnapshotter(
        <ApolloProvider client={client}>
          <CommentsSection
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
          />
        </ApolloProvider>,
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
    // TODO unskip on Enzyme React16 support
    it.skip('correctly changes sorting order according to dateAscending', () => {
      const output = felaMount(
        <ApolloProvider client={client}>
          <CommentsSection
            initVote={requiredFunc}
            reportAbuse={requiredFunc}
            initNewComment={requiredFunc}
            signUpNotification={requiredFunc}
            loadAllComments={requiredFunc}
            comments={[
              {
                author: 'second',
                commentText: 'second second',
                publishingDateForDisplay: '08:57',
                commentId: '19.9522181',
                reviewState: 'nr',
                isEditorPick: 'true',
                publishingDateSortable: '20171119002035',
              },
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
            ]}
            totalHits={2}
          />
        </ApolloProvider>
      );
      expect(output.find('CommentList').props().comments[0].author).toEqual(
        'second'
      );
      output
        .find('Select')
        .instance()
        .props.onChange({ value: 'dateAscending', });
      output.update();
      expect(output.find('CommentList').props().comments[0].author).toEqual(
        'first'
      );
    });
    // TODO unskip on Enzyme React16 support
    it.skip('correctly changes sorting order according to commentRating', () => {
      const output = felaMount(
        <ApolloProvider client={client}>
          <CommentsSection
            initVote={requiredFunc}
            reportAbuse={requiredFunc}
            initNewComment={requiredFunc}
            signUpNotification={requiredFunc}
            loadAllComments={requiredFunc}
            comments={[
              {
                author: 'first when sorting by rating',
                title: 'first',
                commentText: 'first first',
                publishingDateForDisplay: '08:57',
                commentId: '19.9522183',
                reviewState: 'nr',
                isEditorPick: 'true',
                publishingDateSortable: '20171119002030',
              },
              {
                author: 'should be first default load',
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
              19.9522181: 50,
              19.9522183: 140,
            }}
            commentsMinusRate={{
              19.9522181: 0,
              19.9522183: 2,
            }}
          />
        </ApolloProvider>
      );
      expect(output.find('CommentList').props().comments[0].author).toEqual(
        'should be first default load'
      );
      output
        .find('Select')
        .instance()
        .props.onChange({ value: 'commentRating', });
      output.update();
      expect(output.find('CommentList').props().comments[0].author).toEqual(
        'first when sorting by rating'
      );
    });
    // TODO unskip on Enzyme React16 support
    it.skip('correctly changes sorting order according to editorsPick', () => {
      const output = felaMount(
        <ApolloProvider client={client}>
          <CommentsSection
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
                isEditorPick: 'false',
                publishingDateSortable: '20171119002050',
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
                author: 'third and editorsPick',
                commentText: 'second second',
                publishingDateForDisplay: '08:57',
                commentId: '19.9551181',
                reviewState: 'nr',
                isEditorPick: 'true',
                publishingDateSortable: '20171119002025',
              },
              {
                author: 'fourth',
                commentText: 'second second',
                publishingDateForDisplay: '08:57',
                commentId: '19.9522187',
                reviewState: 'nr',
                isEditorPick: 'true',
                publishingDateSortable: '20171119002020',
              },
            ]}
            totalHits={2}
            commentsPlusRate={{
              19.9522181: 50,
              19.9522183: 14,
            }}
            commentsMinusRate={{
              19.9522181: 0,
              19.9522183: 2,
            }}
          />
        </ApolloProvider>
      );
      expect(output.find('CommentList').props().comments[0].author).toEqual(
        'first'
      );
      output
        .find('Select')
        .instance()
        .props.onChange({ value: 'editorsPick', });
      output.update();
      expect(output.find('CommentList').props().comments[0].author).toEqual(
        'third and editorsPick'
      );
      expect(output.find('CommentList').props().comments[1].author).toEqual(
        'fourth'
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
