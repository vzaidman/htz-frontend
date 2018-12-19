// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';
import { clicktrackerImage, } from '../image/image';

export default gql`
  fragment ClickTrackerBanner on ClickTrackerBanner {
    inputTemplate
    contentName
    contentId
    priority
    text
    link
    linkTarget
    departments
    ...ClickTrackerImage
    replaceDomainForAdBlocker
    advertiserCamp
    percentage
    minRange
    maxRange
    chance
  }
  ${clicktrackerImage}
`;
