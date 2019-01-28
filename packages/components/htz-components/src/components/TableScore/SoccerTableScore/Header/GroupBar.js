/* eslint-disable react/no-unused-prop-types */
// @flow
import * as React from 'react';
import type { Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import { borderTop, borderRight, createMqFunc, } from '@haaretz/htz-css-tools';
import ClickArea from '../../../ClickArea/ClickArea';

// / Flow types
type Props = {
  setGroup: number => void,
  groupNumber: number,
}

type State = {
  activeTab: number,
}

// noinspection JSDuplicatedDeclaration
const mq: (Object, Object) => Object = createMqFunc();

const barRule: Object => Object = ({ theme, }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  boxSizing: 'border-box',
  position: 'relative',
  width: '100%',
  extend: [
    borderTop({
      width: '2px',
      lines: 0.1,
      style: 'solid',
      color: theme.color('primary', -6),
    }),
    theme.mq({
      from: '0px',
      until: 'm',
    },
    {
      //   maxWidth: '58rem'
    }),
  ],

});

const singleTabRule: Object => Object = ({ theme, active, borderRightOut, }) => ({
  padding: '1rem 2.5rem',
  background: active ? theme.color('quaternary', 'base') : theme.color('neutral', -10),
  fontWeight: active ? 700 : 500,
  color: theme.color('button', 'primaryOpaqueHoverBg'),
  extend: [
    borderRight(borderRightOut),

  ],
  ...mq({
    from: '0px',
    until: 'm',
  },
  {
    padding: '1rem 1.52rem',
    fontWeight: active ? 900 : 700,
    extend: [
      theme.type(-3),
    ],
  }),

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
    style: 'noen',
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


const groupHeaders: Array<string> = [ 'בית 1', 'בית 2', 'בית 3', 'בית 4', 'בית 5', 'בית 6', 'בית 7', 'בית 8', ];

class GroupBar extends React.Component <Props, State> {
  state = {
    activeTab: -1,
  };


  static getDerivedStateFromProps(props: Props, state: State) {
    return state.activeTab === -1 ? {
      activeTab: props.groupNumber - 1,
    }
      : {
        state,
      };
  }

  handleClick: number => void = tabNumber => {
    this.setState({ activeTab: tabNumber, });
    this.props.setGroup(tabNumber + 1);
  };

  render(): Node {
    return (
      <FelaComponent
        rule={barRule}
        render={({ className, }) => (
          <div className={className}>

            {
              groupHeaders.map((h, index) => {
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
    );
  }
}

export default GroupBar;
