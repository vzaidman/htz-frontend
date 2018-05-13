import React from 'react';
import { withData, pagePropTypes, } from '@haaretz/app-utils';
import { FelaComponent, } from 'react-fela';
import { LayoutContainer, UserDispenser, } from '@haaretz/htz-components';

import MainLayout from '../../layouts/MainLayout';
import OfferPageDataGetter from '../../components/OfferPage/OfferPageDataGetter';
import ThankYouStage from '../../components/OfferPage/Stages/ThankYouStage';
import StageTransition from '../../components/OfferPage/StageTransition/StageTransition';

// eslint-disable-next-line react/prop-types
const ThankYouElement = ({ product, userMessage, }) => (
  <FelaComponent style={{ textAlign: 'center', }}>
    <LayoutContainer bgc="white" miscStyles={{ paddingTop: '1.5rem', }}>
      <UserDispenser
        render={({ user, isLoggedIn, }) => (
          <StageTransition
            chosenSubscription={product}
            stage="thankYou"
            user={user}
            isLoggedIn={isLoggedIn}
            stageElement={
              <ThankYouStage
                userEmail={user.email}
                product={product}
                userMessage={userMessage}
              />
            }
          />
        )}
      />
    </LayoutContainer>
  </FelaComponent>
);

class StageThankYou extends React.Component {
  static getInitialProps({ url, }) {
    return { url, };
  }

  render() {
    let productId = null;
    if (this.props.url.query) {
      const { url: { query: { product, }, }, } = this.props;
      productId =
        product === '243'
          ? 'HTZ'
          : product === '273' ? 'TM' : product === '274' ? 'BOTH' : null;
    }
    return (
      <MainLayout
        thankYou
        product={productId || false}
      >
        {productId ? (
          <ThankYouElement product={productId} />
        ) : (
          <OfferPageDataGetter
            render={({
              data: { purchasePage: { userMessage, }, },
              loading,
              error,
            }) => {
              if (loading) return <div> Loading...</div>;
              if (error) return <div> Error...</div>;
              return <ThankYouElement userMessage={userMessage} />;
            }}
          />
        )}
      </MainLayout>
    );
  }
}

StageThankYou.propTypes = pagePropTypes;

StageThankYou.defaultProps = {};

export default withData(StageThankYou);
