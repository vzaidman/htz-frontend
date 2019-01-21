// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';

const partRule = ({ theme, ...props }) => ({
  content: '""',
  display: 'block',
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  borderColor: 'transparent transparent transparent currentcolor',
  transform: props.isPlay ? 'translateX(20%)' : 'translateX(20%)',
  transitionProperty: 'all',
  ...theme.getDuration('transition', props.animationDuration),
  ...theme.getTimingFunction('transition', 'swiftOut'),
});

const rule = ({ theme, ...props }) => ({
  backGroundColor: 'transparent',
  width: '0.6em',
  height: '0.8em',
  position: 'relative',

  ':before': {
    // Pause icon
    ...partRule({ theme, ...props, }),
    borderStyle: 'double',
    borderWidth: props.isPlay ? '0 0 0 .6em' : '0.5em 0px 0.5em 0.6em',
  },

  ':after': {
    // Play icon
    ...partRule({ theme, ...props, }),
    borderStyle: 'solid',
    borderWidth: props.isPlay ? '0' : '0.5em 0px 0.5em 0.6em',
  },
});

type Props = {
  isPlay?: boolean,
  animationDuration?: number,
};

PlayPauseIcon.defaultProps = {
  isPlay: false,
  animationDuration: 0.25,
};

export default function PlayPauseIcon({
  isPlay,
  animationDuration,
}: Props): React.Node {
  return (
    <FelaComponent
      isPlay={isPlay}
      animationDuration={animationDuration}
      rule={rule}
    />
  );
}
