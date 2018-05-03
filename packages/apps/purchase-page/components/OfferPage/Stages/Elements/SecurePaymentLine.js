import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { IconSafePayment, stylesPropType, } from '@haaretz/htz-components';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

const propTypes = {
  withLine: PropTypes.bool,
  size: PropTypes.number,
  miscStyles: stylesPropType,
};

const defaultProps = {
  withLine: true,
  size: 8,
  miscStyles: null,
};

const secureLineStyle = ({ theme, withLine, miscStyles, }) => ({
  textAlign: 'center',
  color: theme.color('offerPage', 'borderPositive'),
  marginTop: '7rem',
  ...(withLine && {
    borderTopWidth: '1px',
    borderTopColor: theme.color('offerPage', 'borderPositive'),
    borderTopStyle: 'solid',
  }),
  extend: [
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

const iconContainerStyle = {
  marginTop: '-50%',
  display: 'inline-block',
  backgroundColor: 'white',
  paddingInlineEnd: '1rem',
  paddingInlineStart: '1rem',
};

const underSecureIconStyle = theme => ({
  lineSpacing: '3px',
  display: 'block',
  letterSpacing: '3px',
  extend: [
    theme.type(-3, { untilBp: 's', }),
    theme.type(0, { fromBp: 's', untilBp: 'l', }),
    theme.type(-3, { fromBp: 'l', }),
  ],
});

function SecurePaymentLine({ withLine, size, miscStyles, }) {
  return (
    <FelaComponent
      rule={secureLineStyle}
      withLine={withLine}
      miscStyles={miscStyles}
    >
      <FelaComponent style={iconContainerStyle}>
        <IconSafePayment size={size} />
      </FelaComponent>

      <FelaComponent
        style={underSecureIconStyle}
        render={({ theme, className, }) => (
          <span className={className}>{theme.stage4.securePaymentText}</span>
        )}
      />
    </FelaComponent>
  );
}

SecurePaymentLine.propTypes = propTypes;
SecurePaymentLine.defaultProps = defaultProps;

export default SecurePaymentLine;
