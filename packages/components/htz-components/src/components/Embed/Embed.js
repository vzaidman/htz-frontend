import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import NoSSR from 'react-no-ssr';
import embedTypes from './utils/embedTypes';

const embedWrapper = ({ theme, }) => ({
  backgroundColor: theme.color('white'),
  marginBottom: '1.5rem',
});

const EmbedWrapper = createComponent(embedWrapper);

function Embed(props) {
  const EmbedType = embedTypes[props.inputTemplate];
  return (
    <EmbedWrapper>
      <NoSSR>
        <EmbedType {...props} />
      </NoSSR>
    </EmbedWrapper>
  );
}

Embed.propTypes = {
  content: PropTypes.string.isRequired,
  caption: PropTypes.string,
  credit: PropTypes.string,
  embedType: PropTypes.string.isRequired,
  settings: PropTypes.shape({}),
  inputTemplate: PropTypes.string.isRequired,
};

const defaultProps = {
  settings: {},
  caption: '',
  credit: '',
};

Embed.defaultProps = defaultProps;

export default Embed;
