/* eslint-disable no-unused-expressions,react/no-did-mount-set-state */

import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { StyleProvider, } from '@haaretz/fela-utils';
import { Query, } from '@haaretz/htz-components';
import FiniteStateMachine from '../components/FiniteStateMachine/FiniteStateMachine';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import styleRenderer from '../components/styleRenderer/styleRenderer';
import theme from '../theme';
import { getAndParseFlowFromApollo, } from '../components/FlowDispenser/flowStorage';
import GET_HOST from '../pages/queries/GetHost';

const fsmLayoutPropTypes = { children: PropTypes.func.isRequired, };

const FSMLayout = ({ children, }) => (
  <Fragment>
    <Query query={GET_HOST}>
      {({ loading, error, data, client, }) => {
        if (loading) return null;
        const host = data.hostname.match(/^(?:.*?\.)?(.*)/i)[1];
        const flow = getAndParseFlowFromApollo(client);

        return (
          <Fragment>
            <FiniteStateMachine
              apolloClient={client}
              initialState={flow.initialState}
              initialTransition={flow.initialTransition}
              statesGraph={flow}
              transitionRouteMap={flow.transitionRouteMap}
              render={({ currentState, findRout, doTransition, }) => (
                <StyleProvider renderer={styleRenderer} theme={theme(host)}>
                  <Fragment>
                    <Header />
                    {children({
                      currentState,
                      findRout,
                      doTransition,
                    })}
                    <Footer />
                  </Fragment>
                </StyleProvider>
              )}
            />
          </Fragment>
        );
      }}
    </Query>
  </Fragment>
);

FSMLayout.propTypes = fsmLayoutPropTypes;
FSMLayout.defaultPropTypes = {};

export default FSMLayout;
