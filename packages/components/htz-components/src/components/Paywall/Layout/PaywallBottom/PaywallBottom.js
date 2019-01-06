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

export default function PaywallBottom({ title, text, confirm, }: Props): React.Node {
  return (
    <PaywallBottomContainer>
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
}
