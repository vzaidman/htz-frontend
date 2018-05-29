import React, { Fragment, } from 'react';
import { withData, pagePropTypes, } from '@haaretz/app-utils';
import { FelaComponent, } from 'react-fela';
import {
  IconCheck,
  LayoutContainer,
  UserDispenser,
} from '@haaretz/htz-components';

import Phones from '../../components/OfferPage/Stages/Elements/Phones';
import MainLayout from '../../layouts/MainLayout';
import OfferPageDataGetter from '../../components/OfferPage/OfferPageDataGetter';
import ThankYouStage from '../../components/OfferPage/Stages/ThankYouStage';
import StageTransition from '../../components/OfferPage/StageTransition/StageTransition';

// eslint-disable-next-line react/prop-types
const ThankYouElement = ({ product, userMessage, }) => (
  <FelaComponent style={{ textAlign: 'center', }}>
    <LayoutContainer bgc="white" miscStyles={{ paddingTop: '6rem', }}>
      <UserDispenser
        render={({ user, }) => (
          <StageTransition
            chosenSubscription={product}
            stage="thankYou"
            displayPhones={false}
            headerElement={
              <Fragment>
                {product ? (
                  <Phones subscription={product} size={3.5} />
                ) : (
                  <IconCheck color="positive" size={10} />
                )}
                <FelaComponent
                  style={theme => ({
                    marginTop: '3rem',
                    extend: [ theme.type(3), ],
                  })}
                  render={({
                    className,
                    theme: { thankYou: { afterPurchase, secondaryHeader, }, },
                  }) => (
                    <div className={className}>
                      {product ? (
                        <p>{afterPurchase(product)}</p>
                      ) : (
                        userMessage.map(line => <p>{line}</p>)
                      )}
                    </div>
                  )}
                />
              </Fragment>
            }
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
      <MainLayout thankYou product={productId || false}>
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
