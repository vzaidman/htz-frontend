/* eslint-disable react/no-unused-prop-types,quote-props */
// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { FelaComponent, FelaTheme, } from 'react-fela';
import type { DocumentNode, } from 'graphql/language/ast';
import Query from '../../ApolloBoundary/Query';
import ToggleButton from '../ToggleButton/ToggleButton';
import Table from '../Table/Table';
import CoastBar from './CoastBar';
import ApolloConsumer from '../../ApolloBoundary/ApolloConsumer';
import type { CoastType, } from '../TableScore';
import Media from '../../Media/Media';

const GET_NBA_DATA: DocumentNode = gql`
   query TableScore($identifier: String!){
    tableScore(tableType: nba, subType: coast, identifier: $identifier) {
    ... on TableScoreError {
      type
      errorMessage: data
    }
    ... on TableScoreData {
      type
      data {
         ... on NBA {
          name
          win
          loss
          winPctV2
          teamId
        }
      }
    }
}
}
`;

type Props = {
  coastType: ?CoastType,
  isOpen: ?boolean,
};

type State = {
  isOpen: ?boolean,
  coastType: ?CoastType,
  tableData: ?Array<Object>,
};

const halfTableData: number = 8;

const borders: Object = {
  '7': [ 'gplus', '', ],
};

const Container = {
  display: 'inline-block',
  minWidth: '100%',
};

const CenteredElement = {
  position: 'relative',
  textAlign: 'center',
};


export default class NBATable extends React.Component<Props, State> {
  state = {
    isOpen: false,
    coastType: null,
    tableData: null,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    return state.coastType
      ? state
      : {
        coastType: props.coastType,
        isOpen: props.isOpen,
      };
  }

  handleToggle = () => this.setState(prev => ({ isOpen: !prev.isOpen, }));

  toggleCoast = (coast: CoastType, client: Object) => {
    client.query({
      query: GET_NBA_DATA,
      variables: ({ identifier: coast, }),
    }).then(() => this.setState({ coastType: coast, }));
  };

  // Render
  render(): React.Node {
    const { isOpen, coastType, tableData, } = this.state;

    return !tableData ? (

      <Query
        query={GET_NBA_DATA}
        variables={{ identifier: coastType, }}
      >
        {({ loading, error, data, client, }) => {
          if (loading) return null;
          if (error) return null;


          if (data.type === 'ERROR') {
            console.error(data.message);
            return null;
          }


          const tableData = !isOpen
            ? [ ...data.tableScore.data, ].splice(
              0, Math.min(data.tableScore.data.length, halfTableData)
            )
            : [ ...data.tableScore.data, ];

          return (

            <FelaComponent style={Container}>
              <FelaComponent style={CenteredElement}>
                <CoastBar client={client} coastType={coastType} toggleCoast={this.toggleCoast} />

                <FelaTheme render={theme => (
                  <Media query={{ until: 's', }}>
                    { matches => (
                      <Table
                        tableData={tableData}
                        tableType="soccer-leagues"
                        headers={matches ? theme.nbaHeaders.mobile : theme.nbaHeaders.desktop}
                        isOpen={isOpen}
                        borders={borders}
                      />
                    )}

                  </Media>
                )}
                />

                <FelaTheme render={theme => (
                  <ToggleButton
                    handleClick={this.handleToggle}
                    rotateDeg={
                      isOpen
                        ? theme.btnOptions.degree.open : theme.btnOptions.degree.close
                    }
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
    ) : (
      <ApolloConsumer>
        {client => (
          <FelaComponent style={Container}>
            <FelaComponent style={CenteredElement}>
              <CoastBar client={client} coastType={coastType} toggleCoast={this.toggleCoast} />

              <FelaTheme render={theme => (
                <Table
                  tableData={tableData}
                  tableType="soccer-leagues"
                  headers={theme.nbaHeaders.headers}
                  isOpen={isOpen}
                  borders={borders}
                />)}
              />

              <FelaTheme render={theme => (
                <ToggleButton
                  handleClick={this.handleToggle}
                  rotateDeg={isOpen ? theme.btnOptions.degree.open : theme.btnOptions.degree.close}
                  isOpen={isOpen}
                >
                  {isOpen ? theme.btnOptions.title.open : theme.btnOptions.title.close}
                </ToggleButton>
              )}
              />

            </FelaComponent>
          </FelaComponent>
        )}
      </ApolloConsumer>
    );
  }
}
