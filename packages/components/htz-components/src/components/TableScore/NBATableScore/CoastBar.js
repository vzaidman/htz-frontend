/* eslint-disable react/no-unused-prop-types,react/no-unused-state */
// @flow
import React from 'react';
import type { Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import { borderTop, } from '@haaretz/htz-css-tools';
import ClickArea from '../../ClickArea/ClickArea';
import type { CoastType, } from '../TableScore';

// / Flow types
type Props = {
  coastType: ?CoastType,
  toggleCoast: (CoastType, Object) => void,
  client: Object,
};
type State = {
  east: boolean,
  west: boolean,
  initialized: boolean,
};

type SingleTabOptions = {
  text: string,
  active: boolean,
  handleMethod: () => void,
};

const barRule: Object => Object = ({ theme, }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  boxSizing: 'border-box',
  extend: [
    theme.mq({ until: 's', }, { display: 'flex', }),
    borderTop({
      width: '2px',
      lines: 0.1,
      style: 'solid',
      color: theme.color('primary', -6),
    }),
  ],
});

const singleTabRule: Object => Object = ({ theme, active, }) => ({
  padding: '1rem 5rem',
  background: active
    ? theme.color('quaternary', 'base')
    : theme.color('neutral', -10),
  color: theme.color('button', 'primaryOpaqueHoverBg'),
  extend: [
    theme.mq({ until: 's', }, { ...theme.type(-1), flexGrow: '1', }),
  ],
});

function SingleTab({ text, active, handleMethod, }: SingleTabOptions): Node {
  return (
    <FelaComponent active={active} rule={singleTabRule}>
      <ClickArea
        onClick={handleMethod}
        miscStyles={{ width: '100%',
          fontWeight: active ? 700 : 500, }}
      >
        {text}
      </ClickArea>
    </FelaComponent>
  );
}

class CoastBar extends React.Component<Props, State> {
  state = {
    east: false,
    west: false,
    initialized: false,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    if (state.initialized) {
      return state;
    }
    return props.coastType === 'east'
      ? {
        east: true,
        west: false,
        initialized: true,
      }
      : {
        west: true,
        eats: false,
        initialized: true,
      };
  }

  handleEast: () => void = () => {
    this.setState({
      east: true,
      west: false,
    });
    this.props.toggleCoast('east', this.props.client);
  };

  handleWest: () => void = () => {
    this.setState({
      west: true,
      east: false,
    });
    this.props.toggleCoast('west', this.props.client);
  };

  render(): Node {
    return (
      <FelaComponent
        rule={barRule}
        render={({ className, }) => (
          <div className={className}>

            <SingleTab active={this.state.east} text="מזרח" handleMethod={this.handleEast} />


            <SingleTab active={this.state.west} text="מערב" handleMethod={this.handleWest} />

          </div>
        )}
      />
    );
  }
}

export default CoastBar;
