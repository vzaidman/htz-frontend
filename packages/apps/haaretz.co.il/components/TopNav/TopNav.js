import React from 'react';
import Link from 'next/link';

export default function TopNav() {
  return (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>{' '}
      <Link
        as="/news/world/asia/.premium-1.5527"
        href={{
          pathname: '/',
          query: {
            section: 'news/world/asia',
            contentId: '1.5527',
            tier: 'premium',
          },
        }}
      >
        <a>Article</a>
      </Link>
    </nav>
  );
}
