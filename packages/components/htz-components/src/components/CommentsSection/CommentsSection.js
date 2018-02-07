import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';
import Recaptcha from 'react-google-invisible-recaptcha';
import CommentForm from './CommentForm';
import CommentList from './CommentList'; // eslint-disable-line import/no-named-as-default
import Select from '../Select/Select'; // eslint-disable-line import/no-named-as-default
import Button from '../Button/Button'; // eslint-disable-line import/no-named-as-default

const propTypes = {
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
   * @param {String} commentAuthor - the new comment author
   * @param {String} commentTextHtml - the new comment text innerHTML
   * @param {String} parentCommentId - the parent CommentId - defaults to '0' if there is no `parentCommentId`
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
   * @param {String} - commentId
   * @param {String} - captchaKey
   */
  reportAbuse: PropTypes.func.isRequired,
  /**
   * A callback that gets the called when submitting the sign up to notification form in `<CommentSent />`
   * @param {String} - notificationEmail - The email the user entered
   */
  signUpNotification: PropTypes.func.isRequired,
  /** passed as a a prop by fela's withTheme func before default export */
  theme: PropTypes.shape({
    commentsSectionI18n: PropTypes.object.isRequired,
  }).isRequired,
  /** used to calculate comment numbers */
  totalHits: PropTypes.number.isRequired,
};

const defaultProps = {
  comments: [],
  commentsPlusRate: {},
  commentsMinusRate: {},
};

const sectionStyle = ({ theme, }) => ({});

const StyledSection = createComponent(sectionStyle);

const SelectContStyle = ({ theme, }) => ({
  width: '100%',
  marginBottom: '5rem',
  marginTop: '2rem',
  display: 'flex',
  alignItems: 'baseline',
});

const SelectCont = createComponent(SelectContStyle);

const loadMoreContStyle = ({ theme, }) => ({
  marginTop: '3rem',
  textAlign: 'center',
});

const LoadMoreCont = createComponent(loadMoreContStyle);

const SelectStyle = {
  width: '28rem',
  marginInlineStart: '2.3rem',
};

export class CommentsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortMethod: { value: 'dateDescending', display: 'מהאחרונה לראשונה', },
      reportCommentId: null,
    };
    this.onReCaptchaResolve = this.onReCaptchaResolve.bind(this);
  }

  onSubmitCaptcha(commentId) {
    this.setState({ reportCommentId: commentId, });
    this.recaptcha.execute();
  }

  onReCaptchaResolve() {
    const captchaKey = this.recaptcha.getResponse();
    this.props.reportAbuse(this.state.reportCommentId, captchaKey);
    this.setState({ reportCommentId: null, });
    this.recaptcha.reset();
  }

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

  sortCommentsByMethod(orderName) {
    if (orderName === 'dateAscending') {
      return (a, b) => a.publishingDateSortable - b.publishingDateSortable;
    }
    else if (orderName === 'commentRating') {
      return (a, b) => this.getCommentNetRate(b.commentId) - this.getCommentNetRate(a.commentId);
    }
    else if (orderName === 'editorsPick') {
      return (a, b) => (a.isEditorPick === b.isEditorPick ? 0 : a.isEditorPick ? 1 : -1);
    }
    return (a, b) => b.publishingDateSortable - a.publishingDateSortable;
  }

  sortComments(comments) {
    const commentsWithNumber = this.getCommentsWithNumber(comments);
    return commentsWithNumber.concat().sort(this.sortCommentsByMethod(this.state.sortMethod.value));
  }

  render() {
    const {
      initNewComment,
      signUpNotification,
      comments,
      commentsPlusRate,
      commentsMinusRate,
      initVote,
      loadAllComments,
      theme,
      ...props // eslint-disable-line no-unused-vars
    } = this.props;

    const {
      buttons: { loadAllCommentsBtnText, },
      texts: { chooseSortMethodText, },
      selectItems: {
        dateDescendingItemTxt,
        dateAscendingItemTxt,
        commentRatingItemTxt,
        editorsPickItemTxt,
      },
    } = theme.commentsSectionI18n;

    return (
      <StyledSection>
        <CommentForm initNewComment={initNewComment} signUpNotification={signUpNotification} />
        <SelectCont>
          <span>{chooseSortMethodText}</span>
          <Select
            onChange={selectedItem => {
              loadAllComments();
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
        </SelectCont>
        <CommentList
          comments={this.sortComments(comments)}
          commentsPlusRate={commentsPlusRate}
          commentsMinusRate={commentsMinusRate}
          initVote={initVote}
          reportAbuse={commentId => this.onSubmitCaptcha(commentId)}
          initNewComment={initNewComment}
          signUpNotification={signUpNotification}
        />
        <LoadMoreCont>
          <Button onClick={() => loadAllComments()}>{loadAllCommentsBtnText}</Button>
        </LoadMoreCont>
        <Recaptcha
          ref={ref => (this.recaptcha = ref)} // eslint-disable-line no-return-assign
          // todo: 'should site key be prop ? or from theme ?
          sitekey="6Lc6jzoUAAAAAPBTy6ppZ5Et2Yv8zivAiNY-l4ol"
          onResolved={this.onReCaptchaResolve}
        />
      </StyledSection>
    );
  }
}

CommentsSection.propTypes = propTypes;

CommentsSection.defaultProps = defaultProps;

export default withTheme(CommentsSection);
