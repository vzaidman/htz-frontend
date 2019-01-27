// @flow
import React from 'react';
import type { Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import * as style from './WeeklyStyle';
import A11yDialog from '../../A11yDialog/A11yDialog';
import Button from '../../Button/Button';
import Astronaut from '../../illustrations/Astronaut/Astronaut';
import HtzLink from '../../HtzLink/HtzLink';
import IconClose from '../../Icon/icons/IconClose';
import ClickArea from '../../ClickArea/ClickArea';

type Props = {
  buttonText: string,
  text1: string,
  text2: string,
  buttonUrl: string,
  onClose: ?() => void,
};

WeeklyNotification.defaultProps = {
  text1: null,
  text2: null,
  buttonUrl: null,
  onClose: null,
};

export default function WeeklyNotification({
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
      overlayBgColor="rgba(255, 255, 255, 0.5)"
      containerMiscStyles={{
        width: '100%',
        height: '71rem',
      }}
      render={({ isVisible, handleClose, isModal, }) => (
        <FelaComponent
          style={style.wrapper}
          render={({ theme, className, }) => (
            <div className={className}>
              <FelaComponent style={style.innerWrapper} render="span">
                <FelaComponent style={style.icon} render="span">
                  <Astronaut size={style.icon().size} />
                </FelaComponent>
                <FelaComponent style={style.text1}>{text1}</FelaComponent>
                <FelaComponent style={style.text2}>{text2}</FelaComponent>
                <ClickArea miscStyles={style.closeButton(theme)} onClick={handleClose}>
                  <IconClose />
                </ClickArea>

                <Button
                  variant={style.buttonVariant}
                  href={buttonUrl}
                  miscStyles={style.button(theme)}
                >
                  {buttonText}
                </Button>
                <FelaComponent
                  style={style.footer}
                  render={({ className, theme, }) => (
                    <span className={className}>
                      {theme.marketingTools.Weekly.weeklyLink}
                      <FelaComponent
                        style={style.link}
                        render={({ className, }) => (
                          <HtzLink
                            content="התחברו לאתר"
                            href="http://haaretz.co.il"
                            className={className}
                          />
                        )}
                      />
                    </span>
                  )}
                />
              </FelaComponent>
            </div>
          )}
        />
      )}
    />
  );
}
