// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export default gql`
  fragment DfpBanner on DfpBanner {
    audianceTarget
    className
    contentId
    contentName
    hideOnSite
    id
    inputTemplate
    miscStyles
  }
`;
