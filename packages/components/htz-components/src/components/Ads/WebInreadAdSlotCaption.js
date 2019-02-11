// @flow
import React from 'react';
import type { ElementRef, Node, } from 'react';
import { FelaComponent, } from 'react-fela';

type State = {
  display: boolean;
}

export default class WebInreadAdSlotCaption extends React.Component<{}, State> {
  state = {
    display: false,
  };

  componentDidMount() {
    if (this.elementRef && this.elementRef.parentElement && this.elementRef.parentElement.parentElement) {
      this.elementRef.parentElement.parentElement.addEventListener('inreadBannerSlotRendered', this.slotRenderEndedEventHandler);
    }
  }

  slotRenderEndedEventHandler: Object => void = event => {
    const { isEmpty, size, } = event.detail;
    if (!isEmpty && !(size[0] === 108 && size[1] === 108)) {
      this.setState({ display: true, });
    }
  };

  elementRef: ElementRef<"div"> | null;

  render(): Node {
    const { display, } = this.state;

    return (
      <FelaComponent
        style={theme => ({
          display: display ? 'block' : 'none',
          paddingTop: '0rem',
          paddingBottom: '0rem',
          ...theme.type(-3),
        })}
      >
        <div ref={el => { this.elementRef = el; }}>- פרסומת -</div>
      </FelaComponent>
    );
  }
}
