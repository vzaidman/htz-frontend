/* eslint-disable react/no-unused-prop-types */
// @flow
import * as React from 'react';
import type { Node, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { borderTop, borderRight, } from '@haaretz/htz-css-tools';
import ClickArea from '../../../ClickArea/ClickArea';

// / Flow types
type Props = {
  setGroup: (string, Object) => void,
  groupNumber: number,
  client: Object,
}

type State = {
  activeTab: number,
}

const barRule: Object => Object = ({ theme, }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'stretch',
  boxSizing: 'border-box',
  position: 'relative',
  width: '100%',
  extend: [
    theme.type(0),
    borderTop({
      width: '2px',
      lines: 0.1,
      style: 'solid',
      color: theme.color('primary', -6),
    }),
  ],

});

const singleTabRule: Object => Object = ({ theme, active, borderRightOut, }) => ({
  padding: '1rem 1.6rem',
  flexGrow: '1',
  background: active ? theme.color('quaternary', 'base') : theme.color('neutral', -10),
  fontWeight: active ? 700 : 500,
  color: theme.color('button', 'primaryOpaqueHoverBg'),
  extend: [
    theme.mq({ from: 's', }, { padding: '1rem 1.8rem', }),
    theme.mq({ until: 's', }, {
      padding: '1rem 1.2rem',
      ...theme.type(-3),
    }),
    borderRight(borderRightOut),
  ],
});

type SingleTabOptions = {
  text: string,
  active: boolean,
  index: number,
}


function SingleTab({ text, active, index, }: SingleTabOptions): Node {
  const borderRightEmpty: Object = {
    width: 0,
    lines: 0,
    style: 'none',
    color: 'white',
  };
  const borderRightFilled: Object = {
    width: '1px',
    lines: 2.9,
    style: 'solid',
    color: 'lightgrey',
  };

  const singleTab: Node = index === 0
    ? (
      <FelaComponent
        active={active}
        borderRightOut={borderRightEmpty}
        rule={singleTabRule}
      >
        {text}
      </FelaComponent>
    )
    : (
      <FelaComponent
        active={active}
        borderRightOut={borderRightFilled}
        rule={singleTabRule}
      >
        {text}
      </FelaComponent>
    );

  return singleTab;
}

class GroupBar extends React.Component <Props, State> {
  state = {
    activeTab: -1,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    return state.activeTab === -1 ? {
      activeTab: props.groupNumber - 1,
    }
      : state;
  }

  handleClick: number => void = tabNumber => {
    this.setState({ activeTab: tabNumber, });
    this.props.setGroup(String(tabNumber + 1), this.props.client);
  };

  render(): Node {
    return (
      <FelaComponent
        rule={barRule}
        render={({ className, }) => (
          <FelaTheme render={theme => (
            <div className={className}>

              {
              theme.groupBarTabs.headers.map((h, index) => {
                const active = this.state.activeTab === index;
                return (
                  <ClickArea onClick={() => this.handleClick(index)} key={h}>
                    <SingleTab index={index} text={h} active={active} />
                  </ClickArea>
                );
              })
            }


            </div>
          )}
          />
        )}
      />
    );
  }
}

export default GroupBar;
