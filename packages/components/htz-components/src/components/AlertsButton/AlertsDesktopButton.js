import React from 'react';
import { createComponent, } from 'react-fela';
import AlertsButton, { authorPropTypes, } from './_AlertsButton';
import IconMail from '../Icon/icons/IconMail';
import Color from '../Color/Color';

const AlertsDesktopButtonStyled = createComponent(
  ({ theme, }) => ({
    display: 'block',
    width: '100%',
    textAlign: 'end',
  }),
  AlertsButton,
  [ 'author', ]
);

function AlertsDesktopButton({ author, }) {
  return (
    <AlertsDesktopButtonStyled author={author}>
      <Color
        color="tertiary"
        miscStyles={{
          fontWeight: 700,
          type: -1,
        }}
      >
        <IconMail size={3} miscStyles={{ marginEnd: '1rem', }} />
        התראות במייל
      </Color>
    </AlertsDesktopButtonStyled>
  );
}

AlertsDesktopButton.propTypes = authorPropTypes;

export default AlertsDesktopButton;
