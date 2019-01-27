// @flow
import React from 'react';
import type { Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import * as style from './PopupStyle';
import A11yDialog from '../../A11yDialog/A11yDialog';
import Button from '../../Button/Button';
import IconClose from '../../Icon/icons/IconClose';
import IconHourglass from '../../Icon/icons/IconHourglass';
import IconHourglassRunningOut from '../../Icon/icons/IconHourglassRunningOut';
import ClickArea from '../../ClickArea/ClickArea';

type Props = {
  notificationType: String,
  buttonText: ?string,
  text1: ?string,
  text2: ?string,
  buttonUrl: ?string,
  onClose: ?() => void,
  icon: 'IconHourglass' | 'IconHourglassRunningOut',
};

PopupNotification.defaultProps = {
  buttonText: null,
  text1: null,
  text2: null,
  buttonUrl: null,
  onClose: null,
};

function getIcon(icon: 'IconHourglass' | 'IconHourglassRunningOut'): Node {
  if (icon === 'IconHourglass') return <IconHourglass />;
  return <IconHourglassRunningOut />;
}

export default function PopupNotification({
  notificationType,
  buttonText,
  text1,
  text2,
  buttonUrl,
  onClose,
  icon,
}: Props): Node {
  return (
    <A11yDialog
      appendTo="modalRoot"
      elementToHide="pageRoot"
      isVisible
      isModal
      closeOnOutsideClick
      onClose={onClose}
      containerMiscStyles={{
        width: '65rem',
      }}
      overlayBgColor="rgba(255, 255, 255, 0.9)"
      render={({ isVisible, handleClose, isModal, }) => (
        <FelaComponent
          style={style.wrapper}
          render={({ theme, className, }) => (
            <div className={className}>
              <FelaComponent style={style.innerWrapper} render="span">
                {getIcon(icon)}
                <FelaComponent style={style.text1}>{text1}</FelaComponent>
                <FelaComponent style={style.text2}>{text2}</FelaComponent>
                <ClickArea onClick={handleClose} miscStyles={style.closeButton(theme)}>
                  <IconClose />
                </ClickArea>

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
      )}
    />
  );
}
