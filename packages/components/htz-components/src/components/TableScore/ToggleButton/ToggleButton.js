// @flow
import * as React from 'react';
import type { ChildrenArray, Node, } from 'react';
import FelaTheme from 'react-fela/lib/FelaTheme';
import IconBack from '../../Icon/icons/IconBack';
import ClickArea from '../../ClickArea/ClickArea';

type Options = {
  children: ChildrenArray<Node> | Node,
  handleClick: () => void,
  rotateDeg: number,
  isOpen: ?boolean,
}


function LoadButton({ children, handleClick, rotateDeg, isOpen, }: Options): Node {
  return (
    <FelaTheme render={theme => (
      <ClickArea
        attrs={{
          'aria-expanded': isOpen ? 'true' : 'false',
        }}
        size={1}
        onClick={handleClick}
        miscStyles={{
          color: theme.color('primary'),
          padding: '1em',
        }}
      >
        {children}
        <IconBack
          miscStyles={{
            transform: `rotate(${rotateDeg}deg)`,
            color: 'white',
            fontSize: '16px',
            backgroundColor: theme.color('primary'),
            borderRadius: '50%',
            margin: '0 1em',
            transition: 'transform .7s ease-in-out',
            padding: '0.2em',
          }}
        />
      </ClickArea>
    )}
    />

  );
}


export default LoadButton;
