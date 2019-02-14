/* eslint-disable react/no-unused-prop-types */
// @flow
import * as React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import type { Node, } from 'react';
import gql from 'graphql-tag';
import type { DocumentNode, } from 'graphql/language/ast';
import Query from '../../../ApolloBoundary/Query';
import Table from '../../Table/Table';
import GroupBar from './GroupBar';
import ApolloConsumer from '../../../ApolloBoundary/ApolloConsumer';


const GET_GROUP_DATA: DocumentNode = gql`
   query TableScore($identifier: String!){
    tableScore(tableType: football, subType: groups, identifier: $identifier) {
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
  number: string,

}

type State = {
  group: string,
  tableData: ?Array<Object>,
}


const Container: Object = {
  marginBottom: '4rem',
  textAlign: 'center',
};


export default class SoccerLeaguesTable extends React.Component<Props, State> {
  // Is all score board open
  state = {
    group: '',
    tableData: null,
  };


  static getDerivedStateFromProps(props: Props, state: State) {
    const groupNumber = props.number;

    return state.group === '' ? {
      group: groupNumber,
    }
      : state;
  }


  setGroup: (string, Object) => void = (groupNumber, client) => {
    client.query({
      query: GET_GROUP_DATA,
      variables: ({ identifier: groupNumber, }),
    }).then(() => this.setState({ group: groupNumber, }));
  }

  render(): Node {
    const { group, tableData, } = this.state;


    return !tableData ? (
      <Query
        query={GET_GROUP_DATA}
        variables={{ identifier: group, }}
      >
        {({ loading, error, data, client, }) => {
          if (loading) return null;
          if (error) return null;


          if (data.tableScore.type === 'ERROR') {
            console.error(data.tableScore.errorMessage);
            return null;
          }

          return (

            <FelaComponent style={Container}>

              <GroupBar
                client={client}
                setGroup={this.setGroup}
                groupNumber={Number(group) || 1}
              />

              <FelaTheme render={theme => (
                <Table
                  tableData={data.tableScore.data}
                  tableType="soccer-champions"
                  headers={theme.footballHeaders.headers}
                />
              )}
              />
            </FelaComponent>
          );
        }}
      </Query>
    )
      : (
        <ApolloConsumer>
          {client => (
            <FelaComponent style={Container}>

              <GroupBar
                client={client}
                setGroup={this.setGroup}
                groupNumber={Number(group) || 1}
              />

              <FelaTheme render={theme => (
                <Table
                  tableData={tableData}
                  tableType="soccer-champions"
                  headers={theme.footballHeaders.headers}
                />
              )}
              />
            </FelaComponent>

          )}
        </ApolloConsumer>
      );
  }
}
