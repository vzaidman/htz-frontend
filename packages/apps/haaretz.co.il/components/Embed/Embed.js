import React from 'react';
import PropTypes from 'prop-types';

import { Embed, Caption, } from '@haaretz/htz-components';

EmbedElement.propTypes = {
  inputTemplate: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  embedType: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  settings: PropTypes.object,
  caption: PropTypes.string,
  credit: PropTypes.string,
};

EmbedElement.defaultProps = {
  caption: null,
  credit: null,
  settings: null,
};

function EmbedElement(props) {
  const { caption, credit, ...embedProps } = props;
  return (
    <figure>
      <Embed {...embedProps} />
      {(caption || credit) && <Caption {...{ caption, credit, }} />}
    </figure>
  );
}

export default EmbedElement;
