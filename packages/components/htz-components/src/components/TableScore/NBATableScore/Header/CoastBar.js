/* eslint-disable react/no-unused-prop-types,react/no-unused-state */
// @flow
import React from 'react';
import type { Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import { borderTop, } from '@haaretz/htz-css-tools';
import ClickArea from '../../../ClickArea/ClickArea';
import type { CoastType, } from '../../TableScore';

// / Flow types
type Props = {
  coastType: CoastType,
  toggleCoast: CoastType => void,
};
type State = {
  east: boolean,
  west: boolean,
  initialized: boolean,
};

type SingleTabOptions = {
  text: string,
  active: boolean,
};

const barRule: Object => Object = ({ theme, }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  boxSizing: 'border-box',
  extend: [
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
  fontWeight: active ? 700 : 500,
  color: theme.color('button', 'primaryOpaqueHoverBg'),
});

function SingleTab({ text, active, }: SingleTabOptions): Node {
  return (
    <FelaComponent active={active} rule={singleTabRule}>
      {text}
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
    this.props.toggleCoast('east');
  };

  handleWest: () => void = () => {
    this.setState({
      west: true,
      east: false,
    });
    this.props.toggleCoast('west');
  };

  render(): Node {
    return (
      <FelaComponent
        rule={barRule}
        render={({ className, }) => (
          <div className={className}>
            <ClickArea onClick={this.handleEast}>
              <SingleTab active={this.state.east} text="מזרח" />
            </ClickArea>

            <ClickArea onClick={this.handleWest}>
              <SingleTab active={this.state.west} text="מערב" />
            </ClickArea>
          </div>
        )}
      />
    );
  }
}

export default CoastBar;
