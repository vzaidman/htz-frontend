/* global window */
import React from 'react';
import matchMediaPolyfill from 'mq-polyfill';
import { ApolloProvider, } from 'react-apollo';
import client from '../../../../styleguide/ApolloMockClient';
// import toJson from 'enzyme-to-json';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';
// import mockTheme from '../../../test-helpers/commentsMockTheme';
import Comment from '../Comment'; // eslint-disable-line import/no-named-as-default

// Math random used to generate random ids in TextInput,
// next row is used to produce same id everytime so tests wont fail
Math.random = jest.fn(() => 123456789);

const bps = Object.freeze({
  widths: Object.freeze({
    s: 600,
    m: 768,
    l: 1024,
    xl: 1280,
  }),
  misc: Object.freeze({
    landscape: '(orientation: landscape)',
    portrait: '(orientation: portrait)',
    hidpi: '(min-resolution: 1.5dppx)',
  }),
});

const typeConf = Object.freeze({
  default: Object.freeze({
    base: 16,
    minPadding: 2,
    ratio: 2,
    rhythmUnit: 6,
    steps: 5,
  }),
  xl: Object.freeze({
    base: 18,
    minPadding: 2,
    ratio: 2,
    rhythmUnit: 7,
    steps: 5,
  }),
});

const mockFunc = jest.fn();

describe('<Comment>', () => {
  describe('DOM element', () => {
    matchMediaPolyfill(window);
    window.resizeTo = resizeTo;
    window.resizeTo(1100, 768);
    it('renders correctly with minimum required props', () => {
      const { component, styles, } = felaSnapshotter(
        <Comment
          bps={bps}
          typeConf={typeConf}
          key="comment.commentId"
          commentId="comment.commentId"
          author="comment.author"
          publishingDateForDisplay="10:30"
          commentNumber={1}
          initVote={mockFunc}
          reportAbuse={mockFunc}
          initNewComment={mockFunc}
          signUpNotification={mockFunc}
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
    it('renders correctly with truncated comment', () => {
      const { component, styles, } = felaSnapshotter(
        <Comment
          bps={bps}
          typeConf={typeConf}
          key="comment.commentId"
          commentId="comment.commentId"
          author="comment.author"
          publishingDateForDisplay="10:30"
          commentNumber={1}
          initVote={mockFunc}
          reportAbuse={mockFunc}
          initNewComment={mockFunc}
          signUpNotification={mockFunc}
        />,
        {
          createNodeMock: element =>
            (element.type === 'div' ? { clientHeight: 1064, } : null),
        }
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with title prop', () => {
      const { component, styles, } = felaSnapshotter(
        <Comment
          bps={bps}
          typeConf={typeConf}
          key="comment.commentId"
          commentId="comment.commentId"
          author="comment.author"
          title="comment.title"
          publishingDateForDisplay="10:30"
          commentNumber={1}
          initVote={mockFunc}
          reportAbuse={mockFunc}
          initNewComment={mockFunc}
          signUpNotification={mockFunc}
        />,
        {
          createNodeMock: element =>
            (element.type === 'div' ? { clientHeight: 26, } : null),
        }
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with commentText prop', () => {
      const { component, styles, } = felaSnapshotter(
        <Comment
          bps={bps}
          typeConf={typeConf}
          key="comment.commentId"
          commentId="comment.commentId"
          author="comment.author"
          commentText="simpleText"
          publishingDateForDisplay="10:30"
          commentNumber={1}
          initVote={mockFunc}
          reportAbuse={mockFunc}
          initNewComment={mockFunc}
          signUpNotification={mockFunc}
        />,
        {
          createNodeMock: element =>
            (element.type === 'div' ? { clientHeight: 26, } : null),
        }
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with isEditorPick true', () => {
      const { component, styles, } = felaSnapshotter(
        <Comment
          bps={bps}
          typeConf={typeConf}
          key="comment.commentId"
          commentId="comment.commentId"
          author="comment.author"
          isEditorPick="true"
          publishingDateForDisplay="10:30"
          commentNumber={1}
          initVote={mockFunc}
          reportAbuse={mockFunc}
          initNewComment={mockFunc}
          signUpNotification={mockFunc}
        />,
        {
          createNodeMock: element =>
            (element.type === 'div' ? { clientHeight: 26, } : null),
        }
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with comments plus rate and minus rate props', () => {
      const { component, styles, } = felaSnapshotter(
        <Comment
          bps={bps}
          typeConf={typeConf}
          key="comment.commentId"
          commentId="comment.commentId"
          author="comment.author"
          publishingDateForDisplay="10:30"
          commentNumber={1}
          commentsPlusRate={{
            'comment.commentId': 5,
          }}
          commentsMinusRate={{
            'comment.commentId': 3,
          }}
          initVote={mockFunc}
          reportAbuse={mockFunc}
          initNewComment={mockFunc}
          signUpNotification={mockFunc}
        />,
        {
          createNodeMock: element =>
            (element.type === 'div' ? { clientHeight: 26, } : null),
        }
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with comments plus rate and minus rate props that create a usersChoice flag', () => {
      const { component, styles, } = felaSnapshotter(
        <Comment
          bps={bps}
          typeConf={typeConf}
          key="comment.commentId"
          commentId="comment.commentId"
          author="comment.author"
          publishingDateForDisplay="10:30"
          commentNumber={1}
          commentsPlusRate={{
            'comment.commentId': 15,
          }}
          commentsMinusRate={{
            'comment.commentId': 3,
          }}
          initVote={mockFunc}
          reportAbuse={mockFunc}
          initNewComment={mockFunc}
          signUpNotification={mockFunc}
        />,
        {
          createNodeMock: element =>
            (element.type === 'div' ? { clientHeight: 26, } : null),
        }
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly as a first subComment', () => {
      const { component, styles, } = felaSnapshotter(
        <Comment
          bps={bps}
          typeConf={typeConf}
          key="comment.commentId"
          commentId="comment.commentId"
          author="comment.author"
          publishingDateForDisplay="10:30"
          commentNumber={1}
          isSubComment
          isFirstSubComment
          initVote={mockFunc}
          reportAbuse={mockFunc}
          initNewComment={mockFunc}
          signUpNotification={mockFunc}
        />,
        {
          createNodeMock: element =>
            (element.type === 'div' ? { clientHeight: 26, } : null),
        }
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly as a last subComment', () => {
      const { component, styles, } = felaSnapshotter(
        <Comment
          bps={bps}
          typeConf={typeConf}
          key="comment.commentId"
          commentId="comment.commentId"
          author="comment.author"
          publishingDateForDisplay="10:30"
          commentNumber={1}
          isSubComment
          isLastSubComment
          initVote={mockFunc}
          reportAbuse={mockFunc}
          initNewComment={mockFunc}
          signUpNotification={mockFunc}
        />,
        {
          createNodeMock: element =>
            (element.type === 'div' ? { clientHeight: 26, } : null),
        }
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly as a last subComment', () => {
      const { component, styles, } = felaSnapshotter(
        <Comment
          bps={bps}
          typeConf={typeConf}
          key="comment.commentId"
          commentId="comment.commentId"
          author="comment.author"
          publishingDateForDisplay="10:30"
          commentNumber={1}
          subComments={[
            {
              author: 'רן',
              title: '@הורנר@',
              commentText: 'I am a subComment',
              publishingDateForDisplay: '09:36',
              commentId: '19.9522362',
              reviewState: 'nr',
              isEditorPick: 'false',
              publishingDateSortable: '20171119002050',
            },
          ]}
          initVote={mockFunc}
          reportAbuse={mockFunc}
          initNewComment={mockFunc}
          signUpNotification={mockFunc}
        />,
        {
          createNodeMock: element =>
            (element.type === 'div' ? { clientHeight: 26, } : null),
        }
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    // TODO unskip on Enzyme React16 support
    it.skip('correctly calls reportAbuse function', () => {
      const reportAbuse = jest.fn();
      const output = felaMount(
        <Comment
          bps={bps}
          typeConf={typeConf}
          key="comment.commentId"
          commentId="comment.commentId"
          author="comment.author comment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.author"
          publishingDateForDisplay="10:30"
          commentNumber={1}
          initVote={mockFunc}
          reportAbuse={reportAbuse}
          initNewComment={mockFunc}
          signUpNotification={mockFunc}
        />
      );
      const reportButton = output.find('button').at(3);
      reportButton.simulate('click');
      expect(reportAbuse).toHaveBeenCalledTimes(1);
      expect(reportAbuse).toHaveBeenCalledWith('comment.commentId');
    });
    // TODO unskip on Enzyme React16 support
    it.skip('correctly calls handles a click on reply form', () => {
      const output = felaMount(
        <ApolloProvider client={client}>
          <Comment
            bps={bps}
            typeConf={typeConf}
            key="comment.commentId"
            commentId="comment.commentId"
            author="comment.author comment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.author"
            publishingDateForDisplay="10:30"
            commentNumber={1}
            initVote={mockFunc}
            reportAbuse={mockFunc}
            initNewComment={mockFunc}
            signUpNotification={mockFunc}
          />
        </ApolloProvider>
      );
      const replyButton = output.find('button').at(0);
      replyButton.simulate('click');
      // todo: add snapshots after figuring out a way to remove theme from the snapshot
      // expect(toJson(output)).toMatchSnapshot();
      const closeReplyButton = output.find('button').at(7);
      closeReplyButton.simulate('click');
      // todo: add snapshots after figuring out a way to remove theme from the snapshot
      // expect(toJson(output)).toMatchSnapshot();
    });
    // it('correctly handles clicking on commentAuthor', () => {
    //   const output = felaMount(
    //     <Comment
    //       key="comment.commentId"
    //       commentId="comment.commentId"
    //       author="comment.author comment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.authorcomment.author"
    //       publishingDateForDisplay="10:30"
    //       commentNumber={1}
    //       initVote={(commentId, rate) =>
    //         console.log(`initVote from Comment.md commentId: ${commentId} rate: ${rate}`)
    //       }
    //       reportAbuse={(commentId, captchaKey) =>
    //         console.log(
    //           `report abuse from Comment.md comment Id: ${commentId}  captchaKey: ${captchaKey}`
    //         )
    //       }
    //       initNewComment={(commentAuthor, commentHtml, parentCommentId) =>
    //         console.log(
    //           `init Comment from Comment.md commentAuthor: ${commentAuthor}, commentHtml: ${
    //             commentHtml
    //           } parentCommentId: ${parentCommentId}`
    //         )
    //       }
    //       signUpNotification={email =>
    //         console.log(`sign up comment notifications from Comment.md email: ${email}`)
    //       }
    //     />
    //   );
    //   const commentAuthor = output.find({ 'data-test': 'comment-author', }).last();
    //   console.log(commentAuthor.props());
    //   console.log(commentAuthor.find('h4').simulate('click'));
    //   console.log(commentAuthor.props());
    //   // expect(toJson(output)).toMatchSnapshot();
    //   expect(commentAuthor.length).toEqual(5);
    // });
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
