// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

import content from '../content/content';
import dfpBanner from '../dfpBanner/dfpBanner';
import gridElementGroup from '../gridElementGroup/gridElementGroup';
import list from '../list/list';

export default gql`
  fragment ChangeableElementGroup on ChangeableElementGroup {
    contentLists {
      displayDuration
      content {
        ... on Content {
          ...Content
        }
        ... on DfpBanner {
          ...DfpBanner
        }
        ... on GridElementGroup {
          ...GridElementGroup
        }
        ... on List {
          ...ListInGroup
        }
      }
    }
    hideOnSite
    inputTemplate
    contentName
    contentId
    totalDisplay
  }
  ${content}
  ${dfpBanner}
  ${gridElementGroup}
  ${list}
`;
