import { Comments, } from '@haaretz/htz-components';
import { graphql, compose, } from 'react-apollo';
import fetchCommentsQuery from './queries/fetchComments';
import submitNewComment from './mutations/submitNewComment';
import submitNewVote from './mutations/submitNewVote';
import submitNotificationEmail from './mutations/submitNotificationEmail';
import reportAbuse from './mutations/reportAbuse';

const CommentsElement = compose(
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
)(Comments);

export default CommentsElement;
