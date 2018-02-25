/* globals window */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withTheme, } from 'react-fela';
import { Media, } from 'react-fns';
import DesktopViewWithApollo from './elemets/Desktop/DesktopView';
import MobileView from './elemets/MobileView';

// eslint-disable-next-line react/prop-types
const Footer = ({ theme, }) => (
  <Media query={`(max-width: ${theme.bps.widths.s}px)`}>
    {matches => (matches ? <MobileView theme={theme} /> : <DesktopViewWithApollo theme={theme} />)}
  </Media>
);

export default withTheme(Footer);
