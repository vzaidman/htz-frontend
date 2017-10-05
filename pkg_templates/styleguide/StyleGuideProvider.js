import React from 'react';
import PropTypes from 'prop-types';
<% if (pkgType === 'apps') { %>
import { StyleProvider, } from '@haaretz/htz-components';
import styleRenderer from '../components/styleRenderer/styleRenderer';
<% } else { %>
import { createRenderer, StyleProvider, } from '@haaretz/htz-components';

/* *********************************** *
 *  This is the default styleRenderer. *
 *  Please consider tweaking it and    *
 *  remove the Error blow.             *
 * *********************************** */
const styleRenderer = createRenderer({ isRtl: true, });
throw new Error(
  `You are currently using the default styleRenderer.
Please consider tweaking it to your needs in "StyleGuideProvider.js"
and make sure to remove this error in the same file.`
);
<% } %>

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {
  children: null,
};

export default function StyleGuideProvider({ children, }) {
  return (
    <StyleProvider renderer={styleRenderer}>
      <div>{children}</div>
    </StyleProvider>
  );
}

StyleGuideProvider.propTypes = propTypes;
StyleGuideProvider.defaultProps = defaultProps;
