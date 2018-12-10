/* global window */
// @flow
import React from 'react';
import DFP from '@haaretz/dfp';
import dfpConfig from './dfpConfig';

declare var googletag: { destroySlots: () => void, };

const instance = {};
const adPriorities = {
  high: 'high',
  normal: 'normal',
  low: 'low',
};

type State = {
  shouldRender: boolean,
};

const initDfpScript = (DEBUG = false) => {
  //  Part I: immidiate initialization of high priority DFP ads, like maaavaron
  let q;
  if (dfpConfig) {
    q = new DFP('finance', dfpConfig);
    if (DEBUG) {
      window.q = q;
    }
    const displayHighPrioritySlots = () => {
      q.initGoogleTag().then(() => {
        DEBUG
        && console.info(
          `4. Display slots - calling for display for all ${
            adPriorities.high
          } priority slots`
        );
        q.adManager.showAllSlots(adPriorities.high);
      });
    };

    const displayNormalPrioritySlots = () => {
      q.initGoogleTag().then(() => {
        DEBUG
        && console.info(
          `4. Display slots - calling for display for all ${
            adPriorities.normal
          } priority slots`
        );
        q.adManager.showAllSlots(adPriorities.normal);
      });
    };

    switch (window.document.readyState) {
      case 'loading':
        window.document.addEventListener('DOMContentLoaded', () => {
          displayHighPrioritySlots();
          displayNormalPrioritySlots();
        });
        break;
      case 'interactive':
        displayHighPrioritySlots();
        displayNormalPrioritySlots();
        break;
      default:
        // 'complete' - no need for event listeners.
        displayHighPrioritySlots();
        displayNormalPrioritySlots();
    }
  }
  else {
    throw new Error('DfpInjectorInit error: dfpConfig is not ready!');
  }
  return q;
};

export default class Dfp extends React.Component<{}, State> {
  state = { shouldRender: false, };

  componentDidMount() {
    if (!this.state.shouldRender) {
      const DEBUG = window.location.search.includes('debug');
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ shouldRender: true, });
      try {
        if (window.tomer) {
          console.log('Client Navigation BLa Bla BLa');
        }
        instance.dfp = initDfpScript(DEBUG);
        window.tomer = true;
      }
      catch (e) {
        console.error(e);
      }
    }
  }

  componentWillUnmount() {
    console.log('Destroy Slots');
    // eslint-disable-next-line no-undef
    googletag.destroySlots();
    // this.setState()
  }

  render() {
    return null;
  }
}
