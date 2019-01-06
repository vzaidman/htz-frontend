// @flow
import * as React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import Section from '../../../AutoLevels/Section';
import H from '../../../AutoLevels/H';
import Button from '../../../Button/Button';
import HtzLink from '../../../HtzLink/HtzLink';
import PaywallMidpageContainer from './PaywallMidpageContainer';
import AlefSeparator from './AlefSeparator/AlefSeparator';
import type { PaywallData, } from '../../PaywallDataProvider';

type Props = PaywallData;

export default function PaywallMidpage({ title, text, confirm, deny, }: Props): React.Node {
  return (
    <FelaTheme
      render={theme => {
        const color = theme.color('primary', -1);
        return (
          <PaywallMidpageContainer
            clearHeight="35rem"
            gradientHight="14rem"
          >
            <FelaComponent
              style={{
                width: '100%',
                backgroundColor: 'white',
                textAlign: 'center',
                paddingBottom: '2rem',
              }}
            >
              <AlefSeparator
                color={color}
                innerMargin="2rem"
                outerMargin="10rem"
              />
              <FelaComponent
                style={{
                  color,
                  extend: [ theme.type(2), ],
                }}
              >
                <Section isFragment>
                  <H>{title}</H>
                  <p>{text}</p>
                </Section>
              </FelaComponent>
              <Button
                href={confirm.url}
                variant="salesOpaque"
                miscStyles={{
                  marginTop: '3rem',
                  marginBottom: '3rem',
                }}
                fontSize={2}
              >
                {confirm.text}
              </Button>
              <FelaComponent
                style={{
                  color,
                  textDecoration: 'underline',
                }}
              >
                <HtzLink
                  href={deny.url}
                  content={deny.text}
                />
              </FelaComponent>
            </FelaComponent>
          </PaywallMidpageContainer>
        );
      }}
    />
  );
}
