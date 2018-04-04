import React from 'react';
import { Link, } from '@haaretz/htz-components';

export default function TopNav() {
  return (
    <nav>
      <Link href="/" content="Home" />{' '}
      <Link href="/.premium-1.1204" content="Article" />
    </nav>
  );
}
