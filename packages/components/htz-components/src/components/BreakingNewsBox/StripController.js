// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import IconBack from '../Icon/icons/IconBack';
import PlayPauseIcon from '../Button/PlayPauseIcon';
import ClickArea from '../ClickArea/ClickArea';

type Props = {
  loop: boolean,
  speed: number, // in seconds
  size: number, // number of items to iterate
  onChange: (data: { index: number, }) => void,
};

type State = {
  index: number,
  loop?: boolean,
  intervalID: ?IntervalID,
};

export default class StripController extends React.Component<Props, State> {
  static defaultProps = {
    loop: false,
  };

  state = {
    index: 0,
    loop: this.props.loop,
    intervalID: undefined,
  };

  componentDidMount() {
    if (this.state.loop) {
      this.play();
    }
  }

  componentWillUnmount() {
    if (this.state.intervalID) {
      clearInterval(this.state.intervalID);
    }
  }

  setIndex = (index: number) => {
    this.setState({ index, }, () => {
      if (this.props.onChange) {
        this.props.onChange({ index, });
      }
    });
  };

  prev = (stop?: boolean) => {
    let { index, } = this.state;
    index = this.state.index > 0 ? index - 1 : this.props.size - 1;

    if (stop) {
      this.stop();
    }

    this.setIndex(index);
  };

  next = (stop?: boolean) => {
    let { index, } = this.state;
    index = this.state.index < this.props.size - 1 ? index + 1 : 0;

    if (stop) {
      this.stop();
    }

    this.setIndex(index);
  };

  togglePlay = () => {
    if (this.state.loop) {
      this.stop();
    }
    else {
      this.play();
    }
  };

  stop = () => {
    this.setState({ loop: false, }, () => (this.state.intervalID ? clearInterval(this.state.intervalID) : null)
    );
  };

  play = () => {
    this.setState({
      loop: true,
      intervalID: setInterval(() => this.next(), this.props.speed * 1000),
    });
  };

  render() {
    return (
      <FelaComponent
        style={theme => ({
          display: 'flex',
          flexGrow: 1,
          color: theme.color('primary'),
        })}
        render={({ theme, className, }) => (
          <div className={className}>
            <ClickArea
              onClick={() => this.prev(true)}
              size={5}
              attrs={{ 'aria-hidden': true, title: theme.breakingNewsStrip.toPrevItem, }}
            >
              <IconBack
                miscStyles={{
                  transform: 'rotate(180deg)',
                }}
              />
            </ClickArea>
            <ClickArea
              onClick={this.togglePlay}
              size={5}
              attrs={{
                'aria-hidden': true,
                title: this.state.loop
                  ? theme.breakingNewsStrip.pause
                  : theme.breakingNewsStrip.play,
              }}
            >
              <PlayPauseIcon isPlay={this.state.loop} animationDuration={1} />
            </ClickArea>
            <ClickArea
              onClick={() => this.next(true)}
              size={5}
              attrs={{ 'aria-hidden': true, title: theme.breakingNewsStrip.toNextItem, }}
            >
              <IconBack />
            </ClickArea>
          </div>
        )}
      />
    );
  }
}
