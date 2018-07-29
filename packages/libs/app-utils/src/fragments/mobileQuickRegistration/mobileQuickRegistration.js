import gql from 'graphql-tag';

export default gql`
  fragment MobileQuickRegistration on MobileQuickRegistration {
    teaserBody
    doubleOptIn
    mailto
    mailSubject
    mailBody
    teaserButton
    inputTemplate
  }
`;
