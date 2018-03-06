/* globals window */
import React, { Fragment, } from 'react';
import { withTheme, } from 'react-fela';
import Media from '../Media/Media';
import DesktopViewWithApollo from './elemets/Desktop/DesktopView';
import MobileView from './elemets/MobileView';

// eslint-disable-next-line react/prop-types
const Footer = ({ theme, }) => (
  <Fragment>
    <Media query={{ until: 's', }} render={() => <MobileView theme={theme} />} />
    <Media query={{ from: 's', }} render={() => <DesktopViewWithApollo theme={theme} />} />
  </Fragment>
);

export default withTheme(Footer);
