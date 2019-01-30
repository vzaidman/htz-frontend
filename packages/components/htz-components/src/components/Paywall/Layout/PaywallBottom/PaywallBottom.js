// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import Section from '../../../AutoLevels/Section';
import H from '../../../AutoLevels/H';
import Button from '../../../Button/Button';
import PaywallBottomContainer from './PaywallBottomContainer';
import PaywallAstronaut from '../PaywallAstronaut';
import type { PaywallData, } from '../../PaywallDataProvider';

type Props = PaywallData;

export default function PaywallBottom({ colorScheme, title, text, confirm, }: Props): React.Node {
  return (
    <PaywallBottomContainer colorScheme={colorScheme}>
      <PaywallAstronaut
        style={[
          {
            mq: { until: 'm', },
            size: '24rem',
            other: {
              transform: 'scaleX(-1)', // mirror horizontal
              marginLeft: '-11rem',
              top: '1rem',
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
        style={theme => ({
          display: 'flex',
          alignItems: 'center',
          padding: '2rem',
          ...theme.mq({ until: 'm', }, {
            color: theme.color('secondary'),
          }),
          ...theme.mq({ from: 'm', }, {
            color: colorScheme !== 'secondary' // primary is default
              ? theme.color('white')
              : theme.color('secondary', '+1'),
          }),
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
    </PaywallBottomContainer>
  );
}
