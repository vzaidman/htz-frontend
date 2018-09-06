import gql from 'graphql-tag';

export default gql`
  query RecipeArticleContent($articleId: String!, $starRanking: Int!) {
    rankArticle(articleId: $articleId, starRanking: $starRanking)
  }
`;
