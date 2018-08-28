import React from 'react';
import PropTypes from 'prop-types';
import { FelaTheme, FelaComponent, } from 'react-fela';
import Recaptcha from 'react-google-invisible-recaptcha';
import CommentForm from './CommentForm';
import CommentList from './CommentList'; // eslint-disable-line import/no-named-as-default
import Select from '../Select/Select'; // eslint-disable-line import/no-named-as-default
import Button from '../Button/Button'; // eslint-disable-line import/no-named-as-default

const SelectStyle = {
  width: '28rem',
  marginInlineStart: '2.3rem',
};
class CommentsSection extends React.Component {
  static propTypes = {
    /**
     * An Array of comment objects
     */
    comments: PropTypes.arrayOf(PropTypes.object),
    /**
     * An Object holding the Minus Rates of all the comments in the `CommentsElement`.
     * The Object has an id key for each comment that has at least one Minus vote.
     * The corresponding value is the total number of Minus votes the comment has.
     */
    commentsMinusRate: PropTypes.shape({
      id: PropTypes.number,
    }),
    /**
     * An Object holding the Plus Rates of all the comments in the `CommentsElement`.
     * The Object has an id key for each comment that has at least one Plus vote.
     * The corresponding value is the rate of Plus votes the comment has.
     */
    commentsPlusRate: PropTypes.shape({
      id: PropTypes.number,
    }),
    /**
     * A callback passed on to the reply `<CommentForm />`
     * @param {String} commentAuthor
     *   The new comment author
     * @param {String} commentTextHtml
     *   The new comment text innerHTML
     * @param {String} parentCommentId
     *   The parent CommentId. Defaults to '0' if there is no `parentCommentId`
     */
    initNewComment: PropTypes.func.isRequired,
    /**
     * A callaback that initiates a vote, `<Likes />` sends up the commentId and the rate ("plus"/"minus")
     */
    initVote: PropTypes.func.isRequired,
    /** A callback that get's called when clicking load more button */
    loadAllComments: PropTypes.func.isRequired,
    /**
     * A CallBack that gets called `onReCaptchaResolve`,
     * `onSubmitCaptcha` which executes the captcha gets called when the
     * reportAbuse event from `<CommentList />` gets called, it saves the commentId in
     * `<CommentSection/>` state to later use `onCaptchaResolve`
     * @param {String} commentId - commentId
     * @param {String} captchaKey - captchaKey
     */
    reportAbuse: PropTypes.func.isRequired,
    /**
     * A callback that gets the called when submitting the sign up to notification form in `<CommentSent />`
     * @param {String} - notificationEmail - The email the user entered
     */
    signUpNotification: PropTypes.func.isRequired,
    /** used to calculate comment numbers */
    totalHits: PropTypes.number.isRequired,
  };

  static defaultProps = {
    comments: [],
    commentsPlusRate: {},
    commentsMinusRate: {},
  };

  state = {
    sortMethod: { value: 'dateDescending', display: 'מהאחרונה לראשונה', },
    reportCommentId: null,
    maxCommentsToRender: 10,
  };

  onSubmitCaptcha = commentId => {
    this.setState({ reportCommentId: commentId, });
    this.recaptcha.execute();
  };

  onReCaptchaResolve = () => {
    console.log('on recaptcha resolved');
    const captchaKey = this.recaptcha.getResponse();
    this.props.reportAbuse(this.state.reportCommentId, captchaKey);
    this.setState({ reportCommentId: null, });
    this.recaptcha.reset();
  };

  getCommentNetRate(commentId) {
    const commentPlusRate = Object.prototype.hasOwnProperty.call(
      this.props.commentsPlusRate,
      commentId
    )
      ? this.props.commentsPlusRate[commentId]
      : 0;
    const commentMinusRate = Object.prototype.hasOwnProperty.call(
      this.props.commentsMinusRate,
      commentId
    )
      ? this.props.commentsMinusRate[commentId]
      : 0;

    return commentPlusRate - commentMinusRate;
  }

  getCommentsWithNumber(comments) {
    const sortedComments = comments.concat().sort(this.sortCommentsByMethod('dateDescending'));
    const sortedCommentsWithNumbers = sortedComments.map((comment, idx) => ({
      ...comment,
      number: this.props.totalHits - idx,
    }));

    return sortedCommentsWithNumbers;
  }

  // number of additional comments to render each time load more button is clicked
  commentPaginationCount = 50;

  sortCommentsByMethod(orderName) {
    if (orderName === 'dateAscending') {
      return (a, b) => a.publishingDateSortable - b.publishingDateSortable;
    }
    else if (orderName === 'commentRating') {
      return (a, b) => this.getCommentNetRate(b.commentId) - this.getCommentNetRate(a.commentId);
    }
    else if (orderName === 'editorsPick') {
      return (a, b) => (a.isEditorPick === b.isEditorPick ? 0 : a.isEditorPick === 'true' ? -1 : 1);
    }
    return (a, b) => b.publishingDateSortable - a.publishingDateSortable;
  }

  sortComments(comments) {
    const commentsWithNumber = this.getCommentsWithNumber(comments);
    return commentsWithNumber
      .concat()
      .sort(this.sortCommentsByMethod(this.state.sortMethod.value))
      .slice(0, this.state.maxCommentsToRender - 1);
  }

  loadComments() {
    if (this.props.totalHits > this.props.comments.length) {
      this.props.loadAllComments();
    }
  }

  render() {
    const {
      initNewComment,
      signUpNotification,
      comments,
      commentsPlusRate,
      commentsMinusRate,
      initVote,
      totalHits,
    } = this.props;

    return (
      <FelaTheme
        render={({
          commentsSectionI18n: {
            buttons: { loadMoreCommentsBtnText, },
            texts: { chooseSortMethodText, },
            selectItems: {
              dateDescendingItemTxt,
              dateAscendingItemTxt,
              commentRatingItemTxt,
              editorsPickItemTxt,
            },
          },
        }) => (
          <FelaComponent
            style={theme => ({
              extend: [
                theme.mq({ until: 's', }, { paddingBottom: '3rem', }),
                theme.mq({ from: 's', until: 'l', }, { paddingBottom: '7rem', }),
                theme.mq({ from: 'l', until: 'xl', }, { paddingBottom: '14rem', }),
                theme.mq({ from: 'xl', }, { paddingBottom: '1rem', }),
              ],
            })}
          >
            <CommentForm initNewComment={initNewComment} signUpNotification={signUpNotification} />
            <FelaComponent
              style={{
                width: '100%',
                marginBottom: '5rem',
                marginTop: '2rem',
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <FelaComponent style={{ marginTop: 'calc(1rem + 2px)', }}>
                {chooseSortMethodText}
              </FelaComponent>
              <Select
                onChange={selectedItem => {
                  this.loadComments();
                  this.setState({ sortMethod: selectedItem, });
                }}
                controlledSelectedItem={this.state.sortMethod}
                items={[
                  { value: 'dateDescending', display: dateDescendingItemTxt, },
                  { value: 'dateAscending', display: dateAscendingItemTxt, },
                  { value: 'commentRating', display: commentRatingItemTxt, },
                  { value: 'editorsPick', display: editorsPickItemTxt, },
                ]}
                miscStyles={SelectStyle}
              />
            </FelaComponent>
            <CommentList
              comments={this.sortComments(comments)}
              commentsPlusRate={commentsPlusRate}
              commentsMinusRate={commentsMinusRate}
              initVote={initVote}
              reportAbuse={commentId => this.onSubmitCaptcha(commentId)}
              initNewComment={initNewComment}
              signUpNotification={signUpNotification}
            />
            {totalHits > this.state.maxCommentsToRender ? (
              <FelaComponent
                style={{
                  marginTop: '3rem',
                  textAlign: 'center',
                }}
              >
                <Button
                  onClick={() => {
                    this.loadComments();
                    this.setState(prevState => ({
                      maxCommentsToRender:
                        prevState.maxCommentsToRender + this.commentPaginationCount,
                    }));
                  }}
                >
                  {loadMoreCommentsBtnText}
                </Button>
              </FelaComponent>
            ) : null}
            <Recaptcha
              ref={ref => {
                this.recaptcha = ref;
              }}
              // todo: 'should site key be prop ? or from theme ?
              sitekey="6Lc6jzoUAAAAAPBTy6ppZ5Et2Yv8zivAiNY-l4ol"
              onResolved={this.onReCaptchaResolve}
              style={{ display: 'none', }}
              badge="inline"
            />
          </FelaComponent>
        )}
      />
    );
  }
}

export default CommentsSection;
