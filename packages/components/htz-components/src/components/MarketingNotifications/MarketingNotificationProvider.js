/* global window */
// @flow
import React from 'react';
import type { Node, } from 'react';
import { FelaTheme, } from 'react-fela';
import gql from 'graphql-tag';
import { CookieUtils, } from '@haaretz/htz-user-utils';
import ReactGA from 'react-ga';
import Query from '../ApolloBoundary/Query';
import MarketingNotification from './MarketingNotification';
import NoSSR from '../NoSSR/NoSSR';
import UserDispenser from '../User/UserDispenser';
import * as gaData from './ga_data';

const GET_NOTIFICATION_DATA: Object = gql`
  query GetNotificationData($path: String!, $ssoid: String!, $product: String!, $email: String!) {
    page(path: $path) {
      pageType
      slots {
        preHeader
        footer
      }
    }
    userExpired(ssoid: $ssoid, product: $product)

    userByMail(id: $email) {
      userStatus {
        isEmailValidated
      }
    }
  }
`;

type Props = {};

type State = {};

type PopupContent = {
  buttonText: string,
  contentId: string,
  daysFromExpiration: number,
  textBold: string,
  buttonLink: string,
  subscriberType: string,
  text: string,
};

type MadPopupAllOptions = {
  beforeExpiration: Array<PopupContent>,
  afterExpiration: Array<PopupContent>,
};

type MadPopDebugObect = {
  timeToExired: number,
  userType: string,
};

type User = {
  type: string,
};

type MadPopupBasics = {
  timeToExired: ?number,
  medPopupAllOptions: ?MadPopupAllOptions,
  userType: string,
};

/*
 * TODO: lets refactor this to a bunch of pure functions
 *       rather than use a class component without any
 *       state or lifecycle hooks
 */
class MarketingNotificationProvider extends React.Component<Props, State> {
  getMadPopupContent = (
    timeToExired: ?number,
    medPopupAllOptions: MadPopupAllOptions,
    userType: string
  ): ?PopupContent => (!timeToExired
    ? null
    : timeToExired > 0
      ? medPopupAllOptions.beforeExpiration.find(
        v => v.daysFromExpiration > (timeToExired || 0)
            && v.subscriberType === userType
            && !this.medPopupHistory.includes(v.contentId)
      )
      : medPopupAllOptions.afterExpiration.find(
        v => v.daysFromExpiration > Math.abs(timeToExired || 0)
            && v.subscriberType === userType
            && !this.medPopupHistory.includes(v.contentId)
      ));

  getUsetTimeToExpired: string => ?number = userExpiredJson => {
    const userExpired: Object = JSON.parse(userExpiredJson);
    const dayMiliSecs = 60 * 60 * 24 * 1000;
    return userExpired
      ? (new Date().getTime() - parseInt(userExpired.data, 10)) / dayMiliSecs
      : null;
  };

  getMadPopupElement: (Array<Object>) => ?MadPopupAllOptions = preHeader => {
    const popupElements: ?Object = preHeader.find(
      v => v.inputTemplate === 'com.tm.ResubscribeElementsGroup'
    );
    if (popupElements) return popupElements.popupElements;
    return null;
  };

  getPopup: (?Array<Object>, User, Object, string, ?boolean) => ?Node = (
    preHeader,
    user,
    theme,
    userExpiredJson,
    isEmailValidated
  ) => {
    if (isEmailValidated) {
      return this.getEmailConfirmationJsx(theme);
    }

    const { getCookie, setCookie, } = CookieUtils;
    if (user.type !== 'paying' && !getCookie('anonPopup')) {
      return this.getWeeklyPopupJsx(theme, setCookie);
    }

    if (!preHeader) return null;
    const debug = { timeToExired: 13, userType: 'regular', };
    // const debug = null;
    const { timeToExired, medPopupAllOptions, userType, } = this.getMadPopupBasicDataBlocks(
      debug,
      userExpiredJson,
      preHeader,
      user
    );

    if (timeToExired == null) return null;
    this.getMadPopupUserHistory();
    const foundedPopupContent = this.searchMadPopupContent(
      timeToExired,
      medPopupAllOptions,
      userType
    );

    if (foundedPopupContent != null) {
      const popupBoldText = this.setMadPopupExpDays(foundedPopupContent, timeToExired);
      this.updateUserMadPopupHistory(foundedPopupContent);
      return this.getMadPopupJsx(foundedPopupContent, timeToExired, popupBoldText);
    }
    return null;
  };

  setMadPopupExpDays: (PopupContent, number) => string = (foundedPopupContent, timeToExired) => {
    let popupBoldText = null;
    popupBoldText = foundedPopupContent.textBold.replace('[expDays]', String(timeToExired));
    this.striptText = popupBoldText;
    return popupBoldText;
  };

  getMadPopupBasicDataBlocks: (?MadPopDebugObect, string, Array<Object>, User) => MadPopupBasics = (
    debug,
    userExpiredJson,
    preHeader,
    user
  ) => {
    const timeToExired = debug != null ? debug.timeToExired : this.getUsetTimeToExpired(userExpiredJson);
    const medPopupAllOptions = this.getMadPopupElement(preHeader);
    const userType = debug ? debug.userType : user.type;
    return { timeToExired, medPopupAllOptions, userType, };
  };

  getMadPopupUserHistory: () => void = () => {
    this.medPopupHistory = window.localStorage.getItem('medPopupHistory');
    this.medPopupHistory = this.medPopupHistory ? JSON.parse(this.medPopupHistory) : [];
  };

  getEmailConfirmationJsx: Object => Node = theme => (
    <MarketingNotification
      notificationType="EmailConfirmation"
      buttonText={theme.marketingTools.EmailConfirmation.buttonText}
      text1={theme.marketingTools.EmailConfirmation.text1}
      text2={theme.marketingTools.EmailConfirmation.text2}
    />
  );

  getWeeklyPopupJsx: (Object, any) => Node = (theme, setCookie) => (
    <MarketingNotification
      notificationType="Weekly"
      buttonText={theme.marketingTools.Weekly.buttonText}
      text1={theme.marketingTools.Weekly.text1}
      text2={theme.marketingTools.Weekly.text2}
      buttonUrl={theme.marketingTools.Weekly.url}
      onClose={() => {
        const expireMs = Date.now() + 7 * 24 * 3600 * 10000; // 7 days
        const expire = new Date(expireMs);
        setCookie('anonPopup', 'popup', '/', 'haaretz.co.il', expire);
      }}
      onSubmit={() => {
        ReactGA.ga('ec:setAction', 'promo_click');
        ReactGA.ga('send', 'event', 'Internal Promotions', 'click', gaData.Weekly.name);
        const expireMs = Date.now() + 7 * 24 * 3600 * 10000; // 7 days
        const expire = new Date(expireMs);
        setCookie('anonPopup', 'popup', '/', 'haaretz.co.il', expire);
      }}
    />
  );

  getMadPopupJsx: (PopupContent, number, string) => Node = (
    foundedPopupContent,
    timeToExired,
    popupBoldText
  ) => (
    <MarketingNotification
      notificationType="Popup"
      buttonText={foundedPopupContent.buttonText}
      icon={
        timeToExired > 0
          ? foundedPopupContent.daysFromExpiration < 14
            ? 'IconHourglassRunningOut'
            : 'IconHourglass'
          : null
      }
      promoCode={
        (timeToExired > 0 ? 'befor' : 'after')
        + foundedPopupContent.daysFromExpiration
        + foundedPopupContent.subscriberType
      }
      text1={foundedPopupContent.text}
      buttonUrl={foundedPopupContent.buttonLink}
      text2={popupBoldText}
      onSubmit={() => {
        const promoCode = (timeToExired > 0 ? 'befor' : 'after')
          + foundedPopupContent.daysFromExpiration
          + foundedPopupContent.subscriberType;

        ReactGA.ga('ec:setAction', 'promo_click');
        ReactGA.ga('send', 'event', 'Internal Promotions', 'click', gaData.Popup[promoCode].name);
      }}
    />
  );

  getTopStripJsx: (Array<Object>, string) => ?Node = (preHeader, userType) => {
    if (userType === 'paying') return null;
    const topStripData = preHeader.find(
      item => item.inputTemplate === 'com.tm.promotion.banner.TopRuler'
    );

    if (!topStripData) return null;
    return (
      <MarketingNotification
        notificationType="Strip"
        buttonText={topStripData.actionText}
        text1={this.striptText ? this.striptText : topStripData.text}
        buttonUrl={topStripData.actionUrl}
        onSubmit={() => {
          ReactGA.ga('ec:setAction', 'promo_click');
          ReactGA.ga('send', 'event', 'Internal Promotions', 'click', gaData.Strip.name);
        }}
      />
    );
  };

  getBottomStripJsx: (Array<Object>, string) => ?Node = (footer, userType) => {
    if (userType === 'paying') return null;
    const bottomStripData = footer.find(
      item => item.inputTemplate === 'com.tm.promotion.banner.BottomRuler'
    );

    if (!bottomStripData) return null;
    return (
      <MarketingNotification
        notificationType="BottomStrip"
        buttonText={bottomStripData.actionText}
        text1={bottomStripData.text}
        text2={bottomStripData.text2}
        color={bottomStripData.theme}
        buttonUrl={bottomStripData.actionUrl}
        onSubmit={() => {
          ReactGA.ga('ec:setAction', 'promo_click');
          ReactGA.ga('send', 'event', 'Internal Promotions', 'click', gaData.BottomStrip.name);
        }}
      />
    );
  };

  updateUserMadPopupHistory: PopupContent => void = foundedPopupContent => {
    if (foundedPopupContent) this.medPopupHistory.push(foundedPopupContent.contentId);
    window.localStorage.setItem('medPopupHistory', JSON.stringify(this.medPopupHistory));
  };

  searchMadPopupContent: (number, ?MadPopupAllOptions, string) => ?PopupContent = (
    timeToExired,
    medPopupAllOptions,
    userType
  ) => {
    if (!medPopupAllOptions) {
      return null;
    }
    return this.getMadPopupContent(timeToExired, medPopupAllOptions, userType);
  };

  medPopupHistory: Array<any>;

  striptText: ?string;

  render(): Node {
    return (
      <NoSSR>
        <FelaTheme
          render={theme => (
            <UserDispenser
              render={({ user, }) => (
                <Query
                  query={GET_NOTIFICATION_DATA}
                  variables={{
                    path: '/',
                    // ssoid of a 14-day trial user: '9023779854',
                    ssoid: user.id ? user.id : user.anonymousId,
                    product: '243',
                    email: user.email,
                  }}
                >
                  {({ error, loading, data, }) => {
                    if (error) return null;
                    if (loading) return null;
                    if (!data) return null;

                    const slots = data.page && data.page.slots;
                    if (!slots) return null;

                    const userExpiredJson = data.userExpired;

                    const preHeader = slots.preHeader;

                    const isEmailValidated = data.userByMail && data.userByMail.userStatus
                      ? data.userByMail.userStatus.isEmailValidated
                      : null;

                    const popupMarkup = this.getPopup(
                      preHeader,
                      user,
                      theme,
                      userExpiredJson,
                      isEmailValidated
                    );

                    const topStrip = this.getTopStripJsx(preHeader, user.type);

                    const bottomStrip = this.getBottomStripJsx(slots.footer, user.type);

                    return (
                      <React.Fragment>
                        {topStrip}
                        {popupMarkup}
                        {bottomStrip}
                      </React.Fragment>
                    );
                  }}
                </Query>
              )}
            />
          )}
        />
      </NoSSR>
    );
  }
}

export default MarketingNotificationProvider;
