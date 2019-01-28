/* eslint-disable react/no-unused-prop-types */
// @flow
import * as React from 'react';
import type { ChildrenArray, Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import TableHeader from '../Header/TableHeader';
import TableBody from './Body/LeaguesTableBody';
import ToggleState from './Body/ToggleButton';
import { fetchLeagues, } from '../../SoccerData/fetchUtils';


// Flow validation
type Props = {
  isOpen: boolean,
  league: string,
}

type State = {
  isOpen: boolean,
  league: string,
  leagueData: ?Array<Object>,
}

type Options = {
  children: ChildrenArray<Node> | Node,
}


const Container: Object = {
  display: 'inline-block',
};


const CenteredElement: Object = {
  position: 'relative',
  textAlign: 'center',
};


function Table({ children, }: Options): Node {
  return (
    <FelaComponent render="table" dir="rtl">{children}</FelaComponent>
  );
}

const fetchFromLeagues: string => Object = league => new Promise((resolve, reject) => (
  fetchLeagues(league)
    .then(data => resolve(data))
    .catch(err => reject(err))
));


export default class SoccerLeaguesTable extends React.Component<Props, State> {
  // Is all score board open
  state = {
    isOpen: false,
    league: '',
    leagueData: null,
  };


  static getDerivedStateFromProps(props: Props, state: State) {
    const isOpenFromProps = !!props.isOpen;

    return (state.league === '')
      ? {
        league: props.league,
        isOpen: isOpenFromProps,
      }
      : state;
  }


  handleToggle: () => void = () => this.setState(prev => ({ isOpen: !prev.isOpen, }));

  render(): Node {
    const { isOpen, league, leagueData, } = this.state;


    // Validate data existence
    if (!leagueData) {
      fetchFromLeagues(league)
        .then(data => {
          if (typeof data === 'string') {
            console.log(data);
          }
          else {
            this.setState({
              leagueData: data.standings[0].table,
            });
          }
        })
        .catch(error => console.log(error));

      return null;
    }


    // Title for toggle button
    const btnTitle: string = isOpen ? 'הסתר' : 'טען עוד';
    // Rotate degree for toggle button
    const btnArrowDir: number = isOpen ? 90 : 270;

    return (
      <div style={Container}>

        <Table>
          <TableHeader />
          <TableBody isOpen={isOpen} leagueData={leagueData} />
        </Table>
        <div style={CenteredElement}>
          <ToggleState
            rotateDeg={btnArrowDir}
            handleClick={this.handleToggle}
          >
            {btnTitle}
          </ToggleState>
        </div>

      </div>
    );
  }
}
