// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import { type StyleProps, } from '@haaretz/htz-css-tools';
import IconHaaretzLogo from '../Icon/icons/IconHaaretzLogo';
import PageDateTime from './PageDateTime';

type LogoAndDateProps = {
  logoMiscStyles: ?StyleProps,
  logoComponent: React.Node,
  logoSize: ?number | StyleProps,
  datetimeMiscStyles: ?StyleProps,
};

export default function LogoAndDate({
  logoComponent,
  logoSize,
  logoMiscStyles,
  datetimeMiscStyles,
}: LogoAndDateProps) {
  const Logo = logoComponent;

  return (
    <FelaComponent
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {Logo && Logo instanceof React.Node ? (
        <Logo size={logoSize} miscStyles={logoMiscStyles} />
      ) : null}
      <PageDateTime miscStyles={datetimeMiscStyles} />
    </FelaComponent>
  );
}

LogoAndDate.defaultProps = {
  logoMiscStyles: null,
  datetimeMiscStyles: null,
  logoComponent: IconHaaretzLogo,
  logoSize: 4,
};
