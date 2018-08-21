// @flow
import React from 'react';
import type { StatelessFunctionalComponent, } from 'react';
import { FelaComponent, } from 'react-fela';
import { Masthead, IconMarkerLogo, HtzLink, } from '@haaretz/htz-components';

const Logo: StatelessFunctionalComponent<void> = () => (
  <FelaComponent
    style={theme => ({
      marginLeft: 'auto',
      marginRight: 'auto',
      extend: [
        theme.mq(
          { from: 's', },
          {
            backgroundColor: theme.color('neutral', '-10'),
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }
        ),
      ],
    })}
    render={({ className, }) => (
      <HtzLink href="/" className={className}>
        <IconMarkerLogo size={4} />
      </HtzLink>
    )}
  />
);

export default () => <Masthead contentId="7.7528" Logo={Logo} />;
