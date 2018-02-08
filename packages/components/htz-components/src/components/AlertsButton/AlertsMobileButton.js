import React from 'react';
import { createComponent, } from 'react-fela';
import { parseTypographyProp, } from '@haaretz/htz-css-tools';
import IconAlert from '../Icon/icons/IconAlert';
import AlertsButton, { authorPropTypes, } from './_AlertsButton';

const AlertsMobileButtonStyled = createComponent(
  ({ theme, }) => ({
    textAlign: 'center',
    width: '5rem',
    extend: [
      parseTypographyProp(-2, theme.type),
    ],
  }),
  AlertsButton,
  [ 'author', ]
);

function AlertsMobileButton({ author, }) {
  return (
    <AlertsMobileButtonStyled author={author}>
      <div>
        <IconAlert size={3} color={[ 'primary', '+1', ]} />
      </div>
      עקוב
    </AlertsMobileButtonStyled>
  );
}

AlertsMobileButton.propTypes = authorPropTypes;

export default AlertsMobileButton;
