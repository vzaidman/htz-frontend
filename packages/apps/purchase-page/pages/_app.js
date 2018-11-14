import { createApp, InitPixel, } from '@haaretz/htz-components';
import { withData, } from '@haaretz/app-utils';

const initialState = referer => ({
  loggedInOrRegistered: null,
  promotionsPageState: {
    stage: 2,
    subStage: 0,
    chosenSlotIndex: 0,
    chosenOfferIndex: null,
    chosenProductIndex: 0,
    paymentMethodIndex: null,
    paymentType: null,
    approveDebtClaim: false,
    couponProduct: null,
    __typename: 'PromotionsPageState',
  },
  referer: referer || null,
  startFromStage2: true,
});

export default withData(createApp(InitPixel), initialState);
