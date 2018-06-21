import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import htzTheme, { cssReset, } from '@haaretz/htz-theme';
import { ApolloProvider, } from 'react-apollo';
import { createRenderer, StyleProvider, } from '@haaretz/fela-utils';
import client from './ApolloMockClient';
import { LevelProvider, } from '../src/components/AutoLevels/LevelContext';

const styleRenderer = createRenderer({ isRtl: true, });

StyleGuideProvider.propTypes = {
  children: PropTypes.node,
};

StyleGuideProvider.defaultProps = {
  children: null,
};

export default function StyleGuideProvider({ children, }) {
  styleRenderer.renderFont(
    '"Open Sans Hebrew"',
    [ '../src/fonts/OpenSansHebrewLight.ttf', ],
    {
      fontWeight: 300,
    }
  );
  styleRenderer.renderFont(
    '"Open Sans Hebrew"',
    [
      '../src/fonts/OpenSansHebrewRegular.woff',
      '../src/fonts/OpenSansHebrewRegular.woff2',
    ],
    { fontWeight: 400, }
  );
  styleRenderer.renderFont(
    '"Open Sans Hebrew"',
    [
      '../src/fonts/OpenSansHebrewBold.woff',
      '../src/fonts/OpenSansHebrewBold.woff2',
    ],
    { fontWeight: 700, }
  );

  styleRenderer.renderStatic(cssReset);

  return (
    <ApolloProvider client={client}>
      <StyleProvider renderer={styleRenderer} theme={htzTheme}>
        <LevelProvider value={2}>
          <div>{children}</div>;
        </LevelProvider>
      </StyleProvider>
    </ApolloProvider>
  );
}
