import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import Section from '../../AutoLevels/Section';
import H from '../../AutoLevels/H';
import Button from '../../Button/Button';
import RulerContainer from './RulerContainer';
import RulerAstronaut from './RulerAstronaut';

const PaywallBottomRuler = ({ title, text, confirm, }) => (
  <RulerContainer>
    <RulerAstronaut />
    <FelaComponent
      style={{
        display: 'flex',
        alignItems: 'center',
        color: 'white',
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
  </RulerContainer>
);

PaywallBottomRuler.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  confirm: PropTypes.shape({
    text: PropTypes.string,
    url: PropTypes.string,
  }),
};

PaywallBottomRuler.defaultProps = {
  title: '',
  text: '',
  confirm: {
    text: '',
    url: '',
  },
};

export default PaywallBottomRuler;
