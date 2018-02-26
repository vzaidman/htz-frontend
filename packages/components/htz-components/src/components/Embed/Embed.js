import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import embedTypes from './utils/embedTypes';
import LoadingScreen from './utils/LoadingScreen';

const embedWrapper = ({ setHeight, }) => ({
  position: 'relative',
  width: 'inherit',
  extend: [ ...(setHeight ? [ { height: '350px', }, ] : []), ],
});

const EmbedWrapper = createComponent(embedWrapper);

export default class Embed extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    embedType: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    settings: PropTypes.object,
    inputTemplate: PropTypes.string.isRequired,
  };

  static defaultProps = {
    settings: null,
  };

  state = {
    isLoading: false,
  };

  componentWillMount() {
    this.setState({ isLoading: true, });
  }

  onLoaded = () => {
    this.setState({ isLoading: false, });
  };

  render() {
    const EmbedType = embedTypes[this.props.inputTemplate];
    return (
      <EmbedWrapper setHeight={this.state.isLoading}>
        <LoadingScreen isLoading={this.state.isLoading} />
        <EmbedType {...this.props} onLoadCallback={this.onLoaded} />
      </EmbedWrapper>
    );
  }
}
