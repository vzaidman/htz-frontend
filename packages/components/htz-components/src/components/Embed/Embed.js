import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

import embedTypes from './utils/embedTypes';
import Debug from '../Debug/Debug';
import Caption from '../Caption/Caption';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const embedWrapper = ({ setHeight, }) => ({
  position: 'relative',
  width: '100%',
  extend: [ ...(setHeight ? [ { height: '350px', }, ] : []), ],
});

const EmbedWrapper = createComponent(embedWrapper);

export default class Embed extends React.Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    embedType: PropTypes.string.isRequired,
    settings: PropTypes.shape({}),
    showCaption: PropTypes.bool,
    inputTemplate: PropTypes.string.isRequired,
    caption: PropTypes.string,
    credit: PropTypes.string,
  };

  static defaultProps = {
    settings: null,
    showCaption: true,
    caption: null,
    credit: null,
  };

  state = {
    component: null,
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    embedTypes(this.props.inputTemplate)
      .then(response => this.setState({
        component: response.default,
      })
      )
      .catch(err => console.log(err));
  }

  render() {
    const EmbedType = this.state.component;
    const { caption, credit, showCaption, } = this.props;
    return EmbedType ? (
      <ErrorBoundary>
        <EmbedWrapper>
          <EmbedType {...this.props} />
        </EmbedWrapper>
        {showCaption && (caption || credit) ? <Caption caption={caption} credit={credit} /> : null}
      </ErrorBoundary>
    ) : (
      <Debug>
        <p>{`Embed ${this.props.inputTemplate} is not supported`}</p>
      </Debug>
    );
  }
}
