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
    source: PropTypes.string.isRequired,
    embedType: PropTypes.string.isRequired,
    settings: PropTypes.shape({}),
    inputTemplate: PropTypes.string.isRequired,
  };

  static defaultProps = {
    settings: null,
  };

  state = {
    isLoading: false,
    component: null,
  };

  componentWillMount() {
    this.setState({ isLoading: true, });
    embedTypes(this.props.inputTemplate)
      .then(response =>
        this.setState({
          component: response.default,
        })
      )
      .catch(err => console.log(err));
  }

  onLoaded = () => {
    this.setState({ isLoading: false, });
  };

  render() {
    const EmbedType = this.state.component;
    return EmbedType ? (
      <EmbedWrapper setHeight={this.state.isLoading}>
        <LoadingScreen isLoading={this.state.isLoading} />
        <EmbedType {...this.props} onLoadCallback={this.onLoaded} />
      </EmbedWrapper>
    ) : (
      <p>not supported embed element</p>
    );
  }
}
