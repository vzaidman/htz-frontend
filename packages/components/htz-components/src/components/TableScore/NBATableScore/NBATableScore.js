/* eslint-disable react/no-unused-prop-types */
// @flow
import * as React from 'react';
import TableHeader from './Header/TableHeader';
import TableBody from './Body/TableBody';
import ToggleButton from '../ToggleButton/ToggleButton';
import CoastBar from './Header/CoastBar';
import { fetchEast, fetchWest, } from '../NBAData/fetchUtils';
import type { CoastType, } from '../TableScore';

type NbaData = Array<{
  loss: number,
  name: string,
  teamId: string,
  win: number,
  // percentage of wins
  winPctv2: number,
}>;

type Props = {
  coastType: CoastType,
  isOpen: boolean,
};

type State = {
  isOpen: boolean,
  coastType: ?CoastType,
  data: ?NbaData,
};

type TableProps = { children: React.Node, };

// Headers data
const tableHeaders = [ 'קבוצה', 'ניצחונות', 'הפסדים', 'אחוז', ];

const Container = { display: 'inline-block', };

const CenteredElement = {
  position: 'relative',
  textAlign: 'center',
};

const fetchFromEast: () => Object = () => new Promise((resolve, reject) => fetchEast()
  .then(data => resolve(data))
  .catch(err => reject(err))
);

const fetchFromWest: () => Object = () => new Promise((resolve, reject) => fetchWest()
  .then(data => resolve(data))
  .catch(err => reject(err))
);

Table.defaultProps = { children: React.Node, };
function Table({ children, direction, }: TableProps): React.Node {
  return <table>{children}</table>;
}

export default class NBATableScore extends React.Component<Props, State> {
  state = {
    isOpen: false,
    coastType: null,
    data: null,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    return state.coastType
      ? state
      : {
        coastType: props.coastType,
        isOpen: !!props.isOpen,
      };
  }

  handleToggle = () => this.setState(prev => ({ isOpen: !prev.isOpen, }));

  toggleCoast = (coast: CoastType) => this.setState({ coastType: coast, });

  // Render
  render(): React.Node {
    const { data, isOpen, coastType, } = this.state;
    // Title for toggle button
    const btnTitle = isOpen ? 'הסתר' : 'טען עוד';
    // Rotate degree for toggle button
    const btnArrowDir: number = isOpen ? 90 : 270;

    // Validate data existence
    if (!data) {
      const dataFetcher = coastType === 'east' ? fetchEast : fetchWest;

      dataFetcher()
        .then(data => this.setState({ data, }))
        .catch(error => console.log(error));
    }

    return data ? (
      <div style={Container}>
        <CoastBar
          toggleCoast={this.toggleCoast}
          coastType={coastType || this.props.coastType}
        />
        <Table>
          <TableHeader data={tableHeaders} />
          <TableBody isOpen={isOpen} data={data} />
        </Table>
        <div style={CenteredElement}>
          <ToggleButton rotateDeg={btnArrowDir} handleClick={this.handleToggle}>
            {btnTitle}
          </ToggleButton>
        </div>
      </div>
    ) : null;
  }
}
