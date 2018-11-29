import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import Section from '../../AutoLevels/Section';
import H from '../../AutoLevels/H';
import Button from '../../Button/Button';
import PaywallTopContainer from './PaywallTopContainer';
import PaywallTopAstronaut from './PaywallTopAstronaut';

const PaywallTop = ({ title, text, confirm, }) => (
  <PaywallTopContainer>
    <PaywallTopAstronaut shift={{ right: '10rem', top: '-3rem', }} />
    <FelaComponent
      style={{
        display: 'flex',
        alignItems: 'center',
        color: '#00537a',
        padding: '2rem',
      }}
      render={
        ({ className, }) => (
          <div className={className} >
            <Section>
              <H>{title}</H>
              <p>{text}</p>
              <Button
                href={confirm.url}
                variant="salesOpaque"
                miscStyles={{ marginTop: '1rem', }}
              >{confirm.text}
              </Button>
            </Section>
          </div>
        )
      }
    />
  </PaywallTopContainer>
);

PaywallTop.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  confirm: PropTypes.shape({
    text: PropTypes.string,
    url: PropTypes.string,
  }),
};

PaywallTop.defaultProps = {
  title: '',
  text: '',
  confirm: {
    text: '',
    url: '',
  },
};

export default PaywallTop;
