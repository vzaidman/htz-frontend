import React from 'react';
import Link from 'next/link';

export default function TopNav() {
  return (
    <nav>
      <Link as="/" href={{ pathname: '/', query: { path: '/', }, }}>
        <a>Home</a>
      </Link>{' '}
      <Link
        as="/.premium-1.1204"
        href={{
          pathname: '/',
          query: {
            path: '/.premium-1.1204',
          },
        }}
      >
        <a>Article</a>
      </Link>
    </nav>
  );
}
