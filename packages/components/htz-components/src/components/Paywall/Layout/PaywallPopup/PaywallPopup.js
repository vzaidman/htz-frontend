import React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import A11yDialog from '../../../A11yDialog/A11yDialog';
import Section from '../../../AutoLevels/Section';
import H from '../../../AutoLevels/H';
import Button from '../../../Button/Button';
import HtzLink from '../../../HtzLink/HtzLink';
import PaywallAstronaut from '../PaywallAstronaut';


export default function PaywallPopup({ title, text, confirm, deny, }) {
  return (
    <FelaTheme
      render={theme => (
        <A11yDialog
          appendTo="modalsRoot"
          elementToHide="pageRoot"
          isVisible
          isModal
          containerMiscStyles={{
            backgroundColor: 'white',
            width: [
              { misc: 'portrait', until: 's', value: '47rem', },
              { misc: 'portrait', from: 's', until: 'm', value: '90rem', },
              { misc: 'portrait', from: 'm', value: '120rem', },
              { misc: 'landscape', until: 's', value: '75rem', },
              { misc: 'landscape', from: 's', until: 'm', value: '90rem', },
              { misc: 'landscape', from: 'm', until: 'l', value: '110rem', },
              { misc: 'landscape', from: 'l', value: '167rem', },
            ],
            height: [
              { misc: 'portrait', until: 's', value: '67rem', },
              { misc: 'portrait', from: 's', value: '58rem', },
              { misc: 'landscape', until: 's', value: '42rem', },
              { misc: 'landscape', from: 's', until: 'l', value: '46rem', },
              { misc: 'landscape', from: 'l', value: '58rem', },
            ],
          }}
          render={() => (
            <FelaComponent
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <PaywallAstronaut
                style={[
                  {
                    mq: { misc: 'portrait', until: 'm', },
                    size: '46rem',
                    shift: { right: '0rem', top: '0rem', },
                    other: {
                      height: '24rem',
                      marginTop: '-3rem',
                    },
                  },
                  {
                    mq: { misc: 'portrait', from: 'm', },
                    size: '65rem',
                    shift: { right: '0rem', top: '0rem', },
                    other: {
                      height: '29rem',
                      marginTop: '-6rem',
                    },
                  },
                  {
                    mq: { misc: 'landscape', until: 's', },
                    size: '45rem',
                    shift: { right: '0rem', top: '0rem', },
                    other: {
                      height: '19rem',
                      marginTop: '-3rem',
                    },
                  },
                  {
                    mq: { misc: 'landscape', from: 's', until: 'l', },
                    size: '49rem',
                    shift: { right: '0rem', top: '0rem', },
                    other: {
                      height: '21rem',
                      marginTop: '-3rem',
                    },
                  },
                  {
                    mq: { misc: 'landscape', from: 'l', },
                    size: '65rem',
                    shift: { right: '0rem', top: '0rem', },
                    other: {
                      height: '29rem',
                      marginTop: '-6rem',
                    },
                  },
                ]}
              />
              <FelaComponent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  justifyContent: 'space-between',
                  paddingTop: '2rem',
                  paddingBottom: '3rem',
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                  extend: [
                    theme.mq({ misc: 'portrait', until: 's', }, {
                      paddingTop: '3rem',
                      paddingBottom: '6rem',
                      paddingLeft: '8rem',
                      paddingRight: '8rem',
                    }),
                  ],
                }}
              >
                <FelaComponent
                  style={{
                    color: '#00537a',
                    extend: [
                      theme.mq({ misc: 'portrait', until: 'm', }, { ...theme.type(1), }),
                      theme.mq({ misc: 'portrait', from: 'm', }, { ...theme.type(3), }),
                      theme.mq({ misc: 'landscape', until: 'l', }, { ...theme.type(1), }),
                      theme.mq({ misc: 'landscape', from: 'l', }, { ...theme.type(3), }),
                    ],
                  }}
                  render={({ className, }) => (
                    <Section className={className}>
                      <H>{title}</H>
                      <p>{text}</p>
                    </Section>
                  )}
                />
                <div>
                  <Button
                    href={confirm.url}
                    variant="salesOpaque"
                    miscStyles={{
                      type: [
                        { until: 's', value: 1, },
                        { from: 's', value: 2, },
                      ],
                    }}
                  >
                    {confirm.text}
                  </Button>
                </div>
                <div>
                  <FelaComponent
                    style={{
                      color: '#00537a',
                      textDecoration: 'underline',
                    }}
                    render={({ className, }) => (
                      <HtzLink
                        href={deny.url}
                        content={deny.text}
                        className={className}
                      />
                    )}
                  />
                </div>
              </FelaComponent>
            </FelaComponent>
          )}
        />
      )}
    />
  );
}
