// @flow
import React from 'react';
import type { Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import * as style from './Popup2Style';
import A11yDialog from '../../A11yDialog/A11yDialog';
import Button from '../../Button/Button';
import IconClose from '../../Icon/icons/IconClose';

type Props = {
  notificationType: String,
  buttonText: ?string,
  text1: ?string,
  text2: ?string,
  buttonUrl: ?string,
  onClose: ?() => void,
};

Popup2.defaultProps = {
  buttonText: null,
  text1: null,
  text2: null,
  buttonUrl: null,
  onClose: null,
};

export default function Popup2({
  notificationType,
  buttonText,
  text1,
  text2,
  buttonUrl,
  onClose,
}: Props): Node {
  return (
    <A11yDialog
      appendTo="modalRoot"
      elementToHide="pageRoot"
      isVisible
      closeOnOutsideClick
      isModal
      onClose={onClose}
      overlayBgColor="rgba(255, 255, 255, 0.9)"
      containerMiscStyles={{
        width: '95rem',
        padding: '5rem',
      }}
      render={({ isVisible, handleClose, isModal, }) => (
        <FelaComponent
          style={style.wrapper}
          render={({ theme, className, }) => (
            <div className={className}>
              <FelaComponent style={style.innerWrapper} render="span">
                <FelaComponent style={style.text1}>{text1}</FelaComponent>
                <FelaComponent style={style.text2}>{text2}</FelaComponent>
                <IconClose
                  miscStyles={style.closeButton(theme)}
                  onClick={handleClose}
                />
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
