import React from 'react';
import { createComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';

import NavigationMenu from '../NavigationMenu/NavigationMenu';
import HeaderSearch from '../HeaderSearch/HeaderSearch';

const propTypes = {};

const wrapperStyle = ({ theme, }) => ({
  backgroundColor: theme.color('neutral', '-10'),
  ...borderBottom('1px', 0, 'solid', theme.color('primary')),
  paddingTop: `${10 / 7}rem`,
  paddingBottom: `${10 / 7}rem`,
  display: 'flex',
});
const Wrapper = createComponent(wrapperStyle);

function Header() {
  return (
    <Wrapper>
      <NavigationMenu />
      <HeaderSearch
        miscStyles={{
          flexGrow: '2',
        }}
      />
    </Wrapper>
  );
}

Header.propTypes = propTypes;

export default Header;
