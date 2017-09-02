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
          pathname: '/article',
          query: {
            section: 'news/world/asia',
            contentId: '.premium-1.5527',
          },
        }}
      >
        <a>Article</a>
      </Link>
    </nav>
  );
}
