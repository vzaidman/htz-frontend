/* eslint-disable react/prop-types */
/* global fetch  */
import React from 'react';
import gql from 'graphql-tag';
import querystring from 'querystring';
import { ApolloConsumer, } from '../ApolloBoundary/ApolloBoundary';
import IconSave from '../Icon/icons/IconSave';
import { ActionButton, Button, } from './actionList';

const GET_READING_LIST = gql`
  query GetReadingList {
    readingListArray @client
  }
`;

export default class ActionSave extends React.Component {
  state = { isArticleSaved: null, };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.isArticleSaved !== this.state.isArticleSaved ||
      nextProps.buttonStyles !== this.props.buttonStyles
    );
  }

  render() {
    const { buttonStyles, iconStyles, size, ...props } = this.props;
    const { isArticleSaved, } = this.state;

    return (
      <ActionButton
        render={({ articleId, userId, }) => (
          <ApolloConsumer>
            {cache => {
              const { readingListArray, } = cache.readQuery({
                query: GET_READING_LIST,
              });
              if (this.state.isArticleSaved === null) {
                this.setState({
                  isArticleSaved: readingListArray.includes(articleId),
                });
              }
              return (
                <Button
                  title="שמירת כתבה"
                  tabIndex="-1"
                  {...props}
                  miscStyles={{
                    ...buttonStyles.global,
                    ...buttonStyles.func(isArticleSaved),
                  }}
                  onClick={() => {
                    const bodyReq = {
                      articleId,
                      userId,
                      operation: isArticleSaved ? 'subtract' : 'add',
                      readingListId:
                        'Haaretz.Feed.PersonalArea.ReadinglistAsJSON',
                      update: true,
                      pq: 'reading_pq',
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
                            readingListArray:
                              response.readinglist.articlesIdsListStr,
                          },
                        });
                        this.setState(prevState => ({
                          isArticleSaved: !prevState.isArticleSaved,
                        }));
                      });
                  }}
                >
                  <IconSave size={size} miscStyles={iconStyles} />
                </Button>
              );
            }}
          </ApolloConsumer>
        )}
      />
    );
  }
}
