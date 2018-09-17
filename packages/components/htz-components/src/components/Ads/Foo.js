/* global window */
import React, { Component, } from 'react';
import { instance, } from './DfpInjector';

const showAllNormalSlots = () => {
  console.warn('[dfp] page ready?');
  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];
  window.googletag.cmd.push(() => {
    console.warn('[dfp] display normal slots');
    instance.adManager.showAllSlots('normal');
  });
};

class Foo extends Component {
  componentDidMount() {
    // showAllNormalSlots();

    console.warn('[dfp] Foo loaded');
  }

  componentWillUnmount() {
    console.warn('[dfp] unmounting Foo!!!');
  }

  render() {
    const { children, } = this.props;
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }
}

export default Foo;
