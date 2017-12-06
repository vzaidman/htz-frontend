import React from 'react';
import PropTypes from 'prop-types';

import { Embed, } from '@haaretz/htz-components';

EmbedElement.propTypes = {
  content: PropTypes.string.isRequired,
  caption: PropTypes.string,
  credit: PropTypes.string,
  embedType: PropTypes.string.isRequired,
  elementType: PropTypes.string.isRequired,
  settings: PropTypes.shape,
  inputTemplate: PropTypes.string.isRequired,
  contentId: PropTypes.string.isRequired,
  contentName: PropTypes.string.isRequired,
};

EmbedElement.defaultProps = {
  caption: '',
  credit: '',
  settings: {},
};

function EmbedElement(props) {
  return (
    <Embed {...props} />
  );
}

export default EmbedElement;
