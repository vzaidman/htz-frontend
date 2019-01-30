// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import Section from '../../../AutoLevels/Section';
import H from '../../../AutoLevels/H';
import Button from '../../../Button/Button';
import PaywallTopContainer from './PaywallTopContainer';
import PaywallAstronaut from '../PaywallAstronaut';
import type { PaywallData, } from '../../PaywallDataProvider';

type Props = PaywallData;

export default function PaywallTop({ colorScheme, title, text, confirm, }: Props): React.Node {
  return (
    <PaywallTopContainer colorScheme={colorScheme}>
      <PaywallAstronaut
        style={[
          {
            mq: { until: 's', },
            size: '22rem',
            shift: { right: '10rem', top: '1rem', },
          },
          {
            mq: { from: 's', },
            size: '53rem',
            shift: { right: '12rem', top: '-3rem', },
          },
        ]}
      />
      <FelaComponent
        style={theme => ({
          display: 'flex',
          alignItems: 'center',
          color: theme.color('secondary'),
          padding: '2rem',
          extend: [
            theme.mq({ until: 's', }, { marginRight: '-1rem', }),
            theme.mq({ from: 's', }, { marginRight: '-3rem', }),
          ],
        })}
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
    </PaywallTopContainer>
  );
}
