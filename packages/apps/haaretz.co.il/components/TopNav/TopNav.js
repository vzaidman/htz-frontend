import React from 'react';
import Link from 'next/link';

export default function TopNav() {
  return (
    <nav>
      <Link as="/" href={{ pathname: '/', query: { path: '/', }, }}>
        <a>Home</a>
      </Link>{' '}
      <Link
        as="/news/world/asia/.premium-1.5527"
        href={{
          pathname: '/',
          query: {
            path: '/news/world/asia/.premium-1.5527',
          },
        }}
      >
        <a>Article</a>
      </Link>
    </nav>
  );
}
