// @flow
import React from 'react';
import type { Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import ReactGA from 'react-ga';
import * as style from './MiddleRullerStyle';
import IconAlefLogoTransparent from '../../Icon/icons/IconAlefLogoTransparent';
import IconArrow from '../../Icon/icons/IconArrow';
import ClickArea from '../../ClickArea/ClickArea';

import UserDispenser from '../../User/UserDispenser';
import NoSSR from '../../NoSSR/NoSSR';
import * as GAPromo from '../ga_data';

type Props = {
  notificationType: String,
  buttonText: ?string,
  text1: ?string,
  buttonUrl: ?string,
  closeNotification: (?Object) => void,
  onSubmit: ?() => void,
};

MarketingNotificationInner.defaultProps = {
  buttonText: null,
  text1: null,
  buttonUrl: null,
  closeNotification: null,
};
export default function MarketingNotificationInner({
  notificationType,
  buttonText,
  text1,
  buttonUrl,
  closeNotification,
  onSubmit,
}: Props): Node {
  const promo = GAPromo.MiddleRuller;
  return (
    <NoSSR>
      {ReactGA.ga('ec:addPromo', { name: promo.name, id: promo.id, position: promo.position, })}
      <UserDispenser
        render={({ isLoggedIn, user, }) => (isLoggedIn && user.type === 'paying' ? null : (
          <FelaComponent
            style={style.wrapper}
            render={({ theme, className, }) => (
              <div className={className}>
                <ClickArea
                  href={buttonUrl}
                  onClick={() => {
                    ReactGA.ga('ec:setAction', 'promo_click');
                    ReactGA.ga('send', 'event', 'Internal Promotions', 'click', promo.name);
                  }}
                  miscStyles={style.innerWrapper}
                >
                  <FelaComponent style={style.iconWrapper(theme)} render="span">
                    <IconAlefLogoTransparent miscStyles={style.icon(theme)} />
                  </FelaComponent>
                  <FelaComponent style={style.text1}>{text1}</FelaComponent>

                  <IconArrow miscStyles={style.button(theme)} />
                </ClickArea>
              </div>
            )}
          />
        ))
        }
      />
    </NoSSR>
  );
}
