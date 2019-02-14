/* eslint-disable react/no-unused-prop-types,quote-props */
// @flow
import * as React from 'react';
import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';
import { FelaComponent, FelaTheme, } from 'react-fela';
import gql from 'graphql-tag';
import ToggleButton from '../../ToggleButton/ToggleButton';
import Query from '../../../ApolloBoundary/Query';
import Table from '../../Table/Table';


const GET_LEAGUES_DATA: DocumentNode = gql`
   query TableScore($identifier: String!){ 
    tableScore(tableType: football, subType: leagues, identifier: $identifier) {
    ... on TableScoreError {
      type
      errorMessage: data
    }
    ... on TableScoreData {
      type
      data {
         ... on Football {
         position
          name
          playedGames
          won
          lost
          draw
          difference
          points
          teamId
        }
      }
    }
}
}
`;

// Flow validation
type Props = {
  isOpen: ?boolean,
  league: string,
}

type State = {
  isOpen: ?boolean,
  league: string,
}

const halfTableData: number = 6;

const Container: Object = {
  display: 'inline-block',
  minWidth: '100%',
};


const CenteredElement: Object = {
  position: 'relative',
  textAlign: 'center',
};


export default class SoccerLeaguesTable extends React.Component<Props, State> {
  // Is all score board open
  state = {
    isOpen: null,
    league: '',
  };


  static getDerivedStateFromProps(props: Props, state: State) {
    const isOpenFromProps = !!props.isOpen;

    return (state.league === '' && state.isOpen == null)
      ? {
        league: props.league,
        isOpen: isOpenFromProps,
      }
      : state;
  }


  handleToggle: () => void = () => this.setState(prev => ({ isOpen: !prev.isOpen, }));

  render(): Node {
    const { isOpen, league, } = this.state;

    return (

      <Query
        query={GET_LEAGUES_DATA}
        variables={{ identifier: league, }}
      >
        {({ loading, error, data, }) => {
          if (loading) return null;
          if (error) return null;

          if (data.tableScore.type === 'ERROR') {
            console.error(data.tableScore.errorMessage);
            return null;
          }

          const borders: Object = (league === '2002') ? {
            '15': [ 'gplus', '', ],
          } : (league === '2015')
            ? {
              '17': [ 'gplus', '', ],
            }
            : (league !== '2125')
              ? {
                '16': [ 'gplus', '', ],
              }
              : {
                '5': [ 'button', 'positiveBorder', ],
                '11': [ 'gplus', '', ],
              };

          const tableData = !isOpen
            ? [ ...data.tableScore.data, ].splice(
              0, Math.min(data.tableScore.data.length, halfTableData)
            )
            : [ ...data.tableScore.data, ];

          return (

            <FelaComponent style={Container}>
              <FelaComponent style={CenteredElement}>

                <FelaTheme render={theme => (
                  <Table
                    tableData={tableData}
                    tableType="soccer-leagues"
                    headers={theme.footballHeaders.headers}
                    isOpen={isOpen}
                    borders={borders}
                  />)}
                />

                <FelaTheme render={theme => (
                  <ToggleButton
                    handleClick={this.handleToggle}
                    rotateDeg={
                      isOpen ? theme.btnOptions.degree.open
                        : theme.btnOptions.degree.close}
                    isOpen={isOpen}
                  >
                    {isOpen ? theme.btnOptions.title.open : theme.btnOptions.title.close}
                  </ToggleButton>
                )}
                />

              </FelaComponent>
            </FelaComponent>
          );
        }}
      </Query>
    );
  }
}
