import React, { Fragment, } from 'react';
import { StyleProvider, } from '@haaretz/fela-utils';
import { createComponent, FelaTheme, } from 'react-fela';
import styleRenderer from '../components/styleRenderer/styleRenderer';
import theme from '../theme/index';

class TabsFrame extends React.Component {
  state = {
    activeTab: null,
  };

  changeTab(tabName) {
    this.setState({ activeTab: tabName });
  }

  render() {
    
  }
}