/* eslint-disable no-unused-expressions,react/no-did-mount-set-state */

import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { StyleProvider, } from '@haaretz/fela-utils';
import { Query, Footer, ErrorBoundary, } from '@haaretz/htz-components';
import FiniteStateMachine from '../components/FiniteStateMachine/FiniteStateMachine';
import Header from '../layouts/Header';
import FooterFallback from '../layouts/FooterFallback';
import styleRenderer from '../components/styleRenderer/styleRenderer';
import theme from '../theme';
import { getFlowNumber, } from '../components/FlowDispenser/flowStorage';
import FlowDispenser from '../components/FlowDispenser/FlowDispenser';
import GET_HOST from '../pages/queries/GetHost';
import {
  LoginContentStyles,
  LoginMiscLayoutStyles,
} from '../components/StyleComponents/LoginStyleComponents';
import { parseRouteInfo, } from '../pages/queryutil/flowUtil';

// Styling Components -------
const { PageWrapper, } = LoginContentStyles;
const { MobileFooterSpacer, } = LoginMiscLayoutStyles;
// --------------------------

const fsmLayoutPropTypes = { children: PropTypes.func.isRequired, };

const FSMLayout = ({ children, }) => (
  <Fragment>
    <Query query={GET_HOST}>
      {({ loading, error, data, client, }) => {
        if (loading) return null;
        const host = data.hostname.match(/^(?:.*?\.)?(.*)/i)[1];
        const flowNumber = getFlowNumber(client);
        return (
          <Fragment>
            <FlowDispenser
              render={({ getFlowByFlowNumber, }) => {
                const flow = getFlowByFlowNumber(flowNumber);
                const { route, } = parseRouteInfo(flow.initialTransition);
                return (
                  <FiniteStateMachine
                    apolloClient={client}
                    initialState={flow.initialState}
                    initialTransition={route}
                    statesGraph={flow}
                    transitionRouteMap={flow.transitionRouteMap}
                    render={({ currentState, findRout, doTransition, }) => (
                      <StyleProvider renderer={styleRenderer} theme={theme(host)}>
                        <Fragment>
                          <PageWrapper>
                            <Header />
                            {children({
                              currentState,
                              findRout,
                              doTransition,
                            })}
                            <MobileFooterSpacer />
                            <ErrorBoundary FallbackComponent={FooterFallback}>
                              <Footer contentId="7.1283189" />
                            </ErrorBoundary>
                          </PageWrapper>
                        </Fragment>
                      </StyleProvider>
                    )}
                  />
                );
              }}
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
