import React from 'react';
import { createComponent, } from 'react-fela';
import { parseStyleProps, parseTypographyProp, } from '@haaretz/htz-css-tools';

/**
 * Article subtitle style function
 *
 * @param {Object} miscStyles - A style object to add/override theme styles
 * @param theme - Theme object provided by Fela-ThemeProvider
 * @returns {Object} - styling object for Subtitle
 */
const styleArticleSubtitle = ({ miscStyles, theme, }) => ({
  marginTop: '2rem',
  extend: [
    parseTypographyProp(theme.articleStyle.header.subtitleFontSize, theme.type),
    ...(miscStyles ? parseStyleProps(miscStyles) : []),
  ],
});

const Subtitle = createComponent(styleArticleSubtitle, 'p', props => Object.keys(props), );
export default Subtitle;
