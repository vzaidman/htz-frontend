// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';
import { borderTop, } from '@haaretz/htz-css-tools';
import Query from '../ApolloBoundary/Query';
import HtzLink from '../HtzLink/HtzLink';

const NavigationQuery = gql`
  query MadorimNavigationItems($listId: String!) {
    navMenu(listId: $listId) {
      navigation {
        name
        url
        contentId
      }
    }
  }
`;

type Props = {
  contentId: string,
};
export default function MadorimNavigation({ contentId, }: Props) {
  return (
    <Query query={NavigationQuery} variables={{ listId: contentId, }}>
      {({ data, loading, error, }) => {
        if (error) return null;
        if (loading) return <div>error</div>;
        const {
          navMenu: { navigation, },
        } = data;
        return (
          <FelaComponent
            style={theme => ({
              textAlign: 'center',
              paddingTop: '1rem',
              paddingBottom: '1rem',
              maxWidth: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              extend: [
                borderTop('1px', 1, 'solid', theme.color('layout', 'rowBg')),
              ],
            })}
          >
            {navigation.map((item, idx) => {
              const isLast = idx === navigation.length - 1;
              return (
                <FelaComponent
                  style={theme => ({
                    paddingInlineEnd: '.5rem',
                    paddingInlineStart: '.5rem',
                    fontWeight: 700,
                    extend: [ theme.type(-2), ],
                  })}
                  render="span"
                >
                  <HtzLink href={item.url} key={item.contentId}>
                    {item.name}
                  </HtzLink>

                  {isLast ? '' : ' | '}
                </FelaComponent>
              );
            })}
          </FelaComponent>
        );
      }}
    </Query>
  );
}
