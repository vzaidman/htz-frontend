import React from 'react';
import { FelaComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';

const mediaQueryCallback = (prop, value) => ({ [prop]: value, });

const secureLineStyle = theme => ({
  textAlign: 'center',
  borderTopWidth: '1px',
  borderTopColor: theme.color('neutral', '-3'),
  color: theme.color('neutral', '-3'),
  borderTopStyle: 'solid',
  ...theme.mq(
    { until: 's', },
    {
      marginTop: '3rem',
      marginBottom: '-1rem',
    }
  ),
  ...theme.mq(
    { from: 's', until: 'l', },
    {
      marginTop: '5rem',
      marginBottom: '0rem',
    }
  ),
  ...theme.mq(
    { from: 'l', },
    {
      marginTop: '3rem',
      marginBottom: '-1rem',
    }
  ),
});

const iconContainerStyle = theme => ({
  transform: 'translateY(-75%)',
  display: 'inline-block',
  color: theme.color('neutral', '-3'),
  backgroundColor: 'white',
  paddingInlineEnd: '1rem',
  paddingInlineStart: '1rem',
  ...theme.type(-1, { untilBp: 's', }),
  ...theme.type(2, { fromBp: 's', untilBp: 'l', }),
  ...theme.type(-1, { fromBp: 'l', }),
  extend: [
    {
      ...parseComponentProp(
        'transform',
        [
          { until: 's', value: 'translateY(-75%)', },
          { from: 's', until: 'l', value: 'translateY(-60%)', },
          { from: 'l', value: 'translateY(-75%)', },
        ],
        theme.mq,
        mediaQueryCallback
      ),
    },
  ],
});

function PaymentButtonsDivider() {
  return (
    <FelaComponent style={secureLineStyle}>
      <FelaComponent style={iconContainerStyle}>
        <div>או</div>
      </FelaComponent>
    </FelaComponent>
  );
}

export default PaymentButtonsDivider;
