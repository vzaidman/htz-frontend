// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLObjectType, GraphQLString, } from 'graphql';
import ConfirmationParams from './confirmation_params_type';
import TemplateParams from './template_params_type';

const ConnectMailMobile = new GraphQLObjectType({
  name: 'ConnectMailMobile',
  fields: () => ({
    confirmationParams: { type: ConfirmationParams, },
    confirmationType: { type: GraphQLString, },
    templateParams: { type: TemplateParams, },
  }),
});

export default ConnectMailMobile;
