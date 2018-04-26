// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLBoolean, } from 'graphql';
import CommentInput from './types/comment_input_type';
import VoteVars from './types/vote_vars_type';
import signUpNotificationVars from './types/sign_up_notification_vars_type';
import AbuseReportVars from './types/abuse_report_vars_type';
import newCommentResponseType from './types/new_comment_response_type';
import newAbuseReportResponseType from './types/new_abuse_report_response_type';
import newVoteResponseType from './types/new_vote_response_type';
import newsignaUpNotificationResponseType from './types/new_sign_up_notification_response_type';
import signUpNewsletterVars from './types/sign_up_newsletter_vars';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addComment: {
      type: newCommentResponseType,
      args: { newComment: { type: CommentInput, }, },
      resolve(parentValue, { newComment, }, context) {
        return context.cmlinkCommentPoster(newComment).then(data => data);
      },
    },
    reportAbuse: {
      type: newAbuseReportResponseType,
      args: { newAbuseReport: { type: AbuseReportVars, }, },
      resolve(parentValue, { newAbuseReport, }, context) {
        return context
          .cmlinkCommentAbuseReport(newAbuseReport)
          .then(status => ({ status, }));
      },
    },
    addVote: {
      type: newVoteResponseType,
      args: { newVote: { type: VoteVars, }, },
      resolve(parentValue, { newVote, }, context) {
        return context.loggerVotePoster(newVote).then(status => ({ status, }));
      },
    },
    signUpNewsletter: {
      type: GraphQLBoolean,
      args: { newsletterSignUp: { type: signUpNewsletterVars, }, },
      resolve(parentValue, { newsletterSignUp, }, context) {
        return context.newsLetterRegister(newsletterSignUp).then(ok => ok);
      },
    },
    signUpNotificationEmail: {
      type: newsignaUpNotificationResponseType,
      args: { newSignUp: { type: signUpNotificationVars, }, },
      resolve(parentValue, { newSignUp, }, context) {
        return context
          .notificationSignUpPoster(newSignUp)
          .then(status => ({ status, }));
      },
    },
  },
});

export default mutation;
