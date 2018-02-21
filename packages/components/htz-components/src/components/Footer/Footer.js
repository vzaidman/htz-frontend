/* globals window */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { bps, } from '@haaretz/htz-theme';
import mediaMatchesQuery from '../../utils/mediaMatchesQuery';
import DesktopView from './elemets/DesktopView';
import MobileView from './elemets/MobileView';

class Footer extends React.Component {
  // todo: should default be mobile?
  state = { isDesktop: false, };

  // todo: should we add a resize component like scroll?
  componentDidMount() {
    window.addEventListener('resize', () => this.checkBreakPoint());
    this.checkBreakPoint();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  checkBreakPoint = () => {
    this.setState({
      isDesktop: mediaMatchesQuery(bps, {
        queries: [ { until: 's', value: false, }, { from: 's', value: true, }, ],
      }),
    });
  };

  render() {
    const { isDesktop, } = this.state;

    return isDesktop ? <DesktopView /> : <MobileView />;
  }
}

export default Footer;
