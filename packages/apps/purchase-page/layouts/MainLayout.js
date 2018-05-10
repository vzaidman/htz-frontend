import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { StyleProvider, } from '@haaretz/fela-utils';
import { createComponent, } from 'react-fela';
// import { UserInjector, appendScript, } from '@haaretz/htz-components';
import { UserInjector, BIRequest, } from '@haaretz/htz-components';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';

import theme from '../theme';
import styleRenderer from '../components/styleRenderer/styleRenderer';
import PurchaseHeader from '../components/PurchaseHeader/PurchaseHeader';
import PurchasePageFooter from '../components/PurchasePageFooter/PurchasePageFooter'; // eslint-disable-line import/no-named-as-default
import UserBanner from '../components/UserBanner/UserBanner';

const GET_HOST_NAME = gql`
  query {
    hostname @client
  }
`;

const propTypes = {
  /**
   * Children nodes
   */
  children: PropTypes.node,
  /**
   * should the footer render Illustrations
   */
  displayBackButton: PropTypes.bool,
  /**
   * should the MainLayout render the header component, used to allow pages to render without regular header
   */
  renderHeader: PropTypes.bool,
  /**
   * should the footer render Illustrations
   */
  footerHasIllustration: PropTypes.bool,
};

const defaultProps = {
  children: null,
  displayBackButton: true,
  renderHeader: true,
  footerHasIllustration: true,
};

const wrapperStyle = () => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const StyledWrapper = createComponent(wrapperStyle);

const contentWrapperStyle = () => ({
  flexGrow: 1,
});

const StyledContentWrapper = createComponent(contentWrapperStyle);

class MainLayout extends React.Component {
  componentDidMount() {
    // appendScript({
    //   src: '//script.crazyegg.com/pages/scripts/0011/5351.js',
    //   id: 'crazyegg',
    //   async: true,
    //   onLoadFunction: null,
    //   updateFunction: null,
    //   attributes: { type: 'text/javascript', },
    // });
  }

  render() {
    const {
      children,
      displayBackButton,
      renderHeader,
      footerHasIllustration,
    } = this.props;
    return (
      <Query query={GET_HOST_NAME}>
        {({ data: { hostname, }, }) => {
          const host = hostname.match(/^(?:.*?\.)?(.*)/i)[1];
          return (
            <Fragment>
              <UserInjector />
              <StyleProvider renderer={styleRenderer} theme={theme(host)}>
                <div>
                  <div id="pageRoot">
                    <StyledWrapper>
                      {renderHeader && (
                        <Fragment>
                          <PurchaseHeader
                            host={host}
                            displayBackButton={displayBackButton}
                          />
                          <UserBanner />
                        </Fragment>
                      )}

                      <StyledContentWrapper>{children}</StyledContentWrapper>
                      <PurchasePageFooter
                        host={host}
                        hasIllustration={footerHasIllustration}
                      />
                    </StyledWrapper>
                  </div>
                  <div id="modalsRoot" />
                </div>
              </StyleProvider>
              <BIRequest />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

MainLayout.propTypes = propTypes;
MainLayout.defaultProps = defaultProps;

export default MainLayout;
