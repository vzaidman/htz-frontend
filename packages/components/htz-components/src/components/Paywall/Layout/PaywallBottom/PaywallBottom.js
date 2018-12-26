import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import Section from '../../../AutoLevels/Section';
import H from '../../../AutoLevels/H';
import Button from '../../../Button/Button';
import PaywallBottomContainer from './PaywallBottomContainer';
import PaywallAstronaut from '../PaywallAstronaut';

const PaywallBottom = ({ title, text, confirm, }) => (
  <PaywallBottomContainer>
    <PaywallAstronaut
      style={[
        {
          mq: { until: 'm', },
          size: '24rem',
          shift: { right: '0rem', top: '1rem', },
          other: {
            transform: 'scaleX(-1)', // mirror horizontal
            marginLeft: '-11rem',
          },
        },
        {
          mq: { from: 'm', },
          size: '53rem',
          shift: { right: '0rem', top: '-4rem', },
          other: {
            marginRight: '33rem',
          },
        },
      ]}
    />
    <FelaComponent
      style={{
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        padding: '2rem',
      }}
      render={
        ({ className, }) => (
          <div className={className}>
            <Section>
              <H>{title}</H>
              <p>{text}</p>
              <Button
                href={confirm.url}
                variant="salesOpaque"
                miscStyles={{ marginTop: '1rem', }}
              >
                {confirm.text}
              </Button>
            </Section>
          </div>
        )
      }
    />
  </PaywallBottomContainer>
);

PaywallBottom.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  confirm: PropTypes.shape({
    text: PropTypes.string,
    url: PropTypes.string,
  }),
};

PaywallBottom.defaultProps = {
  title: '',
  text: '',
  confirm: {
    text: '',
    url: '',
  },
};

export default PaywallBottom;
