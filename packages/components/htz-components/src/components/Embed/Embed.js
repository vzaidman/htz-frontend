import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import gql from 'graphql-tag';

import { Query, } from '../ApolloBoundary/ApolloBoundary';
import embedTypes from './utils/embedTypes';
import Debug from '../Debug/Debug';
import ToggleFade from '../Transitions/ToggleFade';
import IconHtzLoader from '../Icon/icons/IconHtzLoader';
import IconTmLoader from '../Icon/icons/IconTmLoader';
import Caption from '../Caption/Caption';

const GET_HOST = gql`
  query GetHost {
    hostname @client
  }
`;

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
    caption: PropTypes.string,
    credit: PropTypes.string,
  };

  static defaultProps = {
    settings: null,
    caption: null,
    credit: null,
  };

  state = {
    isLoading: false,
    component: null,
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
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
    const { caption, credit, } = this.props;
    return EmbedType ? (
      <Query query={GET_HOST}>
        {({ data: { hostname, }, }) => {
          const host = hostname.match(/^(?:.*?\.)?(.*)/)[1];
          const Loader =
            host === 'haaretz.co.il' ? IconHtzLoader : IconTmLoader;
          return (
            <Fragment>
              <EmbedWrapper setHeight={this.state.isLoading}>
                <ToggleFade show={this.state.isLoading}>
                  <Loader />
                </ToggleFade>
                <EmbedType {...this.props} onLoadCallback={this.onLoaded} />
              </EmbedWrapper>
              {(caption || credit) && (
                <Caption caption={caption} credit={credit} />
              )}
            </Fragment>
          );
        }}
      </Query>
    ) : (
      <Debug>
        <p>{`Embed ${this.props.inputTemplate} is not supported`}</p>
      </Debug>
    );
  }
}
