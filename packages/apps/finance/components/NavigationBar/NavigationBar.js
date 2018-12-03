import React from 'react';
import Link from 'next/link';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import { FelaComponent, } from 'react-fela';

import type { StatelessFunctionalComponent, } from 'react';
import type { StyleProps, } from '@haaretz/htz-css-tools';

type Props = {
  miscStyles?: StyleProps,
  section?: string,
  assetId?: string,
}

type ListItemProps = {
  href: {
    pathname: string,
  },
  as: string,
  name: string,
  selected: boolean,
}

// eslint-disable-next-line react/prop-types
const ListItem:StatelessFunctionalComponent<ListItemProps> = ({ name, as, href, selected, }) => (
  <FelaComponent
    style={theme => ({
      ...(selected ? { color: theme.color('primary'), } : {}),
      display: 'inline-block',
      marginEnd: '4rem',
      position: 'relative',
      textDecoration: 'underline',
      ':not(:last-child)': {
        ':after': {
          backgroundColor: theme.color('neutral', '-3'),
          bottom: '50%',
          content: '""',
          end: '-2rem',
          height: '75%',
          position: 'absolute',
          transform: 'translate(-50%, 50%)',
          width: '2px',
        },
      },
    })}
    render="li"
  >
    <Link
      href={href}
      as={as}
    >
      <a>
        {name}
      </a>
    </Link>
  </FelaComponent>
);

const NavigationBar:StatelessFunctionalComponent<Props> =
  // eslint-disable-next-line react/prop-types
  ({ section = '', miscStyles, assetId, }) => (
    <FelaComponent
      style={theme => ({
        ...theme.type(-1),
        backgroundColor: theme.color('neutral', '-10'),
        color: theme.color('neutral', '-3'),
        fontWeight: '700',
        paddingBottom: '2rem',
        paddingTop: '2rem',
        textAlign: 'center',
        extend: [
          ...(miscStyles
            ? parseStyleProps(miscStyles, theme.mq, theme.type)
            : []),
        ],
      })}
      render="ul"
    >
      <ListItem
        selected={section.toLowerCase() === 'stocks' && assetId !== '-2000'}
        href={{
          pathname: '/section/stocks',
          query: {
            section: 'stocks',
          },
        }}
        as="/stocks"
        name="מניות"
      />
      <ListItem
        selected={section.toLowerCase() === 'exchange'}
        href={{
          pathname: '/section/exchange',
          query: {
            section: 'exchange',
          },
        }}
        as="/exchange"
        name='מט"ח'
      />
      <ListItem
        selected={section.toLowerCase() === 'crypto'}
        href={{
          pathname: '/section/crypto',
          query: {
            section: 'crypto',
          },
        }}
        as="/crypto"
        name="מטבעות דיגיטליים"
      />
      <ListItem
        selected={section.toLowerCase() === 'options'}
        href={{
          pathname: '/section/options',
          query: {
            section: 'options',
          },
        }}
        as="/options"
        name="אופציות"
      />
      <ListItem
        selected={section.toLowerCase() === 'bonds'}
        href={{
          pathname: '/section/bonds',
          query: {
            section: 'bonds',
          },
        }}
        as="/bonds"
        name='אג"ח'
      />
      <ListItem
        selected={section.toLowerCase() === 'mtf'}
        href={{
          pathname: '/section/mtf',
          query: {
            section: 'mtf',
          },
        }}
        as="/mtf"
        name="קרנות נאמנות"
      />
      <ListItem
        selected={section.toLowerCase() === 'etf'}
        href={{
          pathname: '/section/etf',
          query: {
            section: 'etf',
          },
        }}
        as="/etf"
        name="תעודות סל"
      />
      <ListItem
        selected={section.toLowerCase() === 'stocks' && assetId === '-2000'}
        href={{
          pathname: '/asset/stocks',
          query: {
            section: 'stocks',
            assetId: '-2000',
          },
        }}
        as="/stocks/-2000"
        name="ארביטראז'"
      />
    </FelaComponent>
  );


export default NavigationBar;
