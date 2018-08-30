import gql from 'graphql-tag';

export default gql`
  fragment MobileQuickRegistration on MobileQuickRegistration {
    contentId
    teaserBody
    doubleOptIn
    mailto
    mailSubject
    mailBody
    teaserButton
    inputTemplate
  }
`;
