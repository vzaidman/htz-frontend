import gql from 'graphql-tag';

export default gql`
  query UserInfo($id: String!) {
    userInfo(id: $id) {
      reactHtzArticleOptIn
      pageCount
      welcomeScreenViewed
      articlePageSurvey {
        isOptOut
        isSubmitted
        surveySubmission
        surveyAdditionalText
      }
    }
  }
`;
