import React from 'react';
import { createComponent, } from 'react-fela';
import { bps, } from '@haaretz/htz-theme';
import mediaMatchesQuery from '../../utils/mediaMatchesQuery';
import {
  borderBottom,
  borderTop,
  parseComponentProp,
  parseStyleProps,
} from '@haaretz/htz-css-tools';
import DesktopView from './elemets/DesktopView';
import MobileView from './elemets/MobileView';


class Footer extends React.Component {
  state = { breakPoint: null, toggle: false, };

  componentDidMount() {
    window.addEventListener('resize', () => this.checkBreakPoint());
    this.checkBreakPoint();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  checkBreakPoint = () => {
    this.setState({
      breakPoint: mediaMatchesQuery(bps, {
        queries: [ { until: 's', value: 'mobile', }, { from: 's', value: 'desktop', }, ],
      }),
    });
  };

  handleClick = () => {
    console.warn('clicked');
    this.setState(prevState => ({
      toggle: !prevState.toggle,
    }));
  };

  render() {
    const { breakPoint, toggle, } = this.state;
    if (breakPoint == undefined) {
      return <div>Loading...</div>;
    }

    console.warn('this is break point', breakPoint);
    console.warn('this is toggle state ', toggle);
    const FooterReady = breakPoint === 'desktop' ? <DesktopView /> : <MobileView />;

    return FooterReady;
  }
}

export default Footer;
