import React from 'react';
import { HtzLink, } from '@haaretz/htz-components';

export default function TopNav() {
  return (
    <nav>
      <HtzLink href="/" content="Home" />{' '}
      <HtzLink href="/.premium-1.1204" content="Article" />
    </nav>
  );
}
