import gql from 'graphql-tag';

export default gql`
  mutation SetArticlePageSurvey(
    $id: String
    $isOptOut: Boolean
    $isSubmitted: Boolean
    $surveySubmission: String
    $surveyAdditionalText: String
  ) {
    setArticlePageSurvey(
      id: $id
      isOptOut: $isOptOut
      isSubmitted: $isSubmitted
      surveySubmission: $surveySubmission
      surveyAdditionalText: $surveyAdditionalText
    )
  }
`;
