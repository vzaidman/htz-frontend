// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import { quoteImage, } from '../image/image';

export default gql`
  fragment Quote on Quote {
    position
    text
    credit
    afterParagraph
    ...QuoteImage
    contentId
    contentName
    inputTemplate
  }
  ${quoteImage}
`;
