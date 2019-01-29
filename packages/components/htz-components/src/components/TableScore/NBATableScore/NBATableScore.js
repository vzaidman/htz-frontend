/* eslint-disable react/no-unused-prop-types */
// @flow
import React from 'react';
import type { ChildrenArray, Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import TableHeader from './Header/TableHeader';
import TableBody from './Body/TableBody';
import ToggleButton from '../ToggleButton/ToggleButton';
import CoastBar from './Header/CoastBar';
import { fetchEast, fetchWest, } from '../NBAData/fetchUtils';

// Flow Types

type Props = {
  coastType: string,
  isOpen: boolean,
}
type State = {
  isOpen: boolean,
  coastType: string,
  eastData: Object,
  westData: Object,
}

type Options = {
  children: ChildrenArray<Node> | Node,
}

// Headers data
const tableHeaders: Array<string> = [ 'קבוצה', 'ניצחונות', 'הפסדים', 'אחוז', ];


const Container: Object = {
  display: 'inline-block',
};


const CenteredElement: Object = {
  position: 'relative',
  textAlign: 'center',
};

const fetchFromEats: () => Object = () => new Promise((resolve, reject) => (
  fetchEast()
    .then(data => resolve(data))
    .catch(err => reject(err))
));

const fetchFromWest: () => Object = () => new Promise((resolve, reject) => (
  fetchWest()
    .then(data => resolve(data))
    .catch(err => reject(err))
));


function Table({ children, }: Options): Node {
  return (
    <FelaComponent render="table" dir="rtl">{children}</FelaComponent>
  );
}


export default class NBATableScore extends React.Component<Props, State> {
  state = {
    isOpen: false,
    coastType: '',
    eastData: Object,
    westData: Object,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    const isOpenFromProps = !!props.isOpen;
    return state.coastType === ''
      ? {
        coastType: props.coastType,
        isOpen: isOpenFromProps,
      }
      : state;
  }


  handleToggle: () => void = () => this.setState(prev => ({ isOpen: !prev.isOpen, }));

  toggleCoast: string => void = coast => this.setState({ coastType: coast, });

  // Render
  render(): Node {
    const { eastData, westData, isOpen, coastType, } = this.state;
    // Title for toggle button
    const btnTitle: string = isOpen ? 'הסתר' : 'טען עוד';
    // Rotate degree for toggle button
    const btnArrowDir: number = isOpen ? 90 : 270;

    // Validate data existence
    if (eastData === Object || westData === Object) {
      fetchFromEats()
        .then(data => (
          this.setState({
            eastData: data,
          })
        ))
        .catch(error => console.log(error));
      fetchFromWest()
        .then(data => (
          this.setState({
            westData: data,
          })
        ));
      return null;
    }

    // Configure data by type
    const bodyData: Object = coastType === 'east' ? eastData : westData;

    return (
      <div style={Container}>
        <CoastBar toggleCoast={this.toggleCoast} coastType={coastType} />
        <Table>
          <TableHeader data={tableHeaders} />
          <TableBody isOpen={isOpen} data={bodyData} />
        </Table>
        <div style={CenteredElement}>
          <ToggleButton
            rotateDeg={btnArrowDir}
            handleClick={this.handleToggle}
          >
            {btnTitle}
          </ToggleButton>
        </div>
      </div>
    );
  }
}
