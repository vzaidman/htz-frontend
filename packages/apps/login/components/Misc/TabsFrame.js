import React, { Fragment, } from 'react';
import { StyleProvider, } from '@haaretz/fela-utils';
import { createComponent, FelaTheme, } from 'react-fela';
import styleRenderer from '../components/styleRenderer/styleRenderer';
import theme from '../theme/index';

class TabsFrame extends React.Component {
  state = {
    activeTab: 0,
  };

  /* ---------- Lifecycle Methods ---------- */
  componentDidMount() {

  }

  /* ------------ Functionality ------------ */
  changeTab(tabIndex) {
    this.setState({ activeTab: tabIndex, });
  }

  /* ----------- Tabs Rendering ------------ */


  /* --------------- Render ---------------- */
  render() {
    return (
      <Fragment>
        <div>Tabs</div>
      </Fragment>
    );
  }
}
