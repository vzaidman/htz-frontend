// @flow
import React from 'react';
import type { Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import * as style from './StripStyle';
import Button from '../../Button/Button';

type Props = {
  notificationType: String,
  buttonText: ?string,
  text1: ?string,
  buttonUrl: ?string,
  closeNotification: (?Object) => void,
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
}: Props): Node {
  return (
    <FelaComponent
      style={style.wrapper}
      render={({ theme, className, }) => (
        <div className={className}>
          <FelaComponent style={style.innerWrapper} render="span">
            <FelaComponent style={style.text1}>{text1}</FelaComponent>
            <Button
              variant={style.buttonVariant}
              href={buttonUrl}
              miscStyles={style.button(theme)}
            >
              {buttonText}
            </Button>
          </FelaComponent>
        </div>
      )}
    />
  );
}
