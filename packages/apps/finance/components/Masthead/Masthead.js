// @flow
import React from 'react';
import type { StatelessFunctionalComponent, } from 'react';
import { FelaComponent, } from 'react-fela';
import { Masthead, IconMarkerLogo, HtzLink, } from '@haaretz/htz-components';
import config from 'config';

const connectionPreset: string = config.get('connectionPreset');
const getMenuId = () => {
  switch (connectionPreset) {
    case 'dev':
      return '7.7528';
    case 'dev2prod':
      return '7.7539983';
    default:
      return null;
  }
};

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

export default () => <Masthead contentId={getMenuId()} Logo={Logo} />;
