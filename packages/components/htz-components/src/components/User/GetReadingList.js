/* global fetch  */
import React from 'react';
import querystring from 'querystring';
import gql from 'graphql-tag';
import { ApolloConsumer, } from '../ApolloBoundary/ApolloBoundary';

const GET_USER_ID = gql`
  query GetUserId {
    user @client {
      id
    }
  }
`;

export default function GetReadingList() {
  return (
    <ApolloConsumer>
      {cache => {
        const { user: { id: userId, }, } = cache.readQuery({
          query: GET_USER_ID,
        });
        if (userId) {
          const bodyReq = {
            userId,
            readingListId: 'Haaretz.Feed.PersonalArea.ReadinglistAsJSON',
            update: false,
          };
          fetch(
            'https://www.haaretz.co.il/cmlink/TheMarker.Element.ReadingListManager',
            {
              method: 'POST',
              cache: 'no-cache',
              credentials: 'include',
              headers: {
                // 'Content-Type': 'application/json; charset=utf-8',
                'Content-Type':
                  'application/x-www-form-urlencoded; charset=utf-8',
              },
              body: querystring.stringify(bodyReq),
            }
          )
            .then(response => response.json())
            .then(response => {
              cache.writeData({
                data: {
                  readingListArray: response.readinglist.articlesIdsListStr,
                },
              });
            });
          return null;
        }
        cache.writeData({
          data: {
            readingListArray: [],
          },
        });
        return null;
      }}
    </ApolloConsumer>
  );
}
