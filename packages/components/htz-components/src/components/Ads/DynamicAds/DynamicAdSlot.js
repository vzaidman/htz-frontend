/* global window */
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import * as DfpTypes from './DfpTypes';
import Debug from '../../Debug/Debug';
import Zen from '../../Zen/Zen';

class DynamicAdSlot extends Component {
  state = {
    dfpSlot: null,
  }

  componentDidMount() {
    const googletag = window.googletag;
    googletag.cmd.push(() => {
      const dfpSlot = googletag.defineSlot(this.props.adUnit, this.props.sizes, this.props.id);
      dfpSlot.addService(googletag.pubads());
      this.setState({
        dfpSlot,
      });
      googletag.enableServices();
      googletag.display(this.props.id);
      console.log('[DynamicAdSlot] sending request for %o', this.props.id);
    });
  }

  componentWillUnmount() {
    const isDestroyed = window.googletag.destroySlots([ this.state.dfpSlot, ]);
    console.log('[DynamicAdSlot] slot %o destoryed: %o', this.state.dfpSlot, isDestroyed);
  }

  render() {
    return (
      <Zen animate>
        <Debug>
AdUnit:
          {this.props.id}
        </Debug>
        <div id={this.props.id} />
      </Zen>
    );
  }
}

DynamicAdSlot.propTypes = {
  id: PropTypes.string.isRequired,
  adUnit: PropTypes.string.isRequired,
  sizes: DfpTypes.generalSize.isRequired,
};

export default DynamicAdSlot;
