import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose, } from 'react-apollo';
import CommentSection from './CommentsSection';
import fetchCommentsQuery from './queries/fetchComments';
import submitNewComment from './mutations/submitNewComment';
import submitNewVote from './mutations/submitNewVote';
import submitNotificationEmail from './mutations/submitNotificationEmail';
import reportAbuse from './mutations/reportAbuse';


const propTypes = {
  /**
   * Passed implicitly by Apollo, not directly as an attribute on the component
   */
  data: PropTypes.shape({
    /** Indicates data loading state */
    loading: PropTypes.bool,
    /** Indicates data error state */
    error: PropTypes.bool,

    /** Holds the comment element object with all the comment data */
    commentsElement: PropTypes.shape({
      comments: PropTypes.arrayOf(PropTypes.object),
      commentsPlusRate: PropTypes.object,
      commentsMinusRate: PropTypes.object,
      totalHits: PropTypes.number,
    }),
  }).isRequired,
  /**
   * A function to fetch all comments calls  loadAllComments query.
   * Passed implicitly by Apollo, not directly as an attribute on the component.
   */
  loadAllComments: PropTypes.func.isRequired,
  /** The comment element ID from polopoly */
  contentId: PropTypes.string.isRequired,
  /** The article ID from polopoly */
  articleId: PropTypes.string.isRequired,
  /**
   * A function that calls the submitNewComment Mutation
   * Passed implicitly by Apollo, not directly as an attribute on the component.
   */
  SubmitNewComment: PropTypes.func.isRequired,
  /**
   * A function that calls the submitNewVote Mutation
   * Passed implicitly by Apollo, not directly as an attribute on the component.
   */
  SubmitNewVote: PropTypes.func.isRequired,
  /**
   * A function that calls the submitNotificationEmail Mutation.
   * Passed implicitly by Apollo, not directly as an attribute on the component.
   */
  SubmitNotificationEmail: PropTypes.func.isRequired,
  /**
   * A function that calls the reportAbuse Mutation.
   * Passed implicitly by Apollo, not directly as an attribute on the component.
   */
  ReportAbuse: PropTypes.func.isRequired,
};

class CommentsWithApollo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newCommentId: undefined,
      newCommentHash: undefined,
      loadedAllComments: false,
    };
    this.initNewComment = this.initNewComment.bind(this);
    this.initVote = this.initVote.bind(this);
  }
  // todo: add optimistic response for voting
  initVote(commentId, group) {
    const articleId = this.props.articleId;
    this.props
      .SubmitNewVote({
        variables: {
          commentId,
          articleId,
          group,
        },
      })
      .then(({ data, }) => {
        console.warn(data.addVote.status);
      })
      .catch(mutationError => {
        console.warn('there was an error sending the query', mutationError);
      });
  }

  initNewComment(commentAuthor, commentText, parentCommentId) {
    const articleId = this.props.articleId;
    const commentElementId = this.props.contentId;
    this.props
      .SubmitNewComment({
        variables: {
          commentText,
          commentAuthor,
          articleId,
          commentElementId,
          parentCommentId,
        },
      })
      .then(({ data, }) => {
        this.setState({
          newCommentId: data.addComment.newCommentId,
          newCommentHash: data.addComment.hash,
        });
      })
      .catch(mutationError => {
        console.warn('there was an error sending the query', mutationError);
      });
  }

  initSignUpNotificationEmail(email) {
    this.props.SubmitNotificationEmail({
      variables: {
        commentId: this.state.newCommentId,
        hash: this.state.newCommentHash,
        userEmail: email,
      },
    });
    this.setState({ newCommentId: undefined, newCommentHash: undefined, });
  }

  initReportAbuse(commentId, captchaKey) {
    this.props.ReportAbuse({
      variables: {
        commentId,
        captchaKey,
        commentElementId: this.props.contentId,
      },
    });
  }

  handleLoadAllComments() {
    if (!this.state.loadedAllComments) {
      this.setState({ loadedAllComments: true, });
      this.props.loadAllComments();
    }
  }

  render() {
    if (this.props.data.loading) {
      return <div>loading ...</div>;
    }
    if (this.props.data.error) {
      return <h1>ERROR</h1>;
    }
    return (
      // todo: check why global rtl is not working in haaretz.co.il
      <div dir="rtl">
        <CommentSection
          initVote={this.initVote}
          reportAbuse={(commentId, captchaKey) => this.initReportAbuse(commentId, captchaKey)}
          initNewComment={this.initNewComment}
          signUpNotification={email => this.initSignUpNotificationEmail(email)}
          loadAllComments={() => this.handleLoadAllComments()}
          comments={this.props.data.commentsElement.comments}
          commentsPlusRate={this.props.data.commentsElement.commentsPlusRate}
          commentsMinusRate={this.props.data.commentsElement.commentsMinusRate}
          totalHits={this.props.data.commentsElement.totalHits}
        />
      </div>
    );
  }
}

CommentsWithApollo.propTypes = propTypes;

export default compose(
  graphql(fetchCommentsQuery, {
    options: props => ({
      variables: { path: `${props.contentId}?composite=true&limited=true`, },
    }),
    props: props => ({
      data: props.data,
      loadAllComments: () =>
        props.data.fetchMore({
          variables: {
            path: `${props.ownProps.contentId}?composite=true`,
          },
          updateQuery(previousResult, { fetchMoreResult, }) {
            return fetchMoreResult;
          },
        }),
    }),
  }),
  graphql(submitNewComment, { name: 'SubmitNewComment', }),
  graphql(submitNewVote, { name: 'SubmitNewVote', }),
  graphql(submitNotificationEmail, { name: 'SubmitNotificationEmail', }),
  graphql(reportAbuse, { name: 'ReportAbuse', })
)(CommentsWithApollo);

