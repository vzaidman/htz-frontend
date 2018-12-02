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
import { GenerateOtp, } from './types/otp_operations_type';
import OverridePhone from './types/override_phone_type';
import ConnectMailMobile from './types/connect_mail_mobile_type';
import ValidateConfirmation from './types/validate_mail_mobile_type';
import SimpleResponse from './types/simple_response_type';

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
    overridePhone: {
      type: OverridePhone,
      args: {
        ssoId: { type: GraphQLString, },
        mobilePrefix: { type: GraphQLString, },
        mobileNumber: { type: GraphQLString, },
        userName: { type: GraphQLString, },
      },
      resolve(parentValue, { typeId, ssoId, userName, mobileNumber, mobilePrefix, }, { dataSources, }) {
        return dataSources.LegacySsoOperationsAPI.overrideMobilePhone(`${mobilePrefix}${mobileNumber}`, ssoId, userName);
      },
    },
    sendMobileEmailConnection: {
      type: ConnectMailMobile,
      args: {
        email: { type: GraphQLString, },
        phone: { type: GraphQLString, },
        userName: { type: GraphQLString, },
        paramString: { type: GraphQLString, },
        url: { type: GraphQLString, },
      },
      resolve(parentValue, { email, phone, userName, paramString, url, }, { dataSources, }) {
        return dataSources
          .HtzFunctionOperationsAPI
          // eslint-disable-next-line no-undef
          .sendPhoneMailConnection(email, phone, userName || email, paramString, url);
      },
    },
    validateMobileEmailConnection: {
      type: ValidateConfirmation,
      args: {
        email: { type: GraphQLString, },
        confirmation: { type: GraphQLString, },
        mobilePrefix: { type: GraphQLString, },
        mobileNum: { type: GraphQLString, },
      },
      resolve(parentValue, { email, confirmation, mobilePrefix, mobileNum, }, { dataSources, }) {
        return dataSources
          .NewSsoOperationsAPI
          .validateEmailPhoneConnect(email, confirmation, mobilePrefix, mobileNum);
      },
    },
    sendEmailConfirmation: {
      type: SimpleResponse,
      args: {
        email: { type: GraphQLString, },
        paramString: { type: GraphQLString, },
        url: { type: GraphQLString, },
      },
      resolve(parentValue, { email, paramString, url, }, { dataSources, }) {
        return dataSources
          .HtzFunctionOperationsAPI
          // eslint-disable-next-line no-undef
          .sendEmailConfirmation(email, paramString, url);
      },
    },
    validateEmail: {
      type: ValidateConfirmation,
      args: {
        email: { type: GraphQLString, },
        confirmation: { type: GraphQLString, },
      },
      resolve(parentValue, { email, confirmation, }, { dataSources, }) {
        return dataSources
          .NewSsoOperationsAPI
          .validateEmail(email, confirmation);
      },
    },
  },
});

export default mutation;
