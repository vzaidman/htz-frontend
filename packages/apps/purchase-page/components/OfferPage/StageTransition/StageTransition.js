/* global window */

import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';
import { IconHtzLoader, IconTmLoader, } from '@haaretz/htz-components';
import Phones from '../Stages/Elements/Phones';

const GET_HOST_NAME = gql`
  query {
    hostname @client
  }
`;
const transitionDuration = 2;
const transitionEasing = 'swiftOut';
const topSpacing = 28;
const topSpacingWithBanner = 42;

const phonesContStyle = ({ transitionStarted, hasUserBanner, theme, }) => ({
  opacity: transitionStarted ? 0 : 1,
  position: 'absolute',
  transform: transitionStarted
    ? 'translateY(-80%) scale(0)'
    : 'translateY(0) scale(1)',
  transformOrigin: 'center right',
  start: '50%',
  top: `${hasUserBanner ? topSpacingWithBanner : topSpacing}rem`,
  transitionProperty: 'all',
  extend: [ theme.getTransition(transitionDuration, transitionEasing), ],
});

const StyledPhonesCont = createComponent(phonesContStyle);

const innerPhonesContStyle = () => ({
  start: '-50%',
  position: 'relative',
});

const StyledInnerPhonesCont = createComponent(innerPhonesContStyle);

const elementContStyle = ({ transitionStarted, theme, }) => ({
  opacity: transitionStarted ? 1 : 0,
  transform: transitionStarted ? 'scale(1)' : 'scale(0.95)',
  transformOrigin: 'top center',
  transitionProperty: 'all',
  extend: [
    theme.getTransition(
      transitionDuration * 0.75,
      transitionEasing,
      transitionDuration / 3
    ),
  ],
});

const StyledElementCont = createComponent(elementContStyle);

const headerStyle = ({ transitionStarted, hasUserBanner, theme, }) => ({
  marginTop: transitionStarted
    ? '1rem'
    : `${hasUserBanner ? topSpacingWithBanner : topSpacing + 2}rem`,
  transform: transitionStarted ? 'scale(1)' : 'scale(1.2)',
  transitionProperty: 'all',
  extend: [ theme.getTransition(transitionDuration, transitionEasing), ],
});

const StyledHeader = createComponent(headerStyle, 'h1');

class StageTransition extends Component {
  static propTypes = {
    stage: PropTypes.number.isRequired,
    headerElement: PropTypes.element.isRequired,
    stageElement: PropTypes.element.isRequired,
    chosenSubscription: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    skipTransition: PropTypes.bool,
  };

  static defaultProps = {
    skipTransition: false,
  };

  state = {
    minTimePassed: false,
    isLoading: false,
  };

  // todo: update load time to 3000
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.skipTransition) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ minTimePassed: true, isLoading: false, });
    }
    else {
      setTimeout(() => {
        this.setState({ minTimePassed: true, });
      }, 1000);
    }
  }

  render() {
    const transitionStarted = !this.state.isLoading && this.state.minTimePassed;

    const {
      chosenSubscription,
      stage,
      stageElement,
      headerElement,
      isLoggedIn,
    } = this.props;

    return (
      <FelaComponent
        style={{ textAlign: 'center', }}
        render={({ theme, className, }) => (
          <div className={className}>
            <StyledPhonesCont
              transitionStarted={transitionStarted}
              hasUserBanner={isLoggedIn}
            >
              <StyledInnerPhonesCont>
                <Phones subscription={chosenSubscription} />
              </StyledInnerPhonesCont>
            </StyledPhonesCont>
            {typeof stage === 'number' && (
              <StyledHeader
                transitionStarted={transitionStarted}
                hasUserBanner={isLoggedIn}
              >
                {headerElement}
              </StyledHeader>
            )}
            <Query query={GET_HOST_NAME}>
              {({ data: { hostname, }, }) => {
                const host = hostname.match(/^(?:.*?\.)?(.*)/i)[1];
                const LoaderIcon =
                  host === 'themarker.com' ? IconTmLoader : IconHtzLoader;
                return (
                  <LoaderIcon
                    size={10}
                    color="primary"
                    miscStyles={{
                      marginTop: '4rem',
                      ...(transitionStarted ? { display: 'none', } : {}),
                    }}
                  />
                );
              }}
            </Query>
            <StyledElementCont transitionStarted={transitionStarted}>
              {stageElement}
            </StyledElementCont>
          </div>
        )}
      />
    );
  }
}

export default StageTransition;
