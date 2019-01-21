// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import H from '../../../AutoLevels/H';
import GridItem from '../../../Grid/GridItem';
import HtzLink from '../../../HtzLink/HtzLink';

type Props = {
  title: string,
  url: ?string,
  gutter: ?number,
};

VogelListTitle.defaultProps = {
  gutter: null,
  url: null,
};

export default function VogelListTitle({ title, gutter, url, }: Props): React.Node {
  return (
    <GridItem gutter={gutter} miscStyles={{ flexGrow: '0', flexShrink: '1', }}>
      <FelaComponent
        style={theme => ({
          color: theme.color('primary'),
          marginBottom: '1rem',
        })}
        render={({ className, }) => (
          url
            ? (
              <HtzLink href={url}>
                <H className={className}>{title}</H>
              </HtzLink>
            )
            : <H className={className}>{title}</H>
        )}
      />
    </GridItem>
  );
}
