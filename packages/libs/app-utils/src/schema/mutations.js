// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, } from 'graphql';
import CommentInput from './types/comment_input_type';
import VoteVars from './types/vote_vars_type';
import signUpNotificationVars from './types/sign_up_notification_vars_type';
import AbuseReportVars from './types/abuse_report_vars_type';
import newCommentResponseType from './types/new_comment_response_type';
import newAbuseReportResponseType from './types/new_abuse_report_response_type';
import newVoteResponseType from './types/new_vote_response_type';
import newsignaUpNotificationResponseType from './types/new_sign_up_notification_response_type';
import signUpNewsletterVars from './types/sign_up_newsletter_vars';
import GenerateOtp from './types/generate_otp';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addComment: {
      type: newCommentResponseType,
      args: { newComment: { type: CommentInput, }, },
      resolve(parentValue, { newComment, }, { dataSources, }) {
        return dataSources.PapiAPI.createComment(newComment);
      },
    },
    reportAbuse: {
      type: newAbuseReportResponseType,
      args: { newAbuseReport: { type: AbuseReportVars, }, },
      resolve(parentValue, { newAbuseReport, }, { dataSources, }) {
        return dataSources.PapiAPI.reportCommentAbuse(newAbuseReport).then(status => {
          console.log('status from new comment report abuse');
          return { status, };
        });
      },
    },
    addVote: {
      type: newVoteResponseType,
      args: { newVote: { type: VoteVars, }, },
      resolve(parentValue, { newVote, }, { dataSources, }) {
        return dataSources.PapiAPI.rateComment(newVote).then(status => {
          console.log('status from rateComment');
          return { status, };
        });
      },
    },
    signUpNewsletter: {
      type: new GraphQLObjectType({
        name: 'status',
        fields: {
          status: {
            type: GraphQLString,
          },
        },
      }),
      args: { newsletterSignUp: { type: signUpNewsletterVars, }, },
      resolve(parentValue, { newsletterSignUp, }, { dataSources, }) {
        return dataSources.PapiAPI.newsLetterSignUp(newsletterSignUp);
      },
    },
    signUpNotificationEmail: {
      type: newsignaUpNotificationResponseType,
      args: { newSignUp: { type: signUpNotificationVars, }, },
      resolve(parentValue, { newSignUp, }, { dataSources, }) {
        return dataSources.PapiAPI.signUpCommentNotifications(newSignUp).then(status => {
          console.log('status from signUpCommentNotifications');
          return { status, };
        });
      },
    },
    generateOtp: {
      type: GenerateOtp,
      args: {
        typeId: { type: GraphQLString, },
      },
      resolve(parentValue, { typeId, }, { dataSources, }) {
        return dataSources.OtpAPI.generateOtp(typeId);
      },
    },
  },
});

export default mutation;
