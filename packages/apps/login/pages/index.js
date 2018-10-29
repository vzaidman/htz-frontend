/* eslint-disable react/no-did-mount-set-state */

import React, { Fragment, } from 'react';
import Router from 'next/router';
import { ApolloConsumer, } from 'react-apollo';
import { Form, TextInput, Button, } from '@haaretz/htz-components';
import { StyleProvider, } from '@haaretz/fela-utils';
import { createComponent, FelaTheme, } from 'react-fela';
import isEmail from 'validator/lib/isEmail';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import styleRenderer from '../components/styleRenderer/styleRenderer';
import theme from '../theme/index';
import GET_HOST from './queries/GetHost';
import FlowDispenser from '../components/FlowDispenser/FlowDispenser';
import { storeFlowNumber, } from '../components/FlowDispenser/flowStorage';
import { LoginContentStyles, } from '../components/StyleComponents/LoginStyleComponents';
import objTransform from '../util/objectTransformationUtil';
import { saveUserData, getDataFromUserInfo, saveOtpHash, generateOtp, mockDataFromUserInfo, } from './queryutil/userDetailsOperations';
import { writeMetaDataToApollo, parseRouteInfo, } from '../pages/queryutil/flowUtil';
import IndexForm from '../components/Misc/Forms/IndexForm';

// Styling Components -------
const { PageWrapper, ContentWrapper, } = LoginContentStyles;
// --------------------------

const Index = () => (
  <Fragment>
    <ApolloConsumer>
      {client => {
        const host = client.readQuery({ query: GET_HOST, }).hostname.match(/^(?:.*?\.)?(.*)/i)[1];
        return (
          <StyleProvider renderer={styleRenderer} theme={theme(host)}>
            <FelaTheme
              render={theme => (
                <Fragment>
                  <PageWrapper>
                    <Header />
                    <ContentWrapper>
                      <FlowDispenser
                        render={({ getFlowByData, }) => (
                          <IndexForm client={client} getFlowByData={getFlowByData} theme={theme} />
                        )}
                      />
                    </ContentWrapper>
                    <Footer />
                  </PageWrapper>
                </Fragment>
              )}
            />
          </StyleProvider>
        );
      }}
    </ApolloConsumer>
  </Fragment>
);

export default Index;
